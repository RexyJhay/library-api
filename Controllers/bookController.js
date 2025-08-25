const Book = require('../models/book');

const createBook = async (req,res) => {
    let {title,isbn,published_date} = req.body

    
    await Book.create({
        title,
        isbn,
        published_date, 
        authorId: req.user.id
    })
    
    res.status(201).json({message:"Book created successful"})
}

const getAllBook = async (req,res)=>{
    try {
        let myBook = await Book.find().populate({
            path: 'authorId',
            // select:"firstname lastname"
        })

        if(!myBook) return res.status(404).json({message:"No server found"});

        res.status(200).json(myBook)
    } catch(error) {
        res.status(500).json({message: "Internal server error"})
        console.log(error)
    }
}

const get1Book = async (req,res)=>{
    try {
        let {id} = req.params;

        let a_book = await Book.findById(id);

        if(!a_book) return res.status(404).json({message:"No server found"});

        res.status(200).json(a_post)

    } catch(error) {
        res.status(500).json({message: "Internal server error"})
        console.log(error)
    }
}

const del1Book = async (req,res)=>{
    try {
        let {id} = req.params;

        let a_book = await Book.findByIdAndDelete(id);

        if(!a_book) return res.status(404).json({message:"No server found"});

        res.status(200).json({message: "Book successfully deleted"})

    } catch(error) {
        res.status(500).json({message: "Internal server error"})
        console.log(error)
    }
}

module.exports = {
    createBook,
    getAllBook,
    get1Book,
    del1Book
}