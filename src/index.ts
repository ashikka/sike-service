import express from 'express';

require('dotenv').config();

const app = express();

app.listen(process.env.PORT || 8000, (): void => {
  console.log(`App listening on port ${process.env.PORT}`);
});
