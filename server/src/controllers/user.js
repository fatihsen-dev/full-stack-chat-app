import { createToken } from "../helpers/token/userToken.js";
import { userValidate } from "../helpers/validate/userValidate.js";
import { User } from "../models/user.js";

const allUser = async () => {
   return User.find().select("_id username");
};

export const index = async (req, res) => {
   try {
      return res.send(await allUser());
   } catch (error) {
      return res.status(500).send({ message: "Server error (index)" });
   }
};

export const login = async (req, res) => {
   const { error } = userValidate(req.body);
   if (error) {
      return res.send({ message: error.details[0].message });
   }

   const { username, password } = req.body;

   try {
      const findUser = await User.findOne({ username }).select("-__v");

      if (findUser === null) {
         return res.status(404).send({ message: "User not found" });
      } else {
         if (findUser.password === password) {
            console.log(Date.now());
            const updatedUser = await User.findOneAndUpdate(
               { _id: findUser._id },
               {
                  token: createToken({
                     username: findUser.username,
                     id: findUser._id,
                     date: Date.now(),
                  }),
               }
            ).select("-__v -password");

            return res.send(
               await User.findById(updatedUser._id).select("-__v -password")
            );
         } else {
            return res.status(404).send({ message: "Wrong password" });
         }
      }
   } catch (error) {
      return res.status(500).send({ message: "Server error (login)" });
   }
};

export const register = async (req, res) => {
   const { error } = userValidate(req.body);
   if (error) {
      return res.send({ message: error.details[0].message });
   }

   const { username, password } = req.body;

   try {
      const users = await allUser();

      const find = users.find((user) => user.username === username);
      if (find === undefined) {
         User.create({
            username,
            password,
         });
         return res.send(users);
      } else {
         return res.status(409).send({ message: "User already exists" });
      }
   } catch (error) {
      return res.status(500).send({ message: "Server error (Register)" });
   }
};
