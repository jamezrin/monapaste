import HttpStatus from 'http-status-codes';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

import { PasteStatus, PasteVisibility, User } from '@prisma/client';

import {
  AccessForbiddenError,
  ResourceNotFoundError,
  handleErrors,
} from '@/lib/errors';
import prisma from '@/lib/prisma';

type QueryParams = {
  id: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query as QueryParams;

  const session = await getSession({ req });

  const paste = await prisma.paste.findFirst({
    where: { id },
  });

  if (!paste) {
    throw ResourceNotFoundError;
  }

  let user: User;
  if (session) {
    user = await prisma.user.findFirst({
      where: { email: session.user.email },
    });
  }

  if (paste.status !== PasteStatus.OK) {
    throw AccessForbiddenError;
  }

  if (paste.visibility === PasteVisibility.PRIVATE) {
    if (!user || paste.creatorId !== user.id) {
      throw AccessForbiddenError;
    }
  }

  const pasteRev = await prisma.pasteRev.findFirst({
    where: { paste },
    orderBy: {
      createdAt: 'desc',
    },
    take: 1,
  });

  res.status(HttpStatus.OK).send(pasteRev.content);
}

export default handleErrors(handler);
