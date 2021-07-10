import socketio from 'socket.io';
import logger from '../utils/logger';
import {
  onJoin, onStart, onEnd,
} from './socket';

export default function socketHandler(io: socketio.Server) {
  const namespace = '';
  io.of(namespace).on('connection', (socket: socketio.Socket) => {
    logger.info(`Connected ${socket.id}`);

    socket.on('join', async (data) => {
      logger.info(`${socket.id} Joined room ${data.roomId}`);
      await onJoin(data, io, namespace);
    });

    socket.on('start', async (data) => {
      await onStart(data, io, namespace);
    });

    // socket.on('disconnect', async (data) => {
    //   logger.info(`Disconnected ${socket.id}`);
    //   await onDisconnect(data, io, namespace);
    // });

    socket.on('end', async (data) => {
      await onEnd(data, io, namespace);
    });
  });
}