# Migration `20201023134741-init`

This migration has been generated by Diego Araujo at 10/23/2020, 10:47:41 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "Link" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL
)
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20201023134741-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,18 @@
+// Fonte de dados : informa ao Prisma que você usará SQLite para sua conexão de banco de dados.
+datasource db {
+  provider = "sqlite"
+  url = "***"
+}
+
+// Gerador : indica que você deseja gerar o Cliente Prisma.
+generator client {
+  provider = "prisma-client-js"
+}
+
+// Modelo de dados : aqui, escrevemos nosso Link como um modelo.
+model Link {
+  id          Int      @id @default(autoincrement())
+  createdAt   DateTime @default(now())
+  description String
+  url         String
+}
```


