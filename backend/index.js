const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: ['http://localhost:3000'], // client'daki port numarası
    methods: ['GET', 'POST']
  }
});
const PORT = 8000;
app.get("/", (req, res) => {
  res.send('<h1>Chat App With Node.js, Socket.Io and React JS');
});
io.on("connection", (socket) => {
  console.log("Bir kullanici baglandı!", 'id:', socket.id);
  socket.on("chat message", (msg) => {
    console.log(msg);
    io.emit('send message', msg);
    console.log('Cliente gonderildi');
  });
  socket.on("disconnect", () => {
    console.log("Bir kullanicinin baglantısı koptu");
  });
});
server.listen(PORT, () => {
  console.log("Server is running on:" + PORT);
});
