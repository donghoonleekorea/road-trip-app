const Express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = new Express();
// const port = 3050;
const router = require('./router');
require('dotenv').config('./.env');


app.use(cors());
app.use(morgan('dev'));
app.use(Express.json());
app.use(router);


app.listen(process.env.PORT || 8080, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
