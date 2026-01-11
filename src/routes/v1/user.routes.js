let userRoute = require("express").Router();
// let userRoute = express.Router()
const userModule = require("../../controller");
const userValidator = require("../../validation/user.validatiaon");
const allValidator = require("../../middleware/validator");
const auth = require("../../services/auth.service");
const { authService } = require("../../services/auth.service");
const userController = new userModule.userCtr();
const multer = require("multer");

// Define file filter function
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

userRoute.post("/create", upload.single("avatar"), async (req, res) => {
  const result = await userController.createUser(req, res);
  res.status(result.statusCode).send(result);
});

userRoute.post("/login", async (req, res) => {
  const result = await userController.login(req, res);
  res.status(result.statusCode).send(result);
});

userRoute.get("/", async (req, res) => {
  const result = await userController.searchUser(req, res);
  res.status(result.statusCode).send(result);
});

userRoute.put(
  "/edit",
  authService,
  upload.single("avatar"),
  async (req, res) => {
    const result = await userController.updateUser(req, res);
    res.status(result.statusCode).send(result);
  }
);

userRoute.get("/get-profile", authService, async (req, res) => {
  const result = await userController.getProfile(req, res);
  res.status(result.statusCode).send(result);
});

userRoute.get("/list", authService, async (req, res) => {
  const result = await userController.userList(req, res);
  res.status(result.statusCode).send(result);
});

module.exports = userRoute;
