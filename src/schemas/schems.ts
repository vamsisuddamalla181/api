import Joi from 'joi';

export const validateUser = (data: any) => {
  return Joi.object({
    name:Joi.string().min(5).max(10).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  }).validate(data);
};
