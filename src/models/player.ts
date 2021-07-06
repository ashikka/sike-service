import mongoose from 'mongoose';

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

const PlayerModel = mongoose.model('Player', PlayerSchema);

export default { PlayerModel, PlayerSchema };
