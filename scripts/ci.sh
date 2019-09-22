#!/bin/bash -eu

yarn install
yarn run tsc
yarn test

echo "Archive google-search-datepicker.crx"
mkdir -p /tmp/workspace
echo ${PEM_BASE64} | base64 -d > /tmp/google-search-datepicker.crx
yarn crx pack -o /tmp/workspace/google-search-datepicker.crx apps
yarn crx pack --zip-output /tmp/workspace/google-search-datepicker.zip apps

yarn integration-test
