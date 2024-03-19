// Імпорт бібліотек
import { schema, Model } from "mongoose";
import Joi from "joi";
import { DBerror } from "../helpers/dberror";
// Схема для реєстрації користувача
const registerSchema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", 'net,"ua'] }
      .required()
      .label("Enter email address")
      .messages({
        "string.email": "Please enter a valid email address",
        required: true,
      }),

    passrord: Joi.string()
      .min(8)
      .required()
      .label("Enter password at least 8 characters long ")
      .messages({
        "string.min": "Enter password at least 8 characters long",
        required: true,
      }),
    subscription: Joi.string()
      .valid("starter", "pro", "business")
      .default("starter")
      .label("Your subscription"),
  }),
});
// Схема для логіну користувача
const loginSchema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "ua"] }
      .requred()
      .label("Enter your email")
      .messages({
        "string.email":
          "Enter email address, you have access to and it is yours",
      }),
  }),
});
// Схема субскрипції
const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});
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
export const schemasUser = { registerSchema, loginSchema, subscriptionSchema };
export const User = model("user", userSchema);
