import mongoose from 'mongoose';

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

const QuestionModel = mongoose.model('Question', QuestionSchema);

export default { QuestionModel, QuestionSchema };
