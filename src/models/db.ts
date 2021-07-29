import mongoose from 'mongoose';
import logger from '../utils/logger';

export default async function connectDB(URL: string) {
  await mongoose
    .connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => {
      logger.info('DB connected successfully');
    })
    .catch((e) => {
      logger.info('DB connection failed: ', e);
    });
}
