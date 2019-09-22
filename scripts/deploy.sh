#!/bin/bash -e

cd $(dirname $0)/..

MANIFEST_VERSION=$(jq -r .version apps/manifest.json)
SHA=$(git rev-parse HEAD)

if [ "${CI}" = "true" ]; then
  DO=
else
  DO=echo
fi

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

  # rename asset
  mv /tmp/workspace/google-search-datepicker.crx \
    /tmp/workspace/google-search-datepicker-${MANIFEST_VERSION}.crx
else
  OPTIONS=""
  TAG=$(git symbolic-ref --short HEAD)
fi

${DO} go get -u github.com/tcnksm/ghr
${DO} ghr -t ${GITHUB_TOKEN} \
  -c ${SHA} \
  -n "" \
  ${OPTIONS} \
  -delete ${TAG} /tmp/workspace/
