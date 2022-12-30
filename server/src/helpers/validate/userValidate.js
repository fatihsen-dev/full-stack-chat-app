import Joi from "joi";

export const userValidate = (user) => {
   return Joi.object({
      username: Joi.string().required().min(4).max(18),
      password: Joi.string().required().min(6).max(30),
   }).validate(user);
};
