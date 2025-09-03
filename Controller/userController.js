import userModel from "../Model/userModel.js";
import { validationSchema } from "../Validation/zodScheme.js";
import { ZodError } from "zod";
import { hashing } from "../Validation/passwordHashing.js";

export const showALLUsers = async(req,res) => {
    try{
        const allUsers = await userModel.find();

    if(allUsers.length === 0) {
       return res.status(200).json({
            success: true,
            message: "No users listed",
            users: []
        })
    }
    res.status(200).json({
        success: true,
        users: allUsers
    })
    } catch(error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
    
}

export const createNewUser = async(req,res) => {
    try{
        const validFormat = await validationSchema.parseAsync(req.body);

        const existingUser = await userModel.findOne({
            email: validFormat.email
        });

        if(existingUser) {
           return res.status(400).json({
                success: false,
                message: "User Already Exists",
                user: existingUser
            })
        }
        const safePassword = await hashing(validFormat.password);

        const newUser = await userModel.create({
            ...validFormat,
            password: safePassword
        });

        if(!newUser) {
           return res.status(500).json({
                success: false,
                message: "No new users created"
            })
        } else {
           return res.status(201).json({
                success: true,
                user: newUser
            })
        }
    }
    catch(error) {
        if (error instanceof ZodError) {
            res.status(400).json({
                success: false,
                error: error.issues,
                message: "Error Request"
            })
        } else {
            res.status(500).json({
                success: false,
                message: "Invalid Server Request"
            })
        }
    }
}