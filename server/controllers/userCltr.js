const mongoose = require('mongoose')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const _ = require('lodash');
const jwt = require('jsonwebtoken')
const userCltr = {}
userCltr.register = async (req, res) => {
    const body = _.pick(req.body, ['name', 'email', 'password', 'mobileNumber'])
    try {
        const exitsedUser = await User.findOne({ email: body.email })
        if (exitsedUser) {
            return res.status(409).json({ message: "email already exists. please login" })
        }
        const userCount = await User.countDocuments({});
        if (userCount === 0) {
            body.role = 'admin';
        } else {
            body.role = 'user';
        }
        const user = new User(body)
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(body.password, salt)
        user.password = hashedPassword
        const userRecord = await user.save()
        res.status(200).json({ message: "user registered successfully", userId: user._id })

    }
    catch (e) {
        res.status(400).json({ message: "error registering user", error: e.message })
    }
}

userCltr.login = async (req, res) => {
    const { email, password } = req.body;  // Extract email and password from the request
    try {
        
        const existedUser = await User.findOne({ email });
        if (existedUser) {
            
            const comparePassword = await bcrypt.compare(password, existedUser.password);
            if (comparePassword) {
                
                const tokenData = { id: existedUser._id };
                const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '1h' });
                
                
                return res.status(200).json({
                    token: `Bearer ${token}`,
                    message: "Login Successful",
                    userid: existedUser._id
                });
            } else {
                
                return res.status(401).json({ message: 'Invalid email or password' });
            }
        } else {
            
            return res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (e) {
        
        return res.status(500).json({ message: 'Error logging in', error: e.message });
    }
};
userCltr.getAllUsers=async(req,res)=>{
    try{
        const users=await User.find()
        res.status(200).json(users)

    }catch(e){
        res.status(400).json({ message: "error getting users", error: e.message })
    }
}
userCltr.updateUser=async(req,res)=>{
    const body=req.body
    const token=req.headers.authorization.split(' ')[1]
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        const userId=decoded.id

        const user=await User.findByIdAndUpdate(userId,body,{new:true})
        const updatedUser=await user.save()
        if(updatedUser){
        res.status(200).json({message:"user details updated successfully ",updatedUser})
        }else {
            res.status(404).json({ message: "User not found" });
        }

    }catch(e){
        res.status(400).json({ message: "error updating user", error: e.message })
    }
}
userCltr.userDelete = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]; // Extract token from Authorization header
    try {
        // Verify the token and extract the user ID
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        // Find and delete the user
        const user = await User.findByIdAndDelete(userId);

        if (user) {
            res.status(200).json({ message: "User deleted successfully" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (e) {
        res.status(400).json({ message: "Error deleting user", error: e.message });
    }
}
module.exports = userCltr