// Імпорт бібліотек
import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import contactsRoute from "./route/contactsRoute.js";
import authRoute from "./route/authRoute.js";
// Зміна застосунку
const app = express();
// Підключення до бази даних
const { DBConnect, DBPORT } = process.env;
mongoose.set("strictQuery", true);
mongoose
  .connect(DBConnect)
  .then(() => {
    console.log("Database connection successfully");
    app.listen(DBPORT, () => {
      console.log(`Server is running on port ${DBPORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
// Роути
app.use("/avatars", express.static("public/avatars"));
app.use("/api/contacts", contactsRoute);
app.use("/users", authRoute);
// Показ помилок статусу відповіді
app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});
