// // Reverse a String

// function reverseString(str) {
//   return str.split("").reverse().join("");
// }

// console.log(reverseString("hello"));
// // olleh
const { createServer } = require("node:http");

const hostname = "127.0.0.1";
const port = 3000;

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
