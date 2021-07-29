import Joi from 'joi';

const roomJoinSchema = Joi.object({
  username: Joi.string().required(),
  roomId: Joi.string().required(),
});

export default roomJoinSchema;
