import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

function makePrismaClient(): PrismaClient {
  return new PrismaClient({
    log: ['query', 'info', `warn`, `error`],
  });
}

if (process.env.NODE_ENV !== 'production') {
  const globalType: any = global;

  if (!globalType.prisma) {
    globalType.prisma = makePrismaClient();
  }

  prisma = globalType.prisma;
} else {
  prisma = makePrismaClient();
}

export default prisma;
