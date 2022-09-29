#!/bin/sh

gzip -9 build/static/js/*
for i in ./build/static/js/*;
  do mv "$i" "${i%.gz}";
done

OUTPUT_PATH="./dist/release/build.tar.gz"

echo "compressing to $OUTPUT_PATH"
tar -zcvf $OUTPUT_PATH ./build

echo "release complete"
