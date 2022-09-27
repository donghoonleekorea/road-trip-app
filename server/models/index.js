const mongoose = require('mongoose');
require('dotenv').config();

const settings = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const db = mongoose.connection;

db.on('error', () => {
  console.log('DB error');
});
db.once('open', () => {
  console.log('Connected to DB');
});

mongoose.connect(process.env.MONGO_DB, settings);

module.exports = mongoose;

