#!/bin/bash -eu

pnpm install
pnpm run tsc
pnpm lint:ci
pnpm test

pnpm build
pnpm archive
