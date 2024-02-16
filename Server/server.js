const { Server } = require("socket.io");
const { createServer } = require("http");

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: "http://localhost:5173",
});

io.on("connection", (socket) => {
  console.log(socket);
});

io.listen(3000);
