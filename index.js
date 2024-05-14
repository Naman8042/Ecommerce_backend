const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const cors = require("cors")
const PORT = 4000; 
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }))

const routes = require("./routes/Routes")

app.use("/api/v1", routes)

app.listen(PORT,()=>{
    console.log("server started")
})

const dbconnect = require("./config/Dbconnect")
dbconnect()
