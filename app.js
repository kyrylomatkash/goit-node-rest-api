import express from "express";
import morgan from "morgan";
import cors from "cors";

import contactsRoute from "./route/contactsRoute.js";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRoute);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found. Try again" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

app.listen(3000, () => {
  console.log("Server is running. Use port: 3000");
});
