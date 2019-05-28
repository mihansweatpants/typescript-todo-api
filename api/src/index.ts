import 'module-alias/register';
import express from 'express';

import routes from '~/routes';

const app = express();
app.use(routes);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`api listening at http://localhost:${port}`));
