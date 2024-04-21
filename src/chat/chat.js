module.exports = function (io) {
    io.on('connection', (socket) => {
        socket.on('send:message', (data) => {
            console.log(data);
        })
    })
}