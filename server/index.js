const express = require('express')
const app = express()
const port = 5000

const bodyParser = require("body-parser")
const config = require("./config/key")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const mongoose = require("mongoose")
mongoose.connect(config.mongoURI)
.then(() => {
    console.log("MongoDB connected...")
})
.catch(err => console.log(err))

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

app.use("/api/users", require("./routes/users"))
app.use("/api/board", require("./routes/board"))
app.use("/api/comment", require("./routes/comment"))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})