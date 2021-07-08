import mongoose from 'mongoose';
import { VoteDocSchema } from '../utils/interfaces';

const VoteSchema = new mongoose.Schema({
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

const VoteModel = mongoose.model<VoteDocSchema>('Vote', VoteSchema);

export default { VoteModel, VoteSchema };
