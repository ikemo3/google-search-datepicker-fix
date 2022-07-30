#!/bin/bash -eu

yarn install
yarn run tsc
yarn lint:ci
yarn test

yarn build
yarn archive
