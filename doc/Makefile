setup:
	@npm install -g @apidevtools/swagger-cli

validate_api_doc:
	@swagger-cli validate ./api/index_client.yaml

gen_api_doc:
	@swagger-cli bundle  -t yaml -r -o client_api.yaml ./api/index_client.yaml