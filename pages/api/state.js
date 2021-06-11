import Cors from 'cors';
import initMiddleware from '../../lib/init-middleware';

import { setData, getData } from '../../services/storage';

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'OPTIONS'],
  })
);

export default async (req, res) => {
  await cors(req, res);

  const { body } = req;
  let userName;
  let result;
  if (req.method === "POST") {
    userName = body.meta.userName;
    result = setData(userName, body);
    if (result instanceof Error) {
      return res.status(400).json({ message: 'unable to write' });
    }
    return res.status(200).json(getData(userName))
  } 
  else if (req.method === "GET") {
    userName = req.query.username;
    result = getData(userName);
    if (result instanceof Error) {
      return res.status(400).json({ message: 'unable to read' });
    }
    return res.status(200).json(result)
  }
  return res.status(405).json({ message: "error" });
}
