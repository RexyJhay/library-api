const express = require('express');
const mongoose = require('mongoose');
const app = express()
const cors = require('cors');
const port = process.env.PORT || 5124;

const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes')
const bookRoutes = require('./routes/bookRoutes')
const authorRoutes = require('./routes/authorRoutes')
const cookieParser = require('cookie-parser');
dotenv.config()

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true 
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser()); 

mongoose.connect(process.env.MONGODB_URI)
    .then(()=>console.log("mongodb connected successfully"))
    .catch((err)=>console.log('error connecting to database', err))


app.get('/',(req,res)=>{
    res.send("Hello Dear!")
})

app.get('/about',(req,res)=>{
    res.send("Chaii!")
})

app.use('/user', userRoutes)


app.use('/book', bookRoutes)
// userRoutes.bookRoutes

app.use('/author', authorRoutes)


app.listen(port, ()=>{
    console.log(`server is running on port : ${port}`)
})