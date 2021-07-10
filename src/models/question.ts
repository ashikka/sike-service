import mongoose from 'mongoose';
import { QuestionDocSchema } from '../utils/interfaces';

export const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    // required: true,
  },
  questionId: {
    type: String,
    // required: true,
    // unique: true,
  },
});

export const QuestionModel = mongoose.model<QuestionDocSchema>('Question', QuestionSchema);
