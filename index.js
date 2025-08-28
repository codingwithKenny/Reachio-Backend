const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const prisma = require('./src/prisma');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
const authRoute = require('./src/routes/auth');
const businessRoutes = require('./src/routes/business');

app.use("/api/auth", authRoute); // mount under /api/auth
app.use("/api/business", businessRoutes);


// Test route
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

// Example API route (fetch users)
// app.get("/users", async (req, res) => {
//   const users = await prisma.user.findMany();
//   res.json(users);
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
