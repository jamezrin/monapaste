import type { NextApiRequest, NextApiResponse } from 'next';
import { PasteStatus, PasteVisibility, User } from '@prisma/client';
import HttpStatus from 'http-status-codes';
import { getSession } from 'next-auth/client';

import prisma from 'lib/prisma';
import {
  AccessForbiddenError,
  ResourceNotFoundError,
  handleErrors,
} from 'lib/errors';

type QueryParams = {
  id: string;
  title: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, title } = req.query as QueryParams;

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

  const updatedPaste = await prisma.paste.update({
    where: { id: paste.id },
    data: { title },
  });

  res.status(HttpStatus.ACCEPTED).send(updatedPaste);
}

export default handleErrors(handler);
