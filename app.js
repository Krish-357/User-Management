const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const dburl="mongodb://localhost:27017/mydb";
const userRouter = require("./routes/userrouter");
const app = express();
mongoose.connect(dburl).then(()=>{
    console.log("Connected to database");
    const port = process.env.PORT || 5000;
    app.listen(3000,()=>console.log("server is running on port 3000"));
}).catch(()=>console.log("something went wrong"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use("/api", userRouter); // Now routes will work under /api prefix


app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"views","home.html"));
}); 

app.get("/login",(req,res)=>{
    res.sendFile(path.join(__dirname,"views","login.html"));
}); 

app.get("/reg",(req,res)=>{
    res.sendFile(path.join(__dirname,"views","registration.html"));
}); 

app.get("/users",(req,res)=>{
    res.sendFile(path.join(__dirname,"views","userslist.html"));
}); 

app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "dashboard.html"));
});

