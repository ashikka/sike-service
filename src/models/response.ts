import mongoose from 'mongoose';
import VoteSchema from './vote';
import { ResponseDocSchema } from '../utils/interfaces';

const ResponseSchema = new mongoose.Schema({
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
    required: true,
    unique: true,
  },
  votes: {
    type: [VoteSchema],
    default: [],
  },
});

const ResponseModel = mongoose.model<ResponseDocSchema>('Response', ResponseSchema);

export default { ResponseModel, ResponseSchema };
