const http = require("http");

const { read, write } = require("./utils");

// const messages = read("messages");

// const newData = [
//     ...messages,
//     {
//         id: messages[messages.length - 1].id + 1,
//         name: "No-name",
//     },
// ];

// write("messages", newData);

const hostname = "localhost";
const port = 3000;


const server = http.createServer((request, response) => {
    console.log(request);
    response.end(JSON.stringify(read("messages")));
});

server.listen(port, hostname);