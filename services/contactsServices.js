// Імпорт моделі
import { Contact } from "../models/contactModel.js";
// Читання списку контактів
async function listContacts() {
  const data = await Contact.find();
  return data;
}
// Отримання контакту по ID
async function getContactById(id) {
  const result = await Contact.findById(id);
  return result;
}
// Оновлення контакту по ID
async function updateById(id, data) {
  const result = await Contact.findByIdAndUpdate(id, data, {
    new: true,
  });
  return result;
}
// Видалення контакту
async function removeContact(id) {
  const result = await Contact.findByIdAndDelete(id);
  return result;
}
// Додавання контакту
async function addContact(data) {
  const newContact = await Contact.create(data);
  return newContact;
}
// Оновлення статусу контакту
async function updateContactFavoriteStatus(id, data) {
  const { favorite } = data;
  const result = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  );
  return result;
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
