const express = require("express");
const route = express.Router();
const {getItemsList,
    getItem,
    createItem,
    updateItem,
    deleteItem} = require("../controllers/tasks")

// route.get("/",getItemsList)

route.route("/").get(getItemsList).post(createItem);
route.route("/:id").patch(updateItem).delete(deleteItem).get(getItem)

module.exports = route;