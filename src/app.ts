import express, { Express, Request, Response } from 'express';
import { readFile, writeFile } from 'fs/promises';
import { RateLimit } from './rateLimit';

const app: Express = express();

app.use(express.json());

const rateLimit = new RateLimit();
rateLimit.startTime();

app.post('/save', async (req: Request, res: Response) => {
  const isCheck = await rateLimit.check();
  if (!isCheck) {
    return res.status(429).json({
      message: 'Rate limited',
    });
  }

  const data = JSON.stringify(req.body);

  await writeFile('data.json', data);

  res.json({
    message: 'ok',
  });
});

app.get('/load', async (req: Request, res: Response) => {
  const isCheck = await rateLimit.check();
  if (!isCheck) {
    return res.status(429).json({
      message: 'Rate limited',
    });
  }

  const data = await readFile('data.json', { encoding: 'utf-8', flag: 'r' });

  res.json(JSON.parse(data));
});

app.get('/another', async (req: Request, res: Response) => {
  res.send('2');
});

export default app;
