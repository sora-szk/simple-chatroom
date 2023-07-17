ENV_FILE := ../.env
include $(ENV_FILE)
export $(shell sed 's/=.*//' $(ENV_FILE))

env_value_check:
	@echo REGION=$(REGION)
	@echo PROJECT_ID_DEV=$(PROJECT_ID_DEV)
	@echo PROJECT_ID_PRD=$(PROJECT_ID_PRD)

setup:
	@npm i -g cdktf-cli
	@yarn install
	@cdktf init --template="typescript" --local
	@cdktf get

plan: set_env
ifeq ($(env), prd)
	@export REGION=$(REGION) && export PROJECT_ID=$(PROJECT_ID_PRD) && cdktf plan
else
	@export REGION=$(REGION) && export PROJECT_ID=$(PROJECT_ID_DEV) && cdktf plan
endif

synth: set_env
ifeq ($(env), prd)
	@export REGION=$(REGION) && export PROJECT_ID=$(PROJECT_ID_PRD) && cdktf synth
else
	@export REGION=$(REGION) && export PROJECT_ID=$(PROJECT_ID_DEV) && cdktf synth
endif

deploy: set_env
ifeq ($(env), prd)
	@export REGION=$(REGION) && export PROJECT_ID=$(PROJECT_ID_PRD) && cdktf deploy
else
	@export REGION=$(REGION) && export PROJECT_ID=$(PROJECT_ID_DEV) && cdktf deploy
endif

set_env:
ifeq ($(env), prd)
	@gcloud config set project $(PROJECT_ID_PRD)
else
	@gcloud config set project $(PROJECT_ID_DEV)
endif