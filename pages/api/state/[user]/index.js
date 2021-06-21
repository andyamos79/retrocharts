export default function handler(req, res) {
    const { user } = req.query;
    console.log(`${user}`);
    res.send({
        user,
    })
}