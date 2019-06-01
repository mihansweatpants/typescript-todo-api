require('dotenv').config();
import 'reflect-metadata';
import 'module-alias/register';

import express from 'express';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';

import { resolve } from '~/utils';
import routes from '~/routes';

(async () => {
  const [err] = await resolve(createConnection());

  if (err != null) {
    console.log(`Unable to connect to db: \n${err}`);
    process.exit(1);
  }

  const app = express();
  app.use(bodyParser.json());
  app.use('/api', routes);

  const port = process.env.PORT || 3001;
  app.listen(port, () => console.log(`api listening at http://localhost:${port}`));
})();
