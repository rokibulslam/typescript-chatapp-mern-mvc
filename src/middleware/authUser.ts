import jwt from 'jsonwebtoken';
import User from '../model/userModel';
import asyncHandler from 'express-async-handler';
import { NextFunction, Request, Response } from 'express';

export const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];

            // Decode Token
            const decoded:any = jwt.verify(token, process.env.JWT_SECRET);
            res.locals.user = await User.findById(decoded.id).select("-password");
            next()
        } catch (error) {
            res.status(401);
            throw new Error("Not Authorized, token failed")
        }
    }
})