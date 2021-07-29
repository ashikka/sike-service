import mongoose, { Model } from 'mongoose';
import { PlayerDocSchema } from '../utils/interfaces';

export const PlayerSchema = new mongoose.Schema({
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

export const PlayerModel: Model<PlayerDocSchema> = mongoose.model('Player', PlayerSchema);
