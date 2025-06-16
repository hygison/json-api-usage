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

app:
	docker exec -it ${APP_CONTAINER} sh
.PHONY:app

sql:
	docker exec -it ${DB_CONTAINER} env PGPASSWORD=${DB_PASSWORD} psql -U ${DB_USER} -d ${DB_NAME}
.PHONY: sql

jwt:
	@echo "Gen JWT Keys\n"
	@openssl genpkey -algorithm RSA -out private_key.pem
	@echo "\n"
	@echo "Gen Public key from your private key as a file named public_key.pem. Set JWT_PUBLIC_KEY_PATH in your .env to the path of your public_key.pem"
	@openssl rsa -pubout -in private_key.pem -out public_key.pem
	@echo "\n"
	$(call print_success, Congratulations, jwt created.)
.PHONY:jwt
