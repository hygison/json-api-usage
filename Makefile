include .env
compose-file = -f docker-compose.yml
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
