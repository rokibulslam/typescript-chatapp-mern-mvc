import { UserInput } from './../model/userModel';
import { generateToken } from "../config/jwt";
import User from "../model/userModel";
import asyncHandler from 'express-async-handler'
import { Request, Response } from "express";

export const registerUser = asyncHandler(async (req:Request, res:Response) => {
    const { name, email, password, picture } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error;
    }
    const userExist = await User.findOne({ email })
    console.log(userExist);
    if (userExist) {
        throw new Error("User already exist")
    }
    // const user = await User.create({
    //     name, email, password, picture
    // })
  const user = await User.create(req.body as UserInput);
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            picture: user.picture,
            token:generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error("Failed to create user")
    }
})

export const authUser = asyncHandler(async (req:Request, res:Response) => {
  const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && await user.comparePassword(password)) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid Email or Password");
    }
});