const express = require('express');
const cors = require('cors');
const port = 9999;
const app = express()
const path = require('path')

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use(express.static(path.join(__dirname, "./public/")));

const connectDB = require('./config/db')
connectDB()

const router = require('./routes/userRoutes')
app.use('/api/blog', router)

const router1 = require('./routes/blogRoutes')
app.use('/api/blog', router1)


app.listen(port, (err) => {
    if (err) throw err
    console.log(`Work on ${port}`)
})