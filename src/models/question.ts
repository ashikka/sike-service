import mongoose from 'mongoose';
import { QuestionDocSchema } from '../utils/interfaces';

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    unique: true,
  },
  questionId: {
    type: String,
    required: true,
    unique: true,
  },
});

const QuestionModel = mongoose.model<QuestionDocSchema>('Question', QuestionSchema);

export default { QuestionModel, QuestionSchema };
