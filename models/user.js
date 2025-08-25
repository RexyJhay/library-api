const mongoose = require('mongoose');
const Schema = mongoose.Schema


const userSchema = new Schema({
    firstname:{
        type: String,
        require: true
    },
    lastname:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    role:{
        type: String,
        enum:["admin","staff","user"],
        default:"user"
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Comment",
    }],
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"post"
    }
},{timestamps:true})

const User = mongoose.model('user',userSchema)

module.exports = User