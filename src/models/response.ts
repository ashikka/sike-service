import mongoose from 'mongoose';
import { ResponseDocSchema } from '../utils/interfaces';

export const ResponseSchema = new mongoose.Schema({
  response: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  questionId: {
    type: String,
    // required: true,
    // unique: true,
  },
  votes: {
    type: [String],
    default: [],
  },
});

export const ResponseModel = mongoose.model<ResponseDocSchema>('Response', ResponseSchema);
