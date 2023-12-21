const fs = require('node:fs/promises');
const path = require('node:path');
const { randomUUID, randomBytes } = require('node:crypto'); // Added in: node v14.17.0

const contactsPath = path.join(__dirname, "db", "contacts.json");
const testPath = path.join(__dirname, "db", "test.json");

const testContact = {
  "id": "AeHIrLTr6JkxGE6SN-0Rw",
  "name": "Allen Raymond",
  "email": "nulla.ante@vestibul.co.uk",
  "phone": "(992) 914-3792"
};

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



// ============================== TESTS =============================

async function listContactsTest() {
  const contacts = await listContacts();
  return console.log(contacts);
}
// listContactsTest();

async function getContactByIdTest() {
  const contact = await getContactById("drsAJ4SHPYqZeG-83QTVW");
  return console.log(contact);
}
// getContactByIdTest();

async function removeContactTest() {
  const contact = await removeContact("qdggE76Jtbfd9eWJHrssH");
  return console.log(contact);
}
// removeContactTest();

async function addContactTest() {
  const contact = await addContact("Test", "test@gmail.com", "123-123-12");
  return console.log(contact);
}
// addContactTest();