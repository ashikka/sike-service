import socketio from 'socket.io';
import { GameModel } from '../models/game';
import { PlayerDocSchema } from '../utils/interfaces';
import questionAssigner from '../utils/questionAssigner';

// On join keep adding new players
export function onJoin(
  data: { roomId: string, players: PlayerDocSchema[] },
  io: socketio.Server,
  namespace: string,
) {
  const { roomId, players } = data;

  if (!roomId || !players || !players.length) {
    return;
  }

  io.of(namespace).in(roomId).emit('join', {
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

  const game = await GameModel.findOneAndUpdate({ roomId }, {
    $set: {
      hasStarted: true,
    },
  });
  if (game) {
    const questions = questionAssigner(game.players);
    await GameModel.findOneAndUpdate({ roomId }, {
      $set: {
        questions,
      },
    });
  }

  if (!game) {
    return;
  }
  if (!game.hasStarted) {
    return;
  }
  io.of(namespace).in(roomId).emit('start', {
    roomId,
    hasStarted: true,
  });
}

// one question attempt and keep adding responses

// export async function onAttempt(
//   data: { roomId: string, username: string, response: string },
//   io: socketio.Server,
//   namespace: string,
// ) {
//   const { roomId, username, response } = data;

//   if (!response || !username || !roomId) return false;

//   const game = await GameModel.findOne({ roomId });

//   if (!game) return false;

//   if(game){

//   }
// }

// vote for best response, calc points

// finish round next question

// If user disconnects remove them from the game
export async function onDisconnect(
  data: { roomId: string, username: string },
  io: socketio.Server,
  namespace: string,
) {
  const { roomId, username } = data;

  if (!roomId || !username) return;

  const game = await GameModel.updateOne({ roomId }, { $pull: { players: { username } } });
  if (game) {
    io.of(namespace).in(roomId).emit('disconnect', {
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
    io.of(namespace).in(roomId).emit('end', {
      roomId,
    });
  }
}
