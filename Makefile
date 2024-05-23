init: init-ci front-ready

init-ci: docker-down-clear \
	front-clear \
	docker-pull docker-build docker-up \
	front-init

up: docker-up
down: docker-down
restart: down up
lint: front-lint

images:
	docker images

prune:
	docker system prune

memory:
	sudo sh -c "echo 3 > /proc/sys/vm/drop_caches"

docker-up:
	docker compose up -d

docker-down:
	docker compose down --remove-orphans

docker-down-clear:
	docker compose down -v --remove-orphans

docker-pull:
	docker compose pull

docker-build:
	docker compose build --pull

front-clear:
	docker run --rm -v ${PWD}/front:/app -w /app alpine sh -c 'rm -rf .ready dist'

front-init: front-npm-install

front-npm-install:
	docker compose run --rm front-node-cli npm instal

front-ready:
	docker run --rm -v ${PWD}/front:/app -w /app alpine touch .ready

front-lint:
	docker compose run --rm front-node-cli npm run lint
