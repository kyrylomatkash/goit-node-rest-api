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
// Схема даних контакту для збереження до бази даних
const contactDataSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Enter name for your contact. This field is required"],
    },
    email: {
      type: String,
      required: [true, "Enter email, which is yours and secured"],
      unique: true,
    },
    phone: {
      type: Number,
      required: [true, "Enter number for your contact. This field is required"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

export const favoriteContactUpdateSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

export const ContactData = model("contact", contactDataSchema);
