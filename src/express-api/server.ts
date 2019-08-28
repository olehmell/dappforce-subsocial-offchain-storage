import { pool } from './../adaptors/connectPostgre'
import { getJsonFromIpfs, addJsonToIpfs, IpfsData, removeFromIpfs } from './adaptors/ipfs'

import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors';
// import * as multer from 'multer';
// const upload = multer();
const app = express();

app.use(cors());

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

// // for parsing multipart/form-data
// app.use(upload.array());
// app.use(express.static('public'));


//IPFS API
app.get('/v1/ipfs/get/:hash', async (req: express.Request, res: express.Response) => {
  const data = await getJsonFromIpfs(req.params.hash as string);
  res.json(data);
});

app.get('/v1/ipfs/rm/:hash', (req: express.Request) => {
  removeFromIpfs(req.params.hash as string);
});

app.post('/v1/ipfs/add', async (req: express.Request, res: express.Response) => {
  const data = req.body;
  console.log(data);
  const hash = await addJsonToIpfs(req.body as IpfsData);
  res.json(hash);
});

//Subscribe API
app.get('/v1/offchain/feed/:id', async (req: express.Request, res: express.Response) => {
  const query = 'SELECT DISTINCT * FROM df.activities WHERE id IN(SELECT activity_id from df.news_feed WHERE account = $1)';
  const params = [req.params.id];
  console.log(params);
  try {
    const data = await pool.query(query, params)
    console.log(data.rows);
    res.json(data.rows);
    //res.send(JSON.stringify(data));
  } catch (err) {
    console.log(err.stack);
  }
});

app.get('/v1/offchain/notifications/:id', async (req: express.Request, res: express.Response) => {
  const query = 'SELECT DISTINCT * FROM df.activities WHERE id IN(SELECT activity_id from df.notifications WHERE account = $1)';
  const params = [req.params.id];
  try {
    const data = await pool.query(query, params)
    console.log(data.rows);
    res.json(data.rows);
  } catch (err) {
    console.log(err.stack);
  }
});

const port = 3001;
app.listen(port, () => {
  console.log(`server started on port ${port}`)
})