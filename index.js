const { read, write } = require("./utils");

const messages = read("messages");

const newData = [
    ...messages,
    {
        id: messages[messages.length - 1].id + 1,
        name: "No-name",
    },
];

write("messages", newData);