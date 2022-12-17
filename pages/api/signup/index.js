import dbConnect from "../../../lib/mongoose";
import bcrypt from "bcrypt";
import { errorHandler, validateAllOnce, responseHandler } from "utils/common";
import User from "@/models/User";

const saveUserToDB = async ({ name, email, password }) => {
  try {
    //hash the password
    const hashPassword = await bcrypt.hash(password, 8);
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      isCredentials: true,
    });
    return user;
  } catch (error) {
    return error;
  }
};

const checkIfUserExists = async (email) => {
  try {
    const user = await User.findOne({
      email,
    }).exec();
    if (user instanceof User) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return error;
  }
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    // return error
    errorHandler("Invalid Request Type", res);
  } else {
    const { name, email, password } = req.body;
    validateAllOnce(req.body);
    //create db connection
    await dbConnect();
    //check if user exists
    const ifUserExists = await checkIfUserExists(email);
    if (ifUserExists === true) {
      return responseHandler("User already exist", res, 201);
    } else {
      //save user to database
      const user = await saveUserToDB({ name, email, password });
      if (user instanceof User) {
        //exclude password field
        delete user.password;
        responseHandler(user, res, 201);
      }
    }
  }
}
