include .env
compose-file = -f docker-compose.yml

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

psql:
	docker exec -it ${DB_CONTAINER} psql -U ${DB_USER} -d ${DB_NAME} -W
.PHONY: psql
