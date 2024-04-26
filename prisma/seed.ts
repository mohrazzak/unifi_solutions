import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// const isProduction = process.env.NODE_ENV === 'production';

async function main() {}

main()
  .then(async () => {
    await prisma.item.createMany({
      data: [
        { name: 'Iron', weight: 10 },
        { name: 'Gold', weight: 5 },
        { name: 'Water', weight: 3 },
        { name: 'Pickaxe', weight: 2 },
        { name: 'Extra materials', weight: 1 },
      ],
    });
    await prisma.mover.create({
      data: { energy: 4, weightLimit: 20 },
    });

    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
