const ContactsUtils = require('./contacts');
const { Command } = require('commander');
const program = new Command();

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const allContacts = await ContactsUtils.listContacts();
      console.table(allContacts);
      break;

    case 'get':
      const searchedContact = await ContactsUtils.getContactById(id);
      console.log(searchedContact);
      break;

    case 'add':
      const addedContact = await ContactsUtils.addContact(name, email, phone);
      console.log(addedContact);
      break;

    case 'remove':
      const removedContact = await ContactsUtils.removeContact(id);
      console.log(removedContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);



// ============================== TESTS =============================

async function listContactsTest() {
  const contacts = await ContactsUtils.listContacts();
  return console.log(contacts);
}
// listContactsTest();

async function getContactByIdTest() {
  const contact = await ContactsUtils.getContactById("drsAJ4SHPYqZeG-83QTVW");
  return console.log(contact);
}
// getContactByIdTest();

async function removeContactTest() {
  const contact = await ContactsUtils.removeContact("qdggE76Jtbfd9eWJHrssH");
  return console.log(contact);
}
// removeContactTest();

async function addContactTest() {
  const contact = await ContactsUtils.addContact("Test", "test@gmail.com", "123-123-12");
  return console.log(contact);
}
// addContactTest();