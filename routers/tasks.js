const express = require("express");
const route = express.Router();
const {
    getItemtoUpdate,
    getItems,
    createItem,
    updateItem,
    deleteItem} = require("../controllers/tasks")

// route.get("/",getItemsList) 

route.route("/").post(createItem);
route.route("/loggeduser/:id").patch(updateItem).delete(deleteItem).get(getItems);
route.route("/updateItem/:id").get(getItemtoUpdate)

module.exports = route;