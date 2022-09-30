import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

// const settings = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// };


dotenv.config({});

// const db = mongoose.connection;

// db.on('error', () => {
//   console.log('DB error');
// });
// db.once('open', () => {
//   console.log('Connected to DB');
// });

mongoose
.connect(process.env.MONGO_DB)
.then(() => {
  console.log('Succefully connected');
})
.catch((err: any) => {
  console.log('Getting error connecting to MongoDB using Mongoose : ', err);
})

export default mongoose;

