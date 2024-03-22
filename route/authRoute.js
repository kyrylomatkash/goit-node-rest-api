import express from "express";
import {
  registerSchema,
  loginSchema,
  subscriptionSchema,
} from "../schemas/userSchemas.js";
import validateBody from "../middlewares/validateBody.js";
import {
  getCurrentUser,
  login,
  logout,
  register,
  updateAvatar,
  updateSubscriptionStatus,
} from "../controllers/authControllers.js";
import { authToken } from "../middlewares/authToken.js";
import { upload } from "../middlewares/upload.js";

const authRoute = express.Router();

authRoute.post("/register", validateBody(registerSchema), register);
authRoute.post("/login", validateBody(loginSchema), login);
authRoute.post("/logout", authToken, logout);
authRoute.get("/current", authToken, getCurrentUser);
authRoute.patch(
  "/",
  authToken,
  validateBody(subscriptionSchema),
  updateSubscriptionStatus
);
authRoute.patch("/avatars", authToken, upload.single("avatar"), updateAvatar);

export default authRoute;
