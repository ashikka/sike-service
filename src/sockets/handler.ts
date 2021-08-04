import socketio from 'socket.io';
import logger from '../utils/logger';
import {
  onJoin, onStart, onDisconnect, onEnd, onAttempt, calculateBestResponse, updateLeaderboard, onNext,
} from './socket';

export default function socketHandler(io: socketio.Server) {
  const namespace = '';
  io.of(namespace).on('connection', (socket: socketio.Socket) => {
    logger.info(`Connected ${socket.id}`);

    socket.on('join', async (data) => {
      logger.info(`${socket.id} Joined room ${data.roomId}`);
      await socket.join(data.roomId);
      onJoin(data, io, namespace);
    });

    socket.on('start', async (data) => {
      logger.info('Game started');
      await socket.join(data.roomId);
      onStart(data, io, namespace);
    });

    socket.on('disconnectPlayer', async (data) => {
      logger.info(`Disconnected ${data.username}`);
      await socket.join(data.roomId);
      onDisconnect(data, io, namespace);
    });

    socket.on('onAttempt', async (data) => {
      await onAttempt(data, io, namespace);
    });

    socket.on('OnVoting', async (data) => {
      await calculateBestResponse(data, io, namespace);
    });

    socket.on('onVotingEnd', async (data) => {
      await updateLeaderboard(data, io, namespace);
    });

    socket.on('next', async (data) => {
      logger.info('Next round');
      await socket.join(data.roomId);
      onNext(data, io, namespace);
    });

    socket.on('end', async (data) => {
      logger.info('Game ended');
      await socket.join(data.roomId);
      onEnd(data, io, namespace);
    });
  });
}
