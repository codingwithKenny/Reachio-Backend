const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a new customer
const createCustomer = async (req, res) => {
  try {
    const { name, email, phone, birthday, businessId } = req.body;

    if (!name || !phone || !businessId) {
      return res.status(400).json({ error: "Name, phone, and businessId are required" });
    }

    const customer = await prisma.customer.create({
      data: {
        name,
        email,
        phone,
        birthday: birthday ? new Date(birthday) : null,
        businessId: parseInt(businessId),
      },
    });

    res.status(201).json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create customer" });
  }
};

module.exports = {
  createCustomer,
};
