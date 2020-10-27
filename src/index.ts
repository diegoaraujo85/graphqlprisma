// import { request } from 'express';
import { GraphQLServer, PubSub } from 'graphql-yoga';
import path from 'path';

import { PrismaClient } from '@prisma/client';

import resolvers from './resolvers';

const prisma = new PrismaClient();

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: path.resolve(__dirname, 'schema.graphql'),
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
      pubsub,
    }
  }
});

server.start(() => console.log(`🚀 Server is running on http://localhost:4000`))
