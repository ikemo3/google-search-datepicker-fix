ci:
	yarn install
	yarn run tsc
	yarn test

	@echo "Archive google-search-datepicker.crx"
	mkdir -p /tmp/workspace
	echo ${PEM_BASE64} | base64 -d > /tmp/google-search-datepicker.crx
	yarn crx pack -o /tmp/workspace/google-search-datepicker.crx apps
	jq .version_name apps/manifest.json | tr -d '"' > /tmp/workspace/version

	yarn integration-test
