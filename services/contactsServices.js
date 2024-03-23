// Імпорт моделі
import { Contact } from "../models/contactModel.js";
// Читання списку контактів
async function listContacts(userId) {
  const contactList = await Contact.find({ owner: userId });
  return contactList;
}
// Отримання контакту по ID
async function getContactById(id, userId) {
  const contactWithID = await Contact.findOne({ _id: id, owner: userId });
  return contactWithID;
}
// Оновлення контакту по ID
async function updateById(id, userId, data) {
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: id, owner: userId },
    data,
    { new: true }
  );
  return updatedContact;
}
// Видалення контакту
async function removeContact(id, userId) {
  const removedContact = await Contact.findOneAndDelete({
    _id: id,
    owner: userId,
  });
  return removedContact;
}
// Додавання контакту
async function addContact(data, userId) {
  const newContact = await Contact.create({ ...data, owner: userId });
  return newContact;
}
// Оновлення статусу контакту
async function updateContactFavoriteStatus(id, userId, data) {
  const { favorite } = data;
  const updatedFavoriteStatus = await Contact.findOneAndUpdate(
    { _id: id, owner: userId },
    { favorite },
    { new: true }
  );
  return updatedFavoriteStatus;
}
// Експорт функцій
export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateById,
  updateContactFavoriteStatus,
};
