const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.authenticate = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    // Check if token is provided before verifying
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({message: 'no token provided'});
    }
    const token = authHeader.split(' ')[1];
    // Verify token
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const userId = decoded.id;
        // Sequelize uses findByPk(primary key)
         const myUser = await User.findByPk(userId);

         if(!myUser){
            return res.status(401).json({message: 'user not found'});
         }
         req.user = myUser;
         next();
    }catch(error){
        return res.status(401).json({message: 'invalid token'});

    }
};