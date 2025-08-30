const express = require('express');
const { createBusiness, getUserBusinesses, updateBusiness, deleteBusiness } = require('../controller/business.js');
const route = express.Router();

route.post("/", createBusiness);
route.get("/", getUserBusinesses);
route.put("/:id", updateBusiness);

// Delete business
route.delete("/:id", deleteBusiness);

module.exports = route;
