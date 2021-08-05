import mongoose from 'mongoose';

export interface PlayerDocSchema extends mongoose.Document{
  username: string,
  points: number
}

export interface VoteDocSchema extends mongoose.Document{
  vote: number,
  username: string
}

export interface QuestionDocSchema extends mongoose.Document{
  question: string,
  questionId: string
}

export interface ResponseDocSchema extends mongoose.Document{
  response: string,
  username: string,
  question: string,
  votes: VoteDocSchema[]
}

export interface GameDocSchema extends mongoose.Document {
  players: PlayerDocSchema[]
  hasStarted: boolean,
  hasEnded: boolean,
  rounds: number,
  currentRound: number,
  roomId: string,
  creator: string,
  questions: string[],
  response: ResponseDocSchema[]
}
