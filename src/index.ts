/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import http from 'http';
import logger from './utils/logger';

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());

server.listen(process.env.PORT || 8000, (): void => {
  logger.info(`App listening on port ${process.env.PORT}`);
});
