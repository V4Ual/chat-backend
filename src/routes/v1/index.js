const routes = require("express").Router();
const roomRoutes = require("./room.routes");
const userRoute = require("./user.routes");
const chatRoute = require("./chat.routes");
const requestRoute = require("./request.routes");

routes.use("/users", userRoute);
routes.use("/chat", chatRoute);
routes.use("/room", roomRoutes);
routes.use("/request", requestRoute);

module.exports = routes;
