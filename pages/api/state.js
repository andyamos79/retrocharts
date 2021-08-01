import Cors from 'cors';
import initMiddleware from '../../lib/init-middleware';

import { getUserDetailsByDate, insertUserValues } from '../../services/storage';

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'OPTIONS'],
  })
);

export default async (req, res) => {
  await cors(req, res);
  let result;
  if (req.method === "POST") {
    const { body } = req;
    if (body) {
      const [firstName, lastName] = body.meta.userName.split(" ");
      const postResult = insertUserValues({ firstName, lastName: lastName || "", data: body.data });

      if (postResult instanceof Error) {
        return res.status(400).json({ message: 'Unable to write data' });
      }
      
      return res.status(200).json({ postResult });
    }
  } else if (req.method === "GET") {
    const result = getUserDetailsByDate(req.query, new Date())
    return res.status(200).json({ user: `${req.query.firstName} ${req.query.lastName}`  })
  }
  return res.status(405).json({ message: `Method NOT supported: ${req.method}` });
}
