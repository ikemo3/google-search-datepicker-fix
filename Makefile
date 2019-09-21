ci:
	yarn install
	yarn test

	@echo "Archive google-search-datepicker.crx"
	mkdir -p /tmp/workspace
	./node_modules/.bin/crx pack -o /tmp/workspace/google-search-datepicker.crx apps
	jq .version_name apps/manifest.json | tr -d '"' > /tmp/workspace/version

	yarn integration-test
