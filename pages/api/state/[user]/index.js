import Cors from 'cors';
import initMiddleware from '../../../../lib/init-middleware';

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'OPTIONS'],
  })
);

export default function handler(req, res) {
    console.log(req)
    const { user } = req.query;
    console.log(`${user}`);
    res.send({
        user,
    })
}