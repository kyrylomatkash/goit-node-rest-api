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
  if (!result) {
    console.log(`Contact with ID ${id} not found.`);
    return null;
  }
  return result;
}
// Оновлення контакту по ID
async function updateById(id, data) {
  const result = await Contact.findByIdAndUpdate(id, data, { new: true });
  if (!result) {
    console.log(`Contact with ID ${id} not found.`);
    return null;
  }
  console.log(`Contact with ID ${id} updated successfully.`);
  return result;
}
// Видалення контакту
async function removeContact(id) {
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    console.log(`Contact with ID ${id} not found.`);
    return null;
  }
  console.log(`Contact with ID ${id} deleted successfully.`);
  return result;
}
// Додавання контакту
async function addContact(data) {
  const existingContact = await Contact.findOne({ email: data.email });
  if (existingContact) {
    console.log(`Contact with email ${data.email} already exists.`);
    return null;
  } else {
    const newContact = await Contact.create(data);
    console.log(`Contact added successfully.`);
    return newContact;
  }
}

// Оновлення статусу контакту
async function updateContactFavoriteStatus(id, data) {
  const { favorite } = data;
  const result = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  );
  if (!result) {
    console.log(`Contact with ID ${id} not found.`);
    return null;
  }
  console.log(`Contact with ID ${id} favorite status updated to ${favorite}.`);
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
