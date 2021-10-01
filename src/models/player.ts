import mongoose from 'mongoose';

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

export const PlayerModel = mongoose.model('Player', PlayerSchema);
