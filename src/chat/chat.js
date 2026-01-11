const socketStore = require("./socketStore");

module.exports = function (io) {
  socketStore.setIO(io);

  io.on("connection", (socket) => {
    socket.on("user::connect", ({ id }) => {
      socketStore.userList.set(id, socket.id);
      socket.emit("message", "connected");
    });

    socket.on("disconnect", () => {
      for (const [userId, socketId] of socketStore.userList.entries()) {
        if (socketId === socket.id) {
          socketStore.userList.delete(userId);
          break;
        }
      }
    });
  });
};
