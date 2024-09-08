dev:
	docker compose up api

test-e2e:
	docker compose up -d api-test && sleep 3 && pnpm test:e2e; docker compose down