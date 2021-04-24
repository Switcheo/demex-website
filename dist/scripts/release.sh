#!/bin/sh

OUTPUT_PATH="./dist/release/build.tar.gz"

echo "compressing to $OUTPUT_PATH"
tar -zcvf $OUTPUT_PATH ./build

echo "release complete"
