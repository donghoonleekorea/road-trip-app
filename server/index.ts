// const Express = require('express');
import express from 'express';

import cors from 'cors';
import morgan from 'morgan';
import router from './router';
import * as dotenv from 'dotenv';

const app = express();

dotenv.config();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(router);

app.listen(process.env.PORT || 8080, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});

export default app;