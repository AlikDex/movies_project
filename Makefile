init: init-ci vue-ready

init-ci: docker-down-clear \
	vue-clear \
	docker-pull docker-build docker-up \
	vue-init

up: docker-up
down: docker-down
restart: down up
lint: vue-lint

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

vue-clear:
	docker run --rm -v ${PWD}/front:/app -w /app alpine sh -c 'rm -rf .ready dist'

vue-init: vue-npm-install

vue-npm-install:
	docker compose run --rm vue-node-cli npm instal

vue-ready:
	docker run --rm -v ${PWD}/front:/app -w /app alpine touch .ready

vue-lint:
	docker compose run --rm vue-node-cli npm run lint
