const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose')
require('./db/mongoose');
const userRouter = require('./routers/user');
const app = express();

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())
app.use('/users',userRouter)

app.listen(PORT, () => {
  console.log(`Server Listening on ${PORT}`)
});


if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))

    app.get('*', (req,res)=>{
        res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'))
    })
}
