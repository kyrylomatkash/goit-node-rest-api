// Імпорт бібліотек
import Joi from "joi";

// Схема для реєстрації користувача
export const registerSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
    .required()
    .label("Enter your email")
    .messages({
      "string.email":
        "Please enter a valid email address,which is yours and you have access to",
      "any.required": "Email is required",
    }),
  password: Joi.string().min(6).required().label("Password").messages({
    "string.min": "Password must be at least 8 characters long",
    "any.required": "Password is required",
  }),
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .default("starter")
    .label("Subscription"),
});
// Схема для логіну користувача
export const loginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
    .required()
    .label("Email")
    .messages({
      "string.email":
        "Please enter a valid email address,which is yours and you have access to",
      "any.required": "Email is required",
    }),
  password: Joi.string().required().min(6).label("Password").messages({
    "string.min": "Password must be at least {#limit} characters long",
    "any.required": "Password is required",
  }),
});
// Схема субскрипції
export const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});
