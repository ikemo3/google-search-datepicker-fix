#!/bin/bash -eu

PACKAGE_NAME=$(jq -r .name package.json)
MANIFEST_VERSION=$(jq -r .version apps/manifest.json)

# store manifest.json
git checkout -- apps/manifest.json
MANIFEST=$(cat apps/manifest.json)

### create Chrome Extension
mkdir -p tmp/workspace

# rewrite manifest.json
if [[ "${CIRCLE_BRANCH}" != "" ]]; then
  echo 'add `version_name` to manifest.json'
  NOW=$(date +%Y%m%d-%H%M)
  echo ${MANIFEST} | jq ". | .version_name = \"${MANIFEST_VERSION}-snapshot(${NOW})\"" \
    > apps/manifest.json
fi

# create Chrome Extension(unsigned)
echo "Create ${PACKAGE_NAME}.zip"
yarn crx pack --zip-output tmp/workspace/${PACKAGE_NAME}.zip apps

### create Firefox Extension
EXTENSION_ID=$(cat apps/.web-extension-id | tail -1)
echo "extension id: ${EXTENSION_ID}"

# rewrite manifest.json
echo ${MANIFEST} | jq ". | .browser_specific_settings = {\"gecko\": {\"id\": \"${EXTENSION_ID}\"}}" \
  > apps/manifest.json

# create *.xpi
echo "Create ${PACKAGE_NAME}.xpi"
cd apps
zip -r ../tmp/workspace/${PACKAGE_NAME}.xpi *

# restore manifest.json
cd ..
git checkout -- apps/manifest.json
