import HttpStatus from 'http-status-codes';
import { nanoid } from 'nanoid';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

import type { Prisma } from '@prisma/client';

import { handleErrors } from '@/lib/errors';
import prisma from '@/lib/prisma';

type QueryParams = {
  language: string;
  title?: string;
  visibility: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { language, title, visibility } = req.query as QueryParams;
  const content = req.body;

  const session = await getSession({ req });

  const pasteId = nanoid();
  const creatorAddr = req.headers['from'] || req.socket.remoteAddress;

  const pasteCreateArgs: Prisma.PasteCreateArgs = {
    data: {
      id: pasteId,
      title: title,
      creatorAddr: creatorAddr,
      revisions: {
        create: {
          content: content,
          languageName: language,
        },
      },
    },
    include: {
      revisions: {
        select: {
          id: true,
          createdAt: true,
          languageName: true,
        },
      },
    },
  };

  if (session) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (user) {
      pasteCreateArgs.data.creator = {
        connect: { email: user.email },
      };
    }
  }

  const createdPaste = await prisma.paste.create(pasteCreateArgs);

  res.status(HttpStatus.CREATED).json(createdPaste);
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb',
    },
  },
};

export default handleErrors(handler);
