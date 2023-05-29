import express from 'express';
import fetch from 'node-fetch';

const app = express()
const port = 3000

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');

  next();
});
app.use(express.json());

app.post('/', async (req, res) => {
  const { url } = req.body;
  const imageUrlData = await fetch(url);
  const buffer = await imageUrlData.arrayBuffer();
  const stringifiedBuffer = Buffer.from(buffer).toString('base64');
  const contentType = imageUrlData.headers.get('content-type');
  const imageBase64 = `data:${contentType};base64,${stringifiedBuffer}`;
  res.send(imageBase64);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})