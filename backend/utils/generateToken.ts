import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";

const generateToken = (id: ObjectId) => {
    return jwt.sign(
        { id: id.toString() },
        process.env.JWT_SECRET,
        {
            expiresIn: '30d'
        });
}

export default generateToken;