// Імпорт бібліотек
import { Schema, model } from "mongoose";
import { DBerror } from "../helpers/dberror.js";
// Схема користувача
const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false }
);
// Збереження даних за схемою у базі даних
userSchema.post("save", DBerror);
// Експорт
export const User = model("user", userSchema);