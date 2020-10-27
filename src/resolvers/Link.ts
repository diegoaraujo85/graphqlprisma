import { PrismaClient } from '@prisma/client';

interface Context {
  prisma: PrismaClient;
}

function postedBy(parent, args, context: Context) {
  return context.prisma.link.findOne({
    where: {
      id: parent.id
    }
  }).postedBy()
}

function votes(parent, args, context: Context) {
  return context.prisma.link.findOne({
    where: {
      id: parent.id
    },
  }).votes()
}

async function numberOfVotes(parent, args, context, info) {
  const links = await votes(parent, args, context);
  return links.length;
}

export default { postedBy, votes, numberOfVotes }