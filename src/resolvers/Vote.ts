import { PrismaClient } from '@prisma/client';

interface Context {
  prisma: PrismaClient;
}

function link(parent, args, context: Context) {
  return context.prisma.vote.findOne({
    where: {
      id: parent.id
    }
  }).link()
}

function user(parent, args, context: Context) {
  return context.prisma.vote.findOne({
    where: {
      id: parent.id
    }
  }).user()
}

export default { link, user }