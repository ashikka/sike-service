import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import logger from './utils/logger';
import connectDB from './models/db';
import routes from './routes/mainRouter';

dotenv.config();

connectDB(process.env.DB_URL || '');

const app = express();
const server = http.createServer(app);

app.use(express.urlencoded({
  extended: false,
}));
app.use(express.json());

app.use('/', routes);

server.listen(process.env.PORT || 8000, (): void => {
  logger.info(`App listening on port ${process.env.PORT}`);
});
