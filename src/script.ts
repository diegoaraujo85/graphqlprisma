// importa o construtor
import { PrismaClient } from '@prisma/client';

// Instancia
const prisma = new PrismaClient();

// função responsavel por enviar as consultas ao banco
// todas as consultas ficarão aqui
async function main() {

  const newLink = await prisma.link.create({
    data: {
      description: 'Fullstack tutorial for GraphQL',
      url: 'www.howtographql.com',
    }
  })

  const allLinks = await prisma.link.findMany()
  console.log(allLinks);

}

// fecha as conexões do banco quado o script terminar
main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })