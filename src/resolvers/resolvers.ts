import { PrismaClient } from '@prisma/client';

/**
 * Resolvers é a implementação real do esquema graphql (typeDefs), 
 * sua estrutura é identica à estrutura de definição de tipos (typeDefs)
 */
const resolvers = {
  // Query: {
  //   info: () => `This is the API of a Hackernews Clone`,



  //   link: async (parent, args, context: Context) => {
  //     return context.prisma.link.findOne({
  //       where: {
  //         id: Number(args.id),
  //       }
  //     });
  //   }
  // },

  // Mutation: {

  // },
}

export default resolvers;