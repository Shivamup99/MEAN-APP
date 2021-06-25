const express = require("express")
const port = process.env.PORT||4000
const conn = require("./model/db")
conn();
const cors = require("cors")
const user = require("./routes/user")
const personal = require("./routes/personal")
const app = express()

app.use(express.json())
app.use(cors())
app.use("/",user)
app.use("/",personal)
app.use("/upload", express.static("./upload"));
app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})