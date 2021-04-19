import { NextApiRequest } from 'next';

export function getClientAddress(req: NextApiRequest) {
  return req.headers['x-real-ip'] || req.socket.remoteAddress;
}
