
const userList = new Map()
module.exports = function (io) {
    io.on('connection', (socket) => {
        // console.log(socket.id);
        socket.on('user::connect', (data) => {
            const { id } = data
            console.log(data);
            userList.set(id, socket.id)
        })

        socket.on('send::message', (data) => {
            const { message, receiveId, senderId } = data
            const socketId = userList.get(receiveId)
            console.log(data);
            console.log({ "receiver": socketId, "socketid::": socketId });
            socket.to(socketId).emit("send::message", data)
        })

        console.log(userList);

    })
}

