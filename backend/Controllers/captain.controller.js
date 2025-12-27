//Controller for captain
const captainModel = require('../models/captain.model');

const {validationResult}= require('express-validator');
const captainservice = require('../services/captain.service');


module.exports.registerCaptain = async(req,res,next)=>{
const errors = validationResult(req);
if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()});
    } 
    const {fullname,email,password,vehicle}= req.body;
    const isCaptainalreadyexist = await captainModel.findOne({email});
    if(isCaptainalreadyexist)
    {
        res.status(400).json({message:"Captain already exists"})
    }
    const hashedPassword = await captainModel.hashPassword(password);
    const captain = await captainservice.createcaptain({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashedPassword,
        color:vehicle.color,
        plate:vehicle.plate,
        capacity:vehicle.capacity,
        vehicletype:vehicle.vehicletype
    });
    const token = captain.generateAuthToken();
    res.status(201).json({token,captain});
}
module.exports.loginCaptain = async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        res.status(400).json({errors:errors.array()});
    }
    const {email,password} = req.body;
    const captain = await captainModel.findOne({email}).select('+password');
    if(!captain)
    {
        return res.status(401).json({message:'Invalid email or password'});
    }
    const isMatch = await captain.comparePassword(password);
    if(!isMatch)
    {
        return res.status(401).json({message:'Invalid email or password'});
    }
    const  token = captain.generateAuthToken();
    res.cookie('token',token);
res.status(200).json({token,captain});
}
module.exports.getCaptainprofile = async(req,res,next)=>{
    res.status(200).json({captain:req.captain});
}
module.exports.logoutCaptain = async(req,res,next)=>{
     const token = req.cookie?.token||req.headers.authorization?.split(" ")[1];
        if(token)
        {
         await blacklistTokenModel.create({token});
        }
                res.clearCookie('token');
        res.status(200).json({message:"Logged Out"});
    }
