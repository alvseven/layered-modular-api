dev:
	docker compose up api

test-e2e:
	docker compose up api-test; docker compose down