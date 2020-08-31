const { isObject } = require("util");

const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

io.on("connection", (socket) => {
  let userCount = socket.conn.server.clientsCount;

  socket.emit("connection", `${userCount} users in the chat room.`);
  socket.broadcast.emit("connection", `${userCount} users in the chat room.`);

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
