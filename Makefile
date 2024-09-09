dev:
	docker compose up api

test-e2e:
	docker compose up api-test

db-seed:
	docker exec api sh -c "pnpm prisma db seed"