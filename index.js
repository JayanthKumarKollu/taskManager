const express = require("express");
const cors = require("cors");
const app = express();
const task = require("./routers/tasks");
const userRoute = require("./routers/userRout")
const connectToDB=require("./db/connection");
const notFound = require("./middleware/notFound");
app.use(cors());
app.use(express.json());
// Jayanth@12345
// mongodb+srv://jayanthjai8464:Jayanth@12345@taskmanager.shjgyzn.mongodb.net/?retryWrites=true&w=majority&appName=TaskManager
require("dotenv").config();
app.use(
    cors({
      origin: process.env.FRONTEND_URL, // Replace with your Angular app URL
      methods: "GET,POST,PUT,DELETE",
      allowedHeaders: "Content-Type,Authorization",
    })
  );
// app.get("/hello",(req,res)=>{
//     res.send("Welcome to task manager..")
// });

app.use("/api/tasks",task);
app.use("/api/login",userRoute);
app.use(notFound) //this is specifically to display custom error message when we didn't found any routes.


const port = process.env.PORT ||3000;

//  app.listen(port, console.log(`Server is running on ${port}...`));
// TO RUN DB FIRST AND THEN APPLICATION COMMENTED THE ABOVE ONE AND IMPLEMENTED BELOW ONE.
const start = async ()=>{
try {
    await connectToDB(process.env.DATABASE_URL);
    app.listen(port, console.log(`Server is running on ${port}...`));
} catch (error) {
 console.log(error)   
}

}

start()