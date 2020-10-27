```
yarn add -D @prisma/cli
```

```
mkdir prisma
touch prisma/schema.prisma
```

# Modelo de dados
todos os modelos são definidos no arquivo ./prisma/schema.prisma

# Migrations
(apos preencher o schema.prisma) 
```
npx prisma migrate save --experimental
```
Você receberá um prompt perguntando se deseja criar um novo banco de dados. 
Selecione Sim e digite o Nome da migração. 
Enter para confirmar.


Porém, o banco ainda não foi criado
```
npx prisma migrate up --experimental
```

# Prisma Client
Sempre que houver mudanças no modelo de dados (./prisma/schema.prisma) deve ser gerado um novo prisma client
```
npx prisma generate
```

## as consultas estão no arquivo ./src/scripts.ts
```
yarn devs
```
o comando acima está configurado no package.json do projeto


# Introspect
o comando a seguir faz o processo contrário do migrate, ele cria o modelo de dados baseado num banco já existente
```
npx prisma introspect
```

# Prisma Studio
Agora com o banco criado, execute o comando abaixo para abrir o Prisma Studio e ver seu banco
```
npx prisma studio
```

# Resumo do seu fluxo de trabalho
Para recapitular, este é o fluxo de trabalho típico que você seguirá ao atualizar seus dados:

- Ajuste manualmente seu modelo de dados Prisma. (./prisma/schema.prisma). [Modelo de dados](#modelo-de-dados)
- Migre seu banco de dados usando os prisma migrate comandos CLI que abordamos. [Migrations](#migrations)
- (Re-) gerar Cliente Prisma. [Prisma Client](#prisma-client)
- Use o Prisma Client em seu código de aplicativo para acessar seu banco de dados.

## fluxo
1. modelo de dados
2. migrates (save e up)
3. generate PrismaClient
4. schema.graphql, add new Query, Mutation or Subscription, or edit for new fields

# FAQ
1. O que é um GraphQL Playground?
   - Um IDE GraphQL para trabalhar com uma API GraphQL
2. Qual é a função dos campos raiz para uma API GraphQL?
   - Os campos raiz definem as operações de API disponíveis
3. Como as consultas GraphQL são resolvidas?
   - Invocando as funções de resolução para os campos contidos na consulta
4. Para que é usado o segundo argumento que é passado para os resolvedores GraphQL?
   - Ele carrega os argumentos para a operação GraphQL de entrada
5. Qual é a função do Prisma Client na API GraphQL?
   - Ele migra seu esquema de banco de dados
6. Qual é o propósito do argumento de contexto nos resolvedores GraphQL?
   - Permite que os resolvedores se comuniquem uns com os outros
7. Qual campo de cabeçalho HTTP carrega o token de autenticação?
   - Autenticação
8. Subscriptions
   - As assinaturas são normalmente implementadas via WebSockets
9. Quais argumentos são normalmente usados ​​para paginar por meio de uma lista na API Prisma Client usando paginação de deslocamento de limite?
   - skip & orderBy
  