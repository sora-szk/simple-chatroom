ENV_FILE := ../.env
include $(ENV_FILE)
export $(shell sed 's/=.*//' $(ENV_FILE))

INSTALLED_NODE_VERSION:=$(shell node --version)

env_value_check:
	@echo REQUIRED_NODE_VERSION=$(REQUIRED_NODE_VERSION)
	@echo PROJECT_ID_DEV=$(PROJECT_ID_DEV)
	@echo PROJECT_ID_PRD=$(PROJECT_ID_PRD)

setup:
	@npm i -g npm-check-updates
	@npm i -g typescript
	@npm i -g firebase-tools
	@npm i -g yarn
	@yarn install

# make start env=dev
start:
	@yarn build
	@export NODE_ENV=$(env) && yarn start

# make run env=dev
run: build_docker_image
	@docker-compose -f ./docker/docker-compose.local.yml up --remove-orphans

# make build_docker_image env=dev
build_docker_image: node_version_check set_env
	@docker build -f ./docker/Dockerfile -t simple-chatroom-app-api:latest --build-arg ENV=$(env) --platform linux/amd64 .

# make push_docker_image env=dev
push_docker_image: build_docker_image
	@gcloud auth configure-docker
ifeq ($(env), prd)
	@docker tag  simple-chatroom-app-api:latest asia.gcr.io/$(PROJECT_ID_PRD)/simple-chatroom-app-api:latest
	@docker push asia.gcr.io/$(PROJECT_ID_PRD)/simple-chatroom-app-api:latest
else
	@echo not implements
endif

# make set_env env=dev
set_env:
ifeq ($(env), prd)
	@gcloud config set project $(PROJECT_ID_PRD)
else
	@gcloud config set project $(PROJECT_ID_DEV)
endif

node_version_check:
ifeq ($(REQUIRED_NODE_VERSION),$(INSTALLED_NODE_VERSION))
	@echo Node version is $(INSTALLED_NODE_VERSION).
else
	@echo Node version $(REQUIRED_NODE_VERSION) is required.
	@exit 3
endif