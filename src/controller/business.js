const prisma = require("../prisma");

// Create business
const createBusiness = async (req, res) => {
  try {
    const { name, userId } = req.body;

    if (!name || !userId) {
      return res.status(400).json({ error: "Name and userId are required" });
    }

    // Check if the user already has a business with this name
    const existing = await prisma.business.findFirst({
      where: {
        name: name,
        userId: userId,
      },
    });

    if (existing) {
      return res.status(400).json({ error: "Business with this name already exists" });
    }

    // Create new business
    const business = await prisma.business.create({
      data: {
        name,
        userId,
      },
    });

    res.status(201).json(business);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create business" });
  }
};

// Get businesses for a specific user
const getUserBusinesses = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) return res.status(400).json({ error: "userId is required" });

    const businesses = await prisma.business.findMany({
      where: { userId: parseInt(userId) },
      include: {
        customers: true,
        templates: true,
        campaigns: true,
        messages: true,
      },
    });

    res.json(businesses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch businesses" });
  }
};

// controller/business.js





 const updateBusiness = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedBusiness = await prisma.business.update({
      where: { id: Number(id) }, // id must match DB type
      data: { name },
    });

    res.json(updatedBusiness);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteBusiness = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)

    await prisma.business.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Business deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





// Get All Businesses
// export const getBusinesses = async (req, res) => {
//   try {
//     const businesses = await prisma.business.findMany({
//       include: {
//         customers: true,
//         templates: true,
//         campaigns: true,
//         messages: true,
//       },
//     });

//     res.json(businesses);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to fetch businesses" });
//   }
// };

// Get Single Business
// export const getBusinessById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const business = await prisma.business.findUnique({
//       where: { id: Number(id) },
//       include: {
//         customers: true,
//         templates: true,
//         campaigns: true,
//         messages: true,
//       },
//     });

//     if (!business) {
//       return res.status(404).json({ error: "Business not found" });
//     }

//     res.json(business);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to fetch business" });
//   }
// };

// Update Business
// export const updateBusiness = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name } = req.body;

//     const updated = await prisma.business.update({
//       where: { id: Number(id) },
//       data: { name },
//     });

//     res.json(updated);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to update business" });
//   }
// };

// Delete Business
// export const deleteBusiness = async (req, res) => {
//   try {
//     const { id } = req.params;

//     await prisma.business.delete({
//       where: { id: Number(id) },
//     });

//     res.json({ message: "Business deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to delete business" });
//   }
// };


module.exports = {createBusiness, getUserBusinesses ,updateBusiness, deleteBusiness};
