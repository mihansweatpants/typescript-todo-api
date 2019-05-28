import 'reflect-metadata';
import 'module-alias/register';

import express from 'express';
import { createConnection } from 'typeorm';

import routes from '~/routes';

(async () => {
  try {
    await createConnection();
  } catch (err) {
    console.log(`Unable to connect to db: \n${err}`);
    process.exit(1);
  }

  const app = express();
  app.use(routes);

  const port = process.env.PORT || 3001;
  app.listen(port, () => console.log(`api listening at http://localhost:${port}`));
})();
