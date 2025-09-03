import jwt from 'jsonwebtoken';

export const middleMan = (req,res,next) => {
    const authHeaderReq = req.headers.authorization;

    if(!authHeaderReq || !authHeaderReq.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: "Invalid header request"
        })
    }

    try{
        const token = authHeaderReq.split(' ')[1];
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decode;
        next()
    }catch(error) {
        res.status(403).json({
            success: false,
            message: "Invalid token"
        })
    }
}