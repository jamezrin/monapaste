import HttpStatus from 'http-status-codes';
import { nanoid } from 'nanoid';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

import { PasteStatus, PasteVisibility, User } from '@prisma/client';
import type { Prisma } from '@prisma/client';

import {
  AccessForbiddenError,
  ResourceNotFoundError,
  handleErrors,
} from '@/lib/errors';
import prisma from '@/lib/prisma';
import { getClientAddress } from '@/lib/utils';

type QueryParams = {
  id: string;
  language: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query as QueryParams; // TODO: pass paste and revision?
  const content = req.body;

  const session = await getSession({ req });
  const creatorAddr = getClientAddress(req);
  const newPasteId = nanoid();

  res.status(HttpStatus.CREATED).json(null);
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb',
    },
  },
};

export default handleErrors(handler);
