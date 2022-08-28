const express = require("express");
require('dotenv').config();
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json({extended:false}))


app.post('/register', (req, res) => {
    const payload = {
        "username": req.body.username
    }
    const token = jwt.sign(payload, process.env.SECRET)

    res.send(token)
})

app.post('/secret',auth, (req, res) => {
    res.json({
        username: req.username,
        img:"https://i.pinimg.com/564x/78/a4/68/78a4688ee7138c6d9a278c15fab28663.jpg"
    })
})

const PORT = process.env.PORT || 8000

app.listen(PORT, ()=> console.log(`Server started at ${PORT}`))