import Prisma from '@prisma/client';

// const prisma = new Prisma.PrismaClient({ log: ['query', 'info', 'warn', 'error'] });
const prisma = new Prisma.PrismaClient({ log: ['warn', 'error'] });

export default prisma;
