const z = require("zod");

const UserZodSchema = z.object({
  firstName: z.string().min(1, {
    message: "First name is required",
  }),
  lastName: z.string().min(1, {
    message: "Last name is required",
  }),
  phoneNumber: z.string().min(11, {
    message: "Phone number must be at least 11 characters",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
  email: z
    .string()
    .email({ message: "Invalid Email Address" })
    .min(1, { message: "Email is required" })
    .transform((str) => str.toLowerCase()),
});

module.exports = { UserZodSchema };
