import express, { Request, Response } from 'express';
import { getSupervisors } from './endpoints/supervisors';

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
  app.get('/api/supervisors', getSupervisors);

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
