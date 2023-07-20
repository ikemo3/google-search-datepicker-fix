#!/bin/bash -eu

pnpm install
pnpm lint:ci
pnpm test

pnpm build
pnpm archive
