import { generateToken } from "../config/jwt";
import User from "../model/userModel";


export const registerUser = async (req, res) => {
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
    const user = await User.create({
        name, email, password, picture
    })
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
    
}