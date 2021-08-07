import express, { Response, Request } from 'express';
import roomRouter from './room';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Welcome to sike-service',
  });
});

router.use('/room', roomRouter);

export default router;
