import fs from "node:fs/promises";
import path from "node:path";
import { randomBytes } from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contactsPath = path.join(__dirname, "../db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const AllContacts = await listContacts();
  const result = AllContacts.find((item) => item.id === contactId);
  return result || null;
}

async function updateById(contactId, data) {
  const AllContacts = await listContacts();
  const index = AllContacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    console.log("Contact with such ID is not found!");
    return null;
  }
  AllContacts[index] = { id: contactId, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(AllContacts, null, 2));
  console.log(`Contact with ID ${contactId} successfully updated!`);
  return AllContacts[index];
}

async function removeContact(contactId) {
  const AllContacts = await listContacts();
  const index = AllContacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    console.log("Contact with such ID is not found!");
    return null;
  }
  const [result] = AllContacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(AllContacts, null, 2));
  console.log(`Contact with ID ${contactId} successfully deleted!`);
  return result;
}

async function addContact(contactData) {
  const AllContacts = await listContacts();
  const existingContact = AllContacts.find(
    (item) => item.name === contactData.name
  );
  if (existingContact) {
    console.log(`Contact with name "${contactData.name}" already exists!`);
    return null;
  }
  const newContact = { id: generateId(), ...contactData };
  AllContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(AllContacts, null, 2));
  console.log(`Contact with name "${contactData.name}" successfully added!`);
  return newContact;
}

function generateId() {
  return randomBytes(16).toString("hex");
}

export { listContacts, getContactById, removeContact, addContact, updateById };
