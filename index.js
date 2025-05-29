const express = require("express");
const cors = require("cors");
const app = express();
const task = require("./routers/tasks");
const userRoute = require("./routers/userRout")
const connectToDB=require("./db/connection");
const notFound = require("./middleware/notFound");
const notifier = require('./middleware/sendEmail');
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
app.get(`/run_corn1`,async(req,res)=>{
    try {
    // This is your cron logic (e.g., sending emails)
    await notifier(); // Replace with your actual function
    res.status(200).send("Notification task executed successfully");
  } catch (error) {
    console.error("Error in cron task:", error);
    res.status(500).send("Error in cron task");
  }

})
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