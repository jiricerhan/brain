.DEFAULT_GOAL 				= help
.PHONY        				= build dev help

.EXPORT_ALL_VARIABLES:      # export all variables to child processes by default

## —— Main ———————————————————————————————————————————————————————————————————————————————————————————————————————————
prod: ## Build images nad start production server
	@ echo "Starting production server..."
	@ docker network inspect brain_network || docker network rm brain_network
	@ docker compose -f docker-compose.prod.yml build
	@ docker compose -f docker-compose.prod.yml up

dev: ## Build images nad start development server
	@ echo "Starting development server..."
	@ docker network inspect brain_network || docker network create brain_network
	@ docker compose -f docker-compose.dev.yml build
	@ docker compose -f docker-compose.dev.yml up

sh-next-app: ## Connect to next-app container shell
	docker compose -f docker-compose.dev.yml exec next-app sh -l

## —— Yarn —————————————————————————————————————————————————————————————————————————————————————————————————————————————
yarn: ## Run yarn command in next-app container, Example: make yarn c="versions"
ifndef c
	-@ echo "ERROR: missing parameter 'c'. Example: make yarn c=\"--versions\""
	-@ echo "INFO: If you need more controll acess directly container shell: make sh-next-app"
	@ exit 1
endif
	@ $(eval c ?=)
	docker compose -f docker-compose.dev.yml exec next-app yarn $(c)

## —— Other  ———————————————————————————————————————————————————————————————————————————————————————————————————————————
help: ## Display this help screen
		@ grep -E '(^[a-zA-Z0-9_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}{printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'