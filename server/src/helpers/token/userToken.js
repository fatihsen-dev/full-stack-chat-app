import JWT from "jsonwebtoken";

export const createToken = (data) => {
   return JWT.sign(data, process.env.JWT_KEY);
};
