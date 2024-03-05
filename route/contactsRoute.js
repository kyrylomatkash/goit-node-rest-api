// Імпорт бібліотек і функцій
import express from "express";
import {
  getAllContacts,
  getContact,
  deleteContact,
  createContact,
  updateContact,
  updateContactStatus,
} from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} from "../schemas/contactsSchemas.js";
import isValidObjId from "../helpers/IDvalidate.js";
// Роутинг для API
const contactsRoute = express.Router();

contactsRoute.get("/", getAllContacts);

contactsRoute.get("/:id", isValidObjId, getContact);

contactsRoute.delete("/:id", isValidObjId, deleteContact);

contactsRoute.post("/", validateBody(createContactSchema), createContact);

contactsRoute.put(
  "/:id",
  isValidObjId,
  validateBody(updateContactSchema),
  updateContact
);

contactsRoute.patch(
  "/:id/favorite",
  isValidObjId,
  validateBody(updateFavoriteSchema),
  updateContactStatus
);
// Експорт
export default contactsRoute;
