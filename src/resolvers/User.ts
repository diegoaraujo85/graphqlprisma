import { PrismaClient } from '@prisma/client';

interface Context {
  prisma: PrismaClient;
}

export function links(parent, args, context: Context) {
  return context.prisma.user.findOne({
    where: {
      id: parent.id
    }
  }).links()
}

export default { links }