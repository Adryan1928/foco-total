# Docker & Compose

Este arquivo descreve como executar o projeto com Docker.

## Ambiente Único (Postgres)
1. Editar `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```
2. Ajustar `.env`:
```env
DATABASE_URL="postgresql://app:app@db:5432/focototal?schema=public"
POSTGRES_USER=app
POSTGRES_PASSWORD=app
POSTGRES_DB=focototal
```
3. Criar migração (se necessário):
```bash
npx prisma migrate dev --name init
```
4. Subir:
```bash
docker compose up --build -d
```

## Comandos Úteis
```bash
docker logs -f foco-total-web
docker compose exec foco-total-web sh
docker compose exec foco-total-web npx prisma migrate deploy
docker compose down
```

## Volumes
- `postgres_data`: dados do Postgres.

## Variáveis Principais
| Nome | Exemplo |
|------|---------|
| DATABASE_URL | postgresql://app:app@db:5432/focototal?schema=public |
| NODE_ENV | development |
| POSTGRES_USER | app |
| POSTGRES_PASSWORD | app |
| POSTGRES_DB | focototal |

## Checklist
- Dockerfile
- docker-compose
- .env.example criado
- .dockerignore aplicado