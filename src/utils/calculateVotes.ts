import { GameModel } from '../models/game';

export default async function calculateVotes(roomId: string) {
  const game = await GameModel.find({ roomId }).sort({ responses: { votes: 1 } });
  return game;
}
