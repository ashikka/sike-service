import mongoose from 'mongoose';
import VoteSchema from './vote';

const ResponseSchema = new mongoose.Schema({
  Response: {
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

const ResponseModel = mongoose.model('Response', ResponseSchema);

export default { ResponseModel, ResponseSchema };
