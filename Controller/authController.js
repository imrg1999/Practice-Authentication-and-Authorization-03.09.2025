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

export const loginUser = async(req,res) => {
    try{
        const loginReq = await validationSchema.parseAsync(req.body);
        const registeredUser = await userModel.findOne(
            {email: loginReq.email});
        if(!registeredUser) 
            {
            return res.status(500).json({
            success: false,
            message: "Invalid Request"})
            }
        const validMember = await bcrypt.compare(loginReq.password, registeredUser.password);
        if(!validMember) {
          return res.status(401).json({
            success: false,
            message: "Invalid Password"})  
        }
        const token = jwt.sign({
            email: registeredUser.email,
            id: registeredUser._id
        }, process.env.JWT_SECRET,
    {expiresIn: "1h"} );
    if(token) {
        return res.status(200).json({
            success: true,
            message: "Login Successful",
            user: registeredUser._id,
            token: token
        })
    }
    } catch(error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const userProfile = async(req,res) => {
    try{
        const profileData = await userModel.find(req.user._id).select("-password");
        if(!profileData) {
            return res.status(404).json({
            success: false,
            message: "Profile Could not be found"
        })
        } else {
            res.status(200).json({
                success: true,
                data: {
                    _id: profileData._id,
                    name: profileData.name,
                    email: profileData.email,
                    contact: profileData.contact
                }
            })
        }
    } catch(error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
    
}