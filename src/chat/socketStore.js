const userList = new Map();
let io = null;

module.exports = {
  setIO: (ioInstance) => {
    io = ioInstance;
  },
  getIO: () => io,
  userList,
};
