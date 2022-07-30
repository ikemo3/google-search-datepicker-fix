#!/bin/bash -eu

cd $(dirname $0)/..

PACKAGE_NAME=$(jq -r .name package.json)
MANIFEST_VERSION=$(jq -r .version dist/manifest.json)

# store manifest.json
cp -p apps/manifest.json dist/
MANIFEST=$(cat dist/manifest.json)

### create Chrome Extension
mkdir -p tmp/workspace

# rewrite manifest.json
if [[ "${CIRCLE_BRANCH}" != "" ]]; then
  echo 'add `version_name` to manifest.json'
  NOW=$(date +%Y%m%d-%H%M)
  echo ${MANIFEST} | jq ". | .version_name = \"${MANIFEST_VERSION}-snapshot(${NOW})\"" \
    > dist/manifest.json
fi

# create Chrome Extension(unsigned)
echo "Create ${PACKAGE_NAME}.zip"
yarn crx pack --zip-output tmp/workspace/${PACKAGE_NAME}.zip dist

### create Firefox Extension
EXTENSION_ID=$(cat dist/.web-extension-id | tail -1)
echo "extension id: ${EXTENSION_ID}"

# rewrite manifest.json
echo ${MANIFEST} | jq ". | .browser_specific_settings = {\"gecko\": {\"id\": \"${EXTENSION_ID}\"}}" \
  > dist/manifest.json

# create *.xpi
echo "Create ${PACKAGE_NAME}.xpi"
cd dist
zip -r ../tmp/workspace/${PACKAGE_NAME}.xpi *
