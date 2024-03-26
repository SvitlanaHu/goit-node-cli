import { program } from "commander";
import "colors";
import * as contacts from "./contacts.js";

program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            const contactsList = await contacts.listContacts();
            return console.log(contactsList);

        case "get":
            const getContact = await contacts.getContactById(id);
            return console.log(getContact);

        case "add":
            const addContact = await contacts.addContact(name, email, phone);
            return console.log(addContact);

        case "remove":
            const removeContact = await contacts.removeContact(id);
            return console.log(removeContact);

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(options);