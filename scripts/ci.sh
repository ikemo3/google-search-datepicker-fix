#!/bin/bash -eu

yarn install
yarn run tsc
yarn lint
yarn test

echo "Archive google-search-datepicker.crx"
mkdir -p /tmp/workspace
echo ${PEM_BASE64} | openssl enc -d base64 -A > /tmp/google-search-datepicker.crx
yarn crx pack -o /tmp/workspace/google-search-datepicker.crx apps -p /tmp/google-search-datepicker.crx
yarn crx pack --zip-output /tmp/workspace/google-search-datepicker.zip apps

yarn integration-test
