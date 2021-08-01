import Cors from 'cors';
import initMiddleware from '../../lib/init-middleware';

import { getAllUserDetailsByDate } from '../../services/storage';

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'OPTIONS'],
  })
);

export default async (req, res) => {
  await cors(req, res);
  let result;
  if (req.method === "GET") {
    const { query } = req;
    if (query) {
      const date = query.date;
      const data = await getAllUserDetailsByDate(date);
      return res.status(200).json({ data });
    }
  }
  return res.status(405).json({ message: `Method NOT supported: ${req.method}` });
}
