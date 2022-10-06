import * as express from 'express';
import * as cors from 'cors';
import * as morgan from 'morgan';
import router from './router'
const app = express();
// const port = 3050;

import 'dotenv/config'

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(router);


app.listen(process.env.PORT || 8080, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});

