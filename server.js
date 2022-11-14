const express = require('express')
const app = express();
const mongoose = require('mongoose')
const cors = require("cors");

mongoose.connect('mongodb://localhost/users', {useNewUrlParser:true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.on('open', () => console.log('Conectado ao banco'))

app.use(express.json())
app.use(cors());

const usersRouter = require('./routes/users')

app.get("/", (req, res) => {
    res.send("API posts");
  });

app.use('/users', usersRouter)


app.listen(3000, () => console.log('listening on 3000'))
