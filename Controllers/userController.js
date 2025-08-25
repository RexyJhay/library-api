const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const sendEmail = require('../sendEmail'); 
const dotenv = require('dotenv');
dotenv.config() 


const signup = async (req,res) => {
    let {firstname,lastname,email,password, role} = req.body
    let hashedPassword = await bcrypt.hash(password, 10)
    
    await User.create({
        firstname,
        lastname,
        email,
        password : hashedPassword,
        role
    })

    
    const welcomeMail = ` 
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color:rgb(23, 37, 228); padding: 20px; border-radius: 5px;">
        <h1><center>Welcome to Our Platform </center> <img scr="https://res.cloudinary.com/dh8dtvvy6/image/upload/v1752755027/Blog_pictures/vdktuipzojruyrasa9hw.jpg" width="70px"/></h1>
        <p>Hi ${firstname},</p>\n\n
        <p>Welcome to our platform! We're excited to have you on board.\n\n</p>
        <ol>
            <li>Explore our features and services.</li>
            <li>Stay updated with our latest news.</li>
            <li>Feel free</li>
        </ol>
        <p>Best regards,\n\n</p>
        <p>The Team</p>
        </p> contact us at:< href="mailto:${process.env.EMAIL_USER}
        
    <div>
    `;

    await sendEmail(email, "Welcome to Our Platform", welcomeMail);
    
    res.status(201).json({message:"sign up successful"})
}

const login = async (req,res)=>{
    try {
        let {email,password} = req.body;

        let checkEmail = await User.findOne({email})

        if(!checkEmail) return res.status(404).json({message:"user does not exists"});

        let checkPassword = await bcrypt.compare(password, checkEmail.password)

        if(!checkPassword) return res.status(400).json({message:"incorrect password"});

        let token = jwt.sign({id: checkEmail._id, role: checkEmail.role}, process.env.SECRETKEY, {expiresIn: '1h'});

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: 'lax',
            maxAge:  1 * 60 * 60 * 1000 // 1 hour
        });


        res.status(200).json({message:"login successful!", token})

    } catch (error) {
        res.status(500).json({message: "Internal server error"})
        console.log(error)
    }
}

const getAllUsers = async (req,res)=>{
    try {
        let myUsers = await User.find()

        if(!myUsers) return res.status(404).json({message:"No server found"});

        res.status(200).json(myUsers)
    } catch {
        res.status(500).json({message: "Internal server error"})
        console.log(error)
    }
}

const get1User = async (req,res)=>{
    try {
        let {id} = req.params;

        let a_user = await User.findById(id);

        if(!a_user) return res.status(404).json({message:"No server found"});

        res.status(200).json(a_user)

    } catch {
        res.status(500).json({message: "Internal server error"})
        console.log(error)
    }
}

const del1User = async (req,res)=>{
    try {
        let {id} = req.params;

        let a_user = await User.findByIdAndDelete(id);

        if(!a_user) return res.status(404).json({message:"No user found"});

        res.status(200).json({message: "User successfully deleted"})

    } catch {
        res.status(500).json({message: "Internal server error"})
        console.log(error)
    }
}

module.exports = {
    signup,
    getAllUsers,
    get1User,
    del1User,
    login
}