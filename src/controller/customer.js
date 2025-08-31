const prisma = require("../prisma");

// Create a new customer
const createCustomer = async (req, res) => {
  try {
    const { name, email, phoneNumber, birthday, businessId } = req.body;
    console.log("Received customer data:", req.body);

    if (!name || !phoneNumber || !businessId) {
      return res.status(400).json({ error: "Name, phone, and businessId are required" });
    }

    const customer = await prisma.customer.create({
      data: {
        name,
        email: email || null,
        phoneNumber,
        birthday: birthday ? new Date(birthday) : null,
        businessId: parseInt(businessId),
      },
    });

    res.status(201).json(customer);
  } catch (error) {
    console.error(error);

    // ✅ Handle Prisma unique constraint error
    if (error.code === "P2002") {
      const field = error.meta?.target[0] || "field"; // email or phone
      return res.status(400).json({ error: `${field} already exists` });
    }

    res.status(500).json({ error: "Failed to create customer" });
  }
};

// Get customer for the particular business
// Get customers for a particular business
const getCustomersByBusiness = async (req, res) => {
  try {
    const { businessId } = req.query;

    if (!businessId) {
      return res.status(400).json({ error: "businessId is required" });
    }

    const customers = await prisma.customer.findMany({
      where: { businessId: parseInt(businessId) },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch customers" });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phoneNumber, birthday, businessId } = req.body;
    console.log(req.body)

    const customer = await prisma.customer.update({
      where: { id: parseInt(id) },
      data: {
        name,
        email,
        phoneNumber,
        birthday: birthday ? new Date(birthday) : null,
        businessId: parseInt(businessId),
      },
    });

    res.status(200).json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update customer" });
  }
};

module.exports = { createCustomer, getCustomersByBusiness,updateCustomer };




