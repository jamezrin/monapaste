import type { NextApiRequest, NextApiResponse } from 'next';
import { PasteStatus, PasteVisibility, User } from '@prisma/client';
import HttpStatus from 'http-status-codes';
import { getSession } from 'next-auth/client';
import type { Prisma } from '@prisma/client';

import prisma from 'lib/prisma';
import {
  AccessForbiddenError,
  ResourceNotFoundError,
  handleErrors,
} from 'lib/errors';

type QueryParams = {
  id: string;
  language: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, language } = req.query as QueryParams;

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

  const pasteRevCreateArgs: Prisma.PasteRevCreateArgs = {
    data: {
      paste: { connect: { id: paste.id } },
      content: req.body,
      languageName: language,
    },
  };

  const createdRevPaste = await prisma.pasteRev.create(pasteRevCreateArgs);

  res.status(HttpStatus.CREATED).json(createdRevPaste);
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb',
    },
  },
};

export default handleErrors(handler);
