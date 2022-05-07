import express, { Request, Response } from 'express';
import cors from 'cors';
import { getSupervisors } from './endpoints/supervisors';
import { createNotification } from './endpoints/notification';

const app = express();

export function createContext({
  req,
  res,
}: {
  req: Request;
  res: Response<any>;
}) {
  return {
    req,
    res,
  };
}

const main = async () => {
  app.use(
    cors({
      origin: 'http://localhost:3000',
    })
  );

  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  app.get('/api/supervisors', getSupervisors);
  app.post('/api/submit', createNotification);

  app.set('trust proxy', 1);

  const host = '0.0.0.0';
  const port = 8080;
  app.listen(port, host, () => {
    console.log(`🚀  Server ready at http://${host}:${port}/`);
  });
};

main().catch((err) => {
  console.error(err);
});

export default app;
