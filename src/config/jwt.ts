import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

export const generateToken = (id:string):string => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn:"30d"})
}