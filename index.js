const http = require("http");
const url = require("url");
const queryString = require("querystring");
const { read, write } = require("./utils");
const { filter, last, defaultTo, eq } = require("lodash");

const hostname = "localhost";
const port = 3000;

const server = http.createServer((request, response) => {
  const parsedUrl = url.parse(request.url);
  const { id } = queryString.parse(parsedUrl.query);

  response.setHeader("Access-Control-Allow-Origin", "*");

  const messages = read("messages");

  switch (parsedUrl.pathname) {
    case "/add":
      const newData = [
        ...messages,
        {
          id: messages[messages.length - 1].id + 1,
          name: "No-name",
        },
      ];

      write("messages", newData);
      break;

    case "/delete":
    //   const newArray = [...messages];
    //   if (id) {
        
    //     // const elementIndex = newArray.findIndex(el => el.id === Number(id));

    //     // if (elementIndex !== -1) {
    //     //   newArray.splice(elementIndex, 1);
    //     // }
    //   } else {
    //     newArray.splice(newArray.length - 1, 1);
    //   }

      write(
        "messages",
        filter(
            messages,
            (message) => !eq(message.id, Number(defaultTo(id, last(messages).id)))
        )
    );
  }

  response.end(JSON.stringify(read("messages")));
});

server.listen(port, hostname, () => {
  console.log(`Server is listening ${hostname}:${port}`);
})