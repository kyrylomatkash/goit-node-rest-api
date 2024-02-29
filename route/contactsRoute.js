// Імпорт бібліотек і функцій
import express from "express";
import {
  getAllContacts,
  getContact,
  deleteContact,
  createContact,
  updateContact,
} from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
// Роутинг для API
const contactsRoute = express.Router();

contactsRoute.get("/", getAllContacts);

contactsRoute.get("/:id", getContact);

contactsRoute.delete("/:id", deleteContact);

contactsRoute.post("/", validateBody(createContactSchema), createContact);

contactsRoute.put("/:id", validateBody(updateContactSchema), updateContact);
// Експорт
export default contactsRoute;
