const { UserZodSchema } = require("../../utils/ZodSchema");
const bcrypt = require("bcrypt");
const prisma = require("../prisma");
const jwt = require("jsonwebtoken");

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

    // Check if email exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });
    if (existingUser)
      return res.status(409).json({ error: "Email already exists" });

    // Check if phone number exists
    const existingPhone = await prisma.user.findUnique({
      where: { phoneNumber: validatedData.phoneNumber },
    });
    if (existingPhone)
      return res.status(409).json({ error: "Phone number already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    validatedData.password = await bcrypt.hash(password, salt);

    // Save user in database
    const response = await prisma.user.create({ data: validatedData });

    // Exclude password from response
    const { password: _, ...userWithoutPassword } = response;

    res.status(201).json({
      message: `User ${firstName} ${lastName} created successfully ✅`,
      user: userWithoutPassword,
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
    // Check if the user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return res.status(401).json({ error: "Invalid email or password" });

    // Confirm password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ error: "Invalid email or password" });

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Exclude password from response
    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
      message: `Welcome back, ${user.firstName}`,
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Check auth
const handleCheckAuth = async (req, res) => {
  try {
    // req.user is set by verifyToken middleware
    const userId = req.user.id;

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({ message: "Authenticated ✅", user: userWithoutPassword });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { handleSignUp, handleLogin, handleCheckAuth };
