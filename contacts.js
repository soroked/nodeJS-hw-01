const fs = require('node:fs/promises');
const path = require('node:path');
const { randomBytes } = require('node:crypto'); // Added in: node v14.17.0

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function readContacts() {
  const contacts = await fs.readFile(contactsPath, { encoding: "utf-8" });
  
  return JSON.parse(contacts);
}

function writeContacts(contacts) {
  fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
}

async function listContacts() {
  const contacts = await readContacts();
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await readContacts();

  return contacts.find(contact => contact.id === contactId) ?? null;
}

async function removeContact(contactId) {
  const contacts = await readContacts();

  const removedContactIndex = contacts.findIndex(contact => contact.id === contactId);

  if (removedContactIndex === -1) return null;

  const newContacts = [
    ...contacts.slice(0, removedContactIndex),
    ...contacts.slice(removedContactIndex + 1)
  ];

  writeContacts(newContacts);

  return contacts[removedContactIndex];
}

async function addContact(name, email, phone) {
  const newContact = {
    name,
    email,
    phone,
    id: randomBytes(10).toString('hex'),
  }

  const contacts = await readContacts();
  contacts.unshift(newContact);
  writeContacts(contacts);

  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
}