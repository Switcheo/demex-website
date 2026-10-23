# CircleCI Google deployments

The `staging` deployment currently fails because the old shared
`GCP_SERVICE_KEY` is absent. This repair uses short-lived CircleCI V3 OIDC tokens
and Google Workload Identity Federation instead of restoring a stored key.

## Provision before merging this rollout

| Boundary | Required value |
| --- | --- |
| CircleCI project | `d1c6aa6b-9dd0-402a-a3c9-36ac29777143` |
| Repository for checkout and configuration | `github.com/Switcheo/demex-website` |
| Reference for checkout and configuration | `refs/heads/staging` |
| Google pool and provider | `circleci-demex-website-staging` |
| Deployment service account | `demex-website-staging-ci@cloud-nodes-372902.iam.gserviceaccount.com` |
| Sole storage role | `roles/storage.objectAdmin` on `demex-website-staging` |

Create the dedicated pool/provider and service account, with issuer
`https://oidc.circleci.com/org/f89a5655-8f99-40ef-b40b-1501f16a6372` and allowed audience `f89a5655-8f99-40ef-b40b-1501f16a6372`. Map `google.subject` and
`attribute.project_id` to `assertion['oidc.circleci.com/project-id']`; the raw
V3 subject can exceed Google's subject-length limit.

Require this exact provider condition:

```text
assertion['oidc.circleci.com/project-id'] == 'd1c6aa6b-9dd0-402a-a3c9-36ac29777143' && assertion['oidc.circleci.com/checkout-source'] == 'github.com/Switcheo/demex-website' && assertion['oidc.circleci.com/checkout-ref'] == 'refs/heads/staging' && assertion['oidc.circleci.com/config-source'] == 'github.com/Switcheo/demex-website' && assertion['oidc.circleci.com/config-ref'] == 'refs/heads/staging'
```

Grant `roles/iam.workloadIdentityUser` on this service account only to
`principalSet://iam.googleapis.com/projects/290730833389/locations/global/workloadIdentityPools/circleci-demex-website-staging/attribute.project_id/d1c6aa6b-9dd0-402a-a3c9-36ac29777143`. Grant no project-wide role and create no
service-account key. Record the provisioned policy evidence before merging.
This rollout provisions only `staging`; the other branch retains its separate
configuration and must have its own dedicated identity before adopting this
configuration.

## Publishing and recovery

The build and existing branch filters are preserved. Only the deployment job
stops requesting the shared secrets context. It attaches the build and upload
helper from the same workspace, then authenticates with its built-in OIDC token.
Credential files are owner-only and the token is never printed.

`scripts/ci/deploy-gcs.sh` accepts only `master` and `staging`, uploads non-HTML
files first and `index.html` last, and sets `Cache-Control: public, max-age=0`
on the entrypoint. It copies directly without deleting existing objects and
uses one Cloud SDK worker process to avoid credential-cache migration races.

After deployment, verify the matching live page and asset URLs. CarbonHub's
existing redirect remains in place; publishing its retained bundle does not
change routing. Rollback uses the previous build and entrypoint; no old hashed
assets are removed by this upload.

References: [CircleCI OIDC claims and V3 tokens](https://circleci.com/docs/guides/permissions-authentication/openid-connect-tokens/),
[Google deployment federation](https://docs.cloud.google.com/iam/docs/workload-identity-federation-with-deployment-pipelines).
