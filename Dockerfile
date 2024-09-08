FROM node:20.11.1-alpine AS builder

RUN npm install -g pnpm

WORKDIR /home/node/app

COPY package*.json ./
COPY prisma ./prisma/ 

RUN pnpm install

COPY . .

RUN pnpm dlx prisma generate
RUN pnpm run build

FROM node:20.11.1-alpine

RUN npm install -g pnpm

WORKDIR /home/node/app

COPY --from=builder /home/node/app/package*.json ./
COPY --from=builder /home/node/app/node_modules ./node_modules
COPY --from=builder /home/node/app/dist ./dist
COPY --from=builder /home/node/app/prisma ./prisma

CMD ["sh", "-c", "pnpm prisma migrate deploy && node dist/shared/server.cjs"]