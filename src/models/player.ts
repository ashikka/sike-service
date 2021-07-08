import mongoose from 'mongoose';
import { PlayerDocSchema } from '../utils/interfaces';

const PlayerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
    default: 0,
  },
});

const PlayerModel = mongoose.model<PlayerDocSchema>('Player', PlayerSchema);

export default { PlayerModel, PlayerSchema };
