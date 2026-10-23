#!/usr/bin/env bash
# Uploads the CRA build to gs://demex-website-${CIRCLE_BRANCH}.
# Mirrors switcheo-disco's scripts/ci/deploy-gcs.sh.

set -euo pipefail

: "${CIRCLE_BRANCH:?CIRCLE_BRANCH must be set}"
case "${CIRCLE_BRANCH}" in
  master|staging) ;;
  *) printf >&2 'Unsupported deployment branch: %s\n' "${CIRCLE_BRANCH}"; exit 1 ;;
esac

bucket="gs://demex-website-${CIRCLE_BRANCH}"
index_file="./build/index.html"

# gcloud's storage workers otherwise share the Cloud SDK SQLite credential
# cache across processes, and Workload Identity token refreshes can then race
# its migrations ("database is locked"). Keep one process; gcloud still uses
# per-process threads for concurrency.
export CLOUDSDK_STORAGE_PROCESS_COUNT=1

if [[ ! -f "$index_file" ]]; then
  echo "Missing production index: $index_file" >&2
  exit 1
fi

asset_paths=()
while IFS= read -r -d '' path; do
  asset_paths+=("$path")
done < <(find ./build -mindepth 1 -maxdepth 1 ! -name index.html -print0)

if ((${#asset_paths[@]} == 0)); then
  echo "No non-HTML production assets found in ./build" >&2
  exit 1
fi

# Upload everything index.html references before index.html itself, so a
# visitor never loads an index that points at assets not yet in the bucket.
# Direct copies only: the deploy identity has object-level access, and
# destination sync (rsync) additionally needs bucket listing.
gcloud storage cp \
  --recursive \
  "${asset_paths[@]}" \
  "$bucket"

gcloud storage cp \
  --cache-control='public, max-age=0' \
  "$index_file" \
  "${bucket}/index.html"
