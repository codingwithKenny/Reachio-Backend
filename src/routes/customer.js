const express = require('express');
const { createCustomer, getCustomersByBusiness, updateCustomer } = require('../controller/customer.js');
const route = express.Router();

route.post("/", createCustomer);
route.get("/", getCustomersByBusiness); // ✅ Fetch by businessId
route.put("/:id", updateCustomer);



module.exports = route;
