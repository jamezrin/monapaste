import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import { nanoid } from 'nanoid';
import { StatusCodes } from 'http-status-codes';
import type { Prisma } from '@prisma/client';
import prisma from 'lib/prisma';

type QueryParams = {
  language: string;
  title?: string;
  visibility: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { language, title, visibility } = req.query as QueryParams;
  const session = await getSession({ req });

  const pasteId = nanoid();
  const pasteCreateArgs: Prisma.PasteCreateArgs = {
    data: {
      id: pasteId,
      title: title,
      creatorAddr: req.socket.remoteAddress,
      revisions: {
        create: {
          content: req.body,
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
  res.send(createdPaste);
  res.status(StatusCodes.CREATED);
  res.end();
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb',
    },
  },
};
