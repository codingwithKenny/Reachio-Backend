const express = require('express');
const { createCustomer } = require('../controller/customer.js');
const route = express.Router();

route.post("/", createCustomer);