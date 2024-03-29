// Імпорт бібліотек
import Joi from "joi";
// Схема валідації полів контакту
export const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});
// Схема валідації полів контакту при оновлені
export const updateContactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "ua"] },
  }),
  phone: Joi.string().min(3).max(30),
})
  .min(1)
  .messages({ "object.min": "Body must have at least one field" });
// Схема для додавання контакту до вибраних
export const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
