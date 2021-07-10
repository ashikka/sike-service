import Joi from 'joi';

const roomJoinSchema = Joi.object({
  username: Joi.string().required(),
  roomID: Joi.string().required(),
});

export default roomJoinSchema;
