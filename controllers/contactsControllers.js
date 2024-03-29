// Імпорт функцій
import HttpError from "../middlewares/HttpError.js";
import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContactFavoriteStatus,
  updateById,
} from "../services/contactsServices.js";
// Отримання листу усіх контактів
export const getAllContacts = async (req, res, next) => {
  try {
    const result = await listContacts();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
// Отримання контакту по ID
export const getContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getContactById(id);
    if (!result) {
      throw HttpError(404);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
// Видалення контакту
export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await removeContact(id);

    if (!result) {
      throw HttpError(404);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
// Створення контакту
export const createContact = async (req, res, next) => {
  try {
    const result = await addContact(req.body);
    if (!result) {
      throw HttpError(404);
    }
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
// Оновлення контакту
export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateById(id, req.body);
    if (!result) {
      throw HttpError(404);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
// Оновлення статусу контакту для додавання до вибраних
export const updateContactStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateContactFavoriteStatus(id, req.body);

    if (!result) {
      throw HttpError(404);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
