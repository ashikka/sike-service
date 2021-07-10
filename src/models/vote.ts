import mongoose from 'mongoose';
import { VoteDocSchema } from '../utils/interfaces';

export const VoteSchema = new mongoose.Schema({
  vote: {
    type: Number,
    required: true,
    default: 0,
  },

  username: {
    type: String,
    required: true,
    unique: true,
  },
});

export const VoteModel = mongoose.model<VoteDocSchema>('Vote', VoteSchema);
