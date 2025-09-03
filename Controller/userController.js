import userModel from "../Model/userModel.js";

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