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
  const { body } = req;

  if (req.method === "POST") {
    if (!body) {
      return res.status(400).json({ message: "no body specified" });
    }
    const [firstName, lastName] = body.meta.userName.split(" ");
  
    const postResult = insertUserValues({ firstName, lastName: lastName || "", data: body.data });
    if (postResult instanceof Error) {
      return res.status(400).json({ message: 'Unable to write data' });
    }
    console.log(JSON.stringify(postResult));
    return res.status(200).json({ postResult });
  } 
  else if (req.method === "GET") {
    result = getUserDetailsByDate({ firstName, lastName: lastName || "" }, new Date().toDateString());
    if (result instanceof Error) {
      return res.status(400).json({ message: `Unable to fetch user details: ${result.message}` });
    }
    return res.status(200).json(result);
  }
  return res.status(405).json({ message: `Method NOT supported: ${req.method}` });
}
