const express = require('express');
const { createBusiness, getUserBusinesses } = require('../controller/business.js');
const route = express.Router();

route.post("/", createBusiness);
route.get("/", getUserBusinesses);

module.exports = route;
