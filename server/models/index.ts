import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config()

mongoose.connect(process.env.MONGO_DB!);
const db = mongoose.connection;

db.on('error', () => {
  console.log('DB error');
});
db.once('open', () => {
  console.log('Connected to DB');
});


export default mongoose;












