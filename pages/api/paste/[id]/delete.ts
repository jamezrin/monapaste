import { StatusCodes } from 'http-status-codes';
import { nanoid } from 'nanoid';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

import type { Prisma } from '@prisma/client';

import prisma from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getSession({ req });
  const { id } = req.query;

  res.status(StatusCodes.ACCEPTED);
  res.end();
}
