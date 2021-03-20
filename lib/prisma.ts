import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV !== 'production') {
  const globalType: any = global;

  if (!globalType.prisma) {
    globalType.prisma = new PrismaClient();
  }

  prisma = globalType.prisma;
} else {
  prisma = new PrismaClient();
}

export default prisma;
