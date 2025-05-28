const express = require("express");
const route = express.Router();
const {
    getItemtoUpdate,
    getItems,
    createItem,
    updateItem,
    deleteItem} = require("../controllers/tasks");
const authentication = require("../middleware/auth")

// route.get("/",getItemsList) 

route.route("/").post(authentication,createItem);
route.route("/loggeduser/:id").patch(authentication,updateItem).delete(authentication,deleteItem).get(authentication,getItems);
route.route("/updateItem/:id").get(authentication,getItemtoUpdate)

module.exports = route;