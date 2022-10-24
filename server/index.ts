import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './router';
import * as dotenv from 'dotenv';

dotenv.config()
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(router);

app.listen(process.env.PORT! || 8080, () => {
  console.log(`Listening on port ${process.env.PORT! || 8080}`);
});

