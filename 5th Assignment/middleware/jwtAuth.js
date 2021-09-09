const jwt = require('jsonwebtoken');

const jwtAuth = (req,res,next)=>{

    const token = req.headers["x-access-token"];
    
    if(!token){
        return res.status(400).json({msg:"Invalid Authentication!"})
    }
    try{
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
             if(err){
                 return res.status(400).json({msg:"Invalid Authentication"})
             }
        req.userId = decoded.id;
        next();
        })
    }catch(err){
         return res.status(500).json({msg:err.message})
    }
}       

module.exports = jwtAuth;









// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
// 	const { authorization } = req.headers;
// 	try {
// 		const token = authorization.replace("Bearer ", "");
// 		const decoded = jwt.verify(token, process.env.JWT_KEY);
// 		req.user = decoded;
// 		next();
// 	} catch (err) {
// 		return res.status(401).json({ message: "Authentication Failed, Try Again" });	
// 	}
// };