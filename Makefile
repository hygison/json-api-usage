include .env
compose-file = -f docker-compose.yml
TF_ENV_FILE ?= infra/terraform/.env.terraform
TERRAFORM_DIR ?= infra/terraform
BACKUP_DIR ?= Docker/backups
TIMESTAMP := $(shell date +%Y%m%d%H%M%S)
DB_DUMP_FILE ?= $(BACKUP_DIR)/db_dump_$(TIMESTAMP).sql

up:
	docker-compose up -V --build
.PHONY:upf
run:

build:
	docker compose ${compose-file} build --no-cache --force-rm
.PHONY:build

down:
	docker compose down
.PHONY:down

destroy:
	time docker compose down --rmi all --volumes --remove-orphans
	rm -rf Docker/database
.PHONY:destroy

app:
	docker exec -it ${APP_CONTAINER} sh
.PHONY:app

sql:
	docker exec -it ${DB_CONTAINER} env PGPASSWORD=${DB_PASSWORD} psql -U ${DB_USER} -d ${DB_NAME}
.PHONY: sql

db-export:
	mkdir -p ${BACKUP_DIR}
	docker exec ${DB_CONTAINER} env PGPASSWORD=${DB_PASSWORD} pg_dump --clean --if-exists -U ${DB_USER} -d ${DB_NAME} > ${DB_DUMP_FILE}
	@echo "Database exported to ${DB_DUMP_FILE}"
.PHONY: db-export

jwt:
	@openssl genpkey -algorithm RSA -out private_key.pem
	@openssl rsa -pubout -in private_key.pem -out public_key.pem
	$(call print_success, Congratulations, jwt created.)
.PHONY:jwt

tf-env-check:
	@test -f $(TF_ENV_FILE) || (echo "Missing $(TF_ENV_FILE). Copy infra/terraform/.env.terraform.example and fill in the TF_VAR_* values." && exit 1)
.PHONY: tf-env-check

infra-init: tf-env-check
	set -a && . $(TF_ENV_FILE) && set +a && terraform -chdir=$(TERRAFORM_DIR) init
.PHONY: infra-init

infra-plan: tf-env-check
	set -a && . $(TF_ENV_FILE) && set +a && terraform -chdir=$(TERRAFORM_DIR) plan
.PHONY: infra-plan

infra-apply: tf-env-check
	set -a && . $(TF_ENV_FILE) && set +a && terraform -chdir=$(TERRAFORM_DIR) apply
.PHONY: infra-apply

infra-destroy: tf-env-check
	set -a && . $(TF_ENV_FILE) && set +a && terraform -chdir=$(TERRAFORM_DIR) destroy
.PHONY: infra-destroy
