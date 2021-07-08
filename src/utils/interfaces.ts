import mongoose from 'mongoose';
import PlayerSchema from '../models/player';
import QuestionSchema from '../models/question';
import ResponseSchema from '../models/response';
import VoteSchema from '../models/vote';

export interface GameDocSchema extends mongoose.Document {
  players: typeof PlayerSchema[]
  hasStarted: boolean,
  hasEnded: boolean,
  rounds: number,
  roomId: string,
  creator: string,
  questions: typeof QuestionSchema[],
  response: typeof ResponseSchema[]
}

export interface PlayerDocSchema extends mongoose.Document{
  username: string,
  points: number
}

export interface QuestionDocSchema extends mongoose.Document{
  question: string,
  questionId: string
}

export interface ResponseDocSchema extends mongoose.Document{
  response: string,
  username: string,
  questionId: string,
  votes: typeof VoteSchema[]
}

export interface VoteDocSchema extends mongoose.Document{
  vote: number,
  username: string
}
