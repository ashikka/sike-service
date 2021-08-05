import mongoose from 'mongoose';
import { ResponseDocSchema } from '../utils/interfaces';

export const ResponseSchema = new mongoose.Schema({
  response: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  votes: {
    type: [String],
    default: [],
  },
});

export const ResponseModel = mongoose.model<ResponseDocSchema>('Response', ResponseSchema);
