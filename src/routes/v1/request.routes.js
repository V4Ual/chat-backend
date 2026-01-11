const requestRoutes = require("express").Router();
const chatModule = require("../../controller");
const { authService } = require("../../services/auth.service");
const requestController = new chatModule.requestCtrl();

requestRoutes.post("/", authService, async (req, res) => {
  const result = await requestController.ceateRequest(req, res);
  res.status(result.statusCode).send(result);
});

requestRoutes.get("/", authService, async (req, res) => {
  const result = await requestController.requestList(req, res);
  res.status(result.statusCode).send(result);
});

requestRoutes.put("/accept/:requestId", authService, async (req, res) => {
  const result = await requestController.acceptRequest(req, res);
  res.status(result.statusCode).send(result);
});

requestRoutes.put("/decline/:requestId", authService, async (req, res) => {
  const result = await requestController.declineRequest(req, res);
  res.status(result.statusCode).send(result);
});

module.exports = requestRoutes;
