import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, rev } = req.query;
  res.end(`paste raw content: ${id} rev ${rev}`);
}
