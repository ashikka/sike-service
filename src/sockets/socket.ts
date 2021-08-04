/* eslint-disable consistent-return */
import socketio from 'socket.io';
import { GameModel } from '../models/game';
import { ResponseModel } from '../models/response';
import calculateVotes from '../utils/calculateVotes';
import { PlayerDocSchema } from '../utils/interfaces';
import questionAssigner from '../utils/questionAssigner';
import logger from '../utils/logger';

// On join keep adding new players
export function onJoin(
  data: { roomId: string; players: PlayerDocSchema[] },
  io: socketio.Server,
  namespace: string,
) {
  const { roomId, players } = data;
  logger.info(data);

  if (!roomId || !players || !players.length) {
    return;
  }
  io.of(namespace).to(roomId).emit('join', {
    players,
  });
}

// Start game
export async function onStart(
  data: { roomId: string },
  io: socketio.Server,
  namespace: string,
) {
  const { roomId } = data;

  const game = await GameModel.findOneAndUpdate(
    { roomId },
    {
      $set: {
        hasStarted: true,
      },
    },
  );
  if (game) {
    const questions = questionAssigner(game.players);
    await GameModel.findOneAndUpdate(
      { roomId },
      {
        $set: {
          currentRound: 1,
          questions,
        },
      },
    );
  }

  if (!game) {
    return;
  }
  if (!game.hasStarted) {
    return;
  }

  io.of(namespace).to(roomId).emit('start', {
    roomId,
    hasStarted: true,
  });
}

// One question attempt and keep adding responses
export async function onAttempt(
  data: {
    roomId: string;
    username: string;
    response: string;
    questionId: string;
  },
  io: socketio.Server,
  namespace: string,
) {
  const {
    roomId, username, response, questionId,
  } = data;

  if (!response || !username || !roomId) return false;

  const game = await GameModel.findOne({ roomId });

  if (!game) return false;
  const responseOfPlayer = await ResponseModel.create({
    response,
    username,
    questionId,
  });

  let updatedGame;
  if (game) {
    updatedGame = await GameModel.updateOne(
      { roomId },
      { $push: { response: responseOfPlayer } },
    );
  }

  io.of(namespace).in(roomId).emit('onAttempt', {
    game,
    updatedGame,
  });
}

// Vote for best response
export async function calculateBestResponse(
  data: {
    roomId: string;
    username: string;
    response: string;
    questionId: string;
  },
  io: socketio.Server,
  namespace: string,
) {
  const {
    roomId, username, response, questionId,
  } = data;

  if (!response || !username || !roomId || !questionId) return false;

  const game = await GameModel.findOne({ roomId });

  if (!game) return false;

  let updatedGame;
  if (game) {
    updatedGame = await ResponseModel.updateOne(
      { roomId },
      { $push: { votes: username } },
    );
  }
  io.of(namespace).in(roomId).emit('onVoting', {
    game,
    updatedGame,
  });
}

// Calculate points and update leaderboard
export async function updateLeaderboard(data: {roomId: string}, io: socketio.Server,
  namespace: string) {
  const { roomId } = data;
  const game = calculateVotes(roomId);

  io.of(namespace).in(roomId).emit('onVotingEnd', {
    game,
  });
}

// Finish round next question
export async function onNext(data: { roomId: string },
  io: socketio.Server,
  namespace: string) {
  const { roomId } = data;

  const game = await GameModel.findOne({ roomId });
  if (!game) return false;

  if (game.currentRound > 0 && game.currentRound < game.rounds) {
    const updatedCurrentRound = game.currentRound + 1;
    let updatedGame;
    if (game) {
      updatedGame = await GameModel.findOneAndUpdate(
        { roomId },
        { $set: { currentRound: updatedCurrentRound } },
      );
    }
    io.of(namespace).to(roomId).emit('next', {
      updatedGame,
    });
  }
}

// If user disconnects remove them from the game
export async function onDisconnect(
  data: { roomId: string; username: string },
  io: socketio.Server,
  namespace: string,
) {
  const { roomId, username } = data;

  if (!roomId || !username) return;

  const game = await GameModel.findOneAndUpdate(
    { roomId },
    { $pull: { players: { username } } },
  );
  if (game) {
    io.of(namespace).to(roomId).emit('disconnectPlayer', {
      username,
    });
  }
}

// End the game
export async function onEnd(
  data: { roomId: string },
  io: socketio.Server,
  namespace: string,
) {
  const { roomId } = data;

  if (!roomId) return;

  const game = await GameModel.deleteOne({ roomId });
  if (game) {
    io.of(namespace).to(roomId).emit('end', {
      roomId,
    });
  }
}
