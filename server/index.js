const Express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = new Express();
const port = 3050;
const router = require('./router');

app.use(cors());
app.use(morgan('dev'));
app.use(Express.json());
app.use(router);


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
