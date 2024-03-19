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
import { authToken } from "../helpers/authToken.js";
// Роутинг для API
const contactsRoute = express.Router();

contactsRoute.get("/", authToken, getAllContacts);

contactsRoute.get("/:id", authToken, isValidObjId, getContact);

contactsRoute.delete("/:id", authToken, isValidObjId, deleteContact);

contactsRoute.post(
  "/",
  authToken,
  validateBody(createContactSchema),
  createContact
);

contactsRoute.put(
  "/:id",
  authToken,
  isValidObjId,
  validateBody(updateContactSchema),
  updateContact
);

contactsRoute.patch(
  "/:id/favorite",
  authToken,
  isValidObjId,
  validateBody(updateFavoriteSchema),
  updateContactStatus
);
// Експорт
export default contactsRoute;
