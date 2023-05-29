import cors from 'cors';
import express from 'express';
import fetch from 'node-fetch';

const app = express()
const port = 4000

app.use(cors());
app.use(express.json());

app.post('/', async (req, res) => {
  console.log('Chegou request')
  const { url } = req.body;
  const imageUrlData = await fetch(url);
  const buffer = await imageUrlData.arrayBuffer();
  const stringifiedBuffer = Buffer.from(buffer).toString('base64');
  const contentType = imageUrlData.headers.get('content-type');
  const imageBase64 = `data:${contentType};base64,${stringifiedBuffer}`;
  res.json({ image: imageBase64 });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})