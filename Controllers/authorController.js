const Author = require('../models/author');

const createAuthor = async (req,res) => {
    let {name,bio,birth_date} = req.body

    
    await Author.create({
        name,
        bio,
        birth_date,
        authorId: req.user.id
    })
    
    res.status(201).json({message:"author created successful"})
}

const getAllAuthor = async (req,res)=>{
    try {
        let myAuthor = await Author.find().populate({
            path: 'authorId',
            select:"firstname lastname"
        })

        if(!myAuthor) return res.status(404).json({message:"No server found"});

        res.status(200).json(myAuthor)
    } catch(error) {
        res.status(500).json({message: "Internal server error"})
        console.log(error)
    }
}

const get1Author = async (req,res)=>{
    try {
        let {id} = req.params;

        let a_author = await Author.findById(id);

        if(!a_author) return res.status(404).json({message:"No server found"});

        res.status(200).json(a_author)

    } catch(error) {
        res.status(500).json({message: "Internal server error"})
        console.log(error)
    }
}

const del1Author = async (req,res)=>{
    try {
        let {id} = req.params;

        let a_author = await Author.findByIdAndDelete(id);

        if(!a_author) return res.status(404).json({message:"No server found"});

        res.status(200).json({message: "Author successfully deleted"})

    } catch(error) {
        res.status(500).json({message: "Internal server error"})
        console.log(error)
    }
}

module.exports = {
    createAuthor,
    getAllAuthor,
    get1Author,
    del1Author
}