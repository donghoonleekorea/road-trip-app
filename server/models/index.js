const mongoose = require('mongoose');

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

mongoose.connect('mongodb+srv://user:1234@cluster0.z2worsj.mongodb.net/RoadTrip?retryWrites=true&w=majority', settings);

module.exports = mongoose;

