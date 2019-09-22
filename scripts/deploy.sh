#!/bin/bash -e

cd $(dirname $0)/..
REPOSITORY_TOP=$(pwd)

MANIFEST_VERSION=$(jq -r .version apps/manifest.json)
SHA=$(git rev-parse HEAD)

if [ "${CI}" = "true" ]; then
  DO=
else
  DO=echo
fi

cd /tmp/workspace
if [ "${CIRCLE_BRANCH}" != "" ]; then
  OPTIONS="-draft"
  TAG=${CIRCLE_BRANCH}
elif [ "${CIRCLE_TAG}" != "" ]; then
  # verify tag == manifest version
  if [ "${CIRCLE_TAG}" != "v${MANIFEST_VERSION}" ]; then
    echo "tag != 'v' + manifest_version"
    echo "tag: ${CIRCLE_TAG}"
    echo "manifest: ${MANIFEST_VERSION}"
    exit 1
  fi

  OPTIONS=""
  TAG=${CIRCLE_TAG}

  # rename assets
  mv google-search-datepicker.crx google-search-datepicker-${MANIFEST_VERSION}.crx
  mv google-search-datepicker.zip google-search-datepicker-${MANIFEST_VERSION}.zip
else
  OPTIONS=""
  TAG=$(git symbolic-ref --short HEAD)
fi

${DO} go get -u github.com/tcnksm/ghr

cd ${REPOSITORY_TOP}
${DO} ghr -t ${GITHUB_TOKEN} \
  -c ${SHA} \
  -n "" \
  ${OPTIONS} \
  -delete ${TAG} /tmp/workspace/
