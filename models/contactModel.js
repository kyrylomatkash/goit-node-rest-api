// Імпорт бібліотек
import { Schema, model } from "mongoose";
import { DBerror } from "../helpers/dberror.js";
// Схема контакту
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false }
);
// Додавання даних до бази даних
contactSchema.post("save", DBerror);
// Експорт
export const Contact = model("contacts", contactSchema);
