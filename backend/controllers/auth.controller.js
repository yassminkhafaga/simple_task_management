//register , login
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//generate token
const signToken = (user)=>{
    return jwt.sign(
    {id:user.id, name: user.name},
    process.env.JWT_SECRET,
    { expiresIn: "1d"}
);
};

//register
exports.register = async(req, res)=>{
    try{
        const {name, email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password,12);
        const user = await User.create({name, email, password: hashedPassword});
        res.status(201).json({message:`User ${name} created successfully`,data:user});
    }catch(err){
        res.status(400).json({message:"something went wrong in register", error: err.message});
    }
    };


//login
exports.login = async(req, res)=>{
    try{
        const {email, password} = req.body;
        //check if user exists
        const myUser = await User.findOne({where:{email}});
        if(!myUser){
            return res.status(401).json({message:"user not found"});
        }
        //check password
        const isPasswordValid = await bcrypt.compare(password, myUser.password);
        if(!isPasswordValid){
            return res.status(401).json({message:"invalid password"});
        }
        //generate token
        const token = signToken(myUser);
        res.status(200).json({message:"login successful", token});
     
    }catch(err){
        res.status(400).json({message:"something went wrong in login"});

        }
    };
