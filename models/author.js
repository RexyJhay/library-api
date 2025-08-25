const mongoose = require('mongoose');
const Schema = mongoose.Schema


const authorSchema = new Schema({
    name:{
        type: String,
        require: true
    },
    bio:{
        type: String,
        require: false
    },
    birthdate:{
        type: Date,
        require: false
    },
})

const Author = mongoose.model('author',authorSchema)

module.exports = Author