const { UserZodSchema } = require("../../utils/ZodSchema");
const bcrypt = require("bcrypt");
const prisma = require("../prisma"); // your prisma client

const handleSignUp = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;

  try {
    // Validate input
    const validatedData = UserZodSchema.parse({
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
    });

    // check if Email exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });
    if (existingUser) {
      return res.status(409).json({ error: "Email already exists" });
    }

    // check if phoneNumber exists
    const existingPhone = await prisma.user.findUnique({
      where: { phoneNumber : validatedData.phoneNumber},
    });
    if (existingPhone) {
      return res.status(409).json({ error: "Phone number already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    validatedData.password = await bcrypt.hash(password, salt);

    // Save user in database
    const response = await prisma.user.create({
      data: validatedData,
    });

    res.status(201).json({
      message: `User ${firstName} ${lastName} created successfully ✅`,
      user: response,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Error creating user",
      details: error.errors || error.message,
    });
  }
};

const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // CHECK IF THE USER EXIST
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: "Invalid email or password" });
    //  CONFIRM PASSWORD
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid email or password" });

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET, // make sure to set this in your .env
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: `Welcome back, ${user.firstName}`,
      user,
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { handleSignUp, handleLogin };
