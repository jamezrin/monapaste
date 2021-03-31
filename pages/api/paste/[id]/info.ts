import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import { nanoid } from 'nanoid';
import { StatusCodes } from 'http-status-codes';
import { PasteVisibility, Prisma } from '@prisma/client';
import prisma from 'lib/prisma';

type QueryParams = {
  id: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query as QueryParams;
  const session = await getSession({ req });

  res.status(StatusCodes.OK);
  res.end();
}

