import userModel from "../Model/userModel.js";
import {ZodError} from 'zod';
import bcrypt from 'bcrypt';
import { hashing } from "../Validation/passwordHashing.js";
import { validationSchema } from "../Validation/zodScheme.js";


export const registerUser = async(req,res) => {
    try{
        const validRegistration = await validationSchema.parseAsync(req.body);
        const alreadyExisting = await userModel.findOne({
            email: validRegistration.email
        });
        if(alreadyExisting) {
            return res.status(400).json({
            success: false,
            message: "User Already Exists"})
            }
        const hashedPassword = await hashing(validRegistration.password);
        const registerNewUser = await userModel.create({
            ...validRegistration,
            password: hashedPassword
        });
        if(!registerNewUser){
            return res.status(500).json({
            success: false,
            message: "User Already Exists"})
        } else {
            res.status(201).json({
            success: true,
            user: registerNewUser});
        }
    } catch(error) {
        if(error instanceof ZodError) {
            res.status(400).json({
            success: false,
            message: "Invalid Request",
            error: error.issues
        })
        } else {
            res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
        }
    }
}