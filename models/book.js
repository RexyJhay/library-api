const mongoose = require('mongoose');
const Schema = mongoose.Schema


const bookSchema = new Schema({
    title:{
        type: String,
        require: true
    },
    isbn:{
        type: String,
        require: true
    },
    published_date:{
        type: Date,
        require: true
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    role:{
        type: String,
        enum:["admin","staff","user"],
        default:"user"
    }
},{timestamps:true})

const Book = mongoose.model('book',bookSchema)

module.exports = Book