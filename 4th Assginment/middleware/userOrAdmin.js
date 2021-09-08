const User = require('../models/user.model.js');

const userOrAdmin = async (req,res,next)=>{
    try {
        
        const user = await User.findOne({
            _id : req.userId    
        })
        if(user.role !== 'admin'){
            return res.status(400).json({msg:"Admin access denied"})
        }
        next();
    } catch (err) {
        return res.status(500).json({msg:err.message})
    }
}

module.exports = userOrAdmin;