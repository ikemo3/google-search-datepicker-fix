#!/bin/bash -eu

pnpm install
pnpm lint:ci
pnpm test:ci

pnpm build
pnpm archive
