#!/bin/bash -e

cd $(dirname $0)/..
REPOSITORY_TOP=$(pwd)

NOW=$(date +'%Y-%m-%d-%H-%M-%S')
MANIFEST_VERSION=$(jq -r .version apps/manifest.json)
SHA=$(git rev-parse HEAD)

if [ "${CI}" = "true" ]; then
  DO=
else
  DO=echo
fi

cd /tmp/workspace
if [ "${CIRCLE_BRANCH}" != "" ]; then
  OPTIONS="-prerelease -recreate"
  TAG=snapshot
  NAME="snapshot"

  # rename assets
  mv google-search-datepicker.crx google-search-datepicker-snapshot.crx
  mv google-search-datepicker.zip google-search-datepicker-snapshot.zip
elif [ "${CIRCLE_TAG}" != "" ]; then
  if [ "${CIRCLE_TAG}" = "snapshot" ]; then
    echo 'ignore `snapshot` tag (already released)'
    exit 0
  fi

  # verify tag == manifest version
  if [ "${CIRCLE_TAG}" != "v${MANIFEST_VERSION}" ]; then
    echo "tag != 'v' + manifest_version"
    echo "tag: ${CIRCLE_TAG}"
    echo "manifest: ${MANIFEST_VERSION}"
    exit 1
  fi

  OPTIONS="-recreate"
  TAG=${CIRCLE_TAG}
  NAME=""

  # rename assets
  mv google-search-datepicker.crx google-search-datepicker-${MANIFEST_VERSION}.crx
  mv google-search-datepicker.zip google-search-datepicker-${MANIFEST_VERSION}.zip
else
  OPTIONS="-recreate"
  TAG=$(git symbolic-ref --short HEAD)
  NAME="snapshot"
fi

${DO} go get -u github.com/tcnksm/ghr

cd ${REPOSITORY_TOP}
${DO} ghr -c ${SHA} -n ${NAME} ${OPTIONS} ${TAG} /tmp/workspace/
