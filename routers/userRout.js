const express = require("express");
const route = express.Router();
const {createUser,login,userList}= require("../controllers/userController")

route.route("/").post(createUser).get(userList);
route.route("/authenticate").post(login)


module.exports=route;