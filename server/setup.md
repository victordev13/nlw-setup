Setup Server
------

Packages:
 - Prisma ORM (Database ORM)
 - Fastify (Web Server)
 - tsx (TypeScript compilation)

### Setup Prisma
 - `npm i -D prisma`
 - `npm i @prisma/client`
 - `npx prisma init --datasource-provider SQLite`
 - Create your models in prisma/schema.prisma
 - Generate new migration:
   - `npx prisma migrate dev`
 - Open Prisma Studio:
   - `npx prisma studio` 
