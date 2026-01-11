const db = require("../../config/database");
const { successResponses, badRequest } = require("../../responses/response");
let ObjectId = require("mongoose").Types.ObjectId;

class RequestController {
  constructor() {}

  ceateRequest = async (req, res) => {
    const { userData } = req.headers;

    const { reciverId } = req.body;

    const isRequest = await db.request.findOne({
      senderId: userData.id,
      reciverId,
      status: "pending",
    });

    if (isRequest) {
      return badRequest("Already request send please wait for accept");
    }

    const request = await db.request.create({
      senderId: userData.id,
      reciverId,
    });

    return successResponses("Send request successfully", request);
  };

  requestList = async (req, res) => {
    const { userData } = req.headers;

    const requestList = await db.request.aggregate([
      {
        $match: {
          reciverId: new ObjectId(userData.id),
          status: "pending",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "senderId",
          foreignField: "_id",
          as: "recevice",
        },
      },
      {
        $unwind: "$recevice",
      },
    ]);

    const userList = requestList.map((item) => ({
      name: item.recevice.name,
      email: item.recevice.email,
      image: `${process.env.LOCAL_IMAGE_URL}${item.recevice.profilePic}`,
      requestId: item._id,
    }));

    return successResponses("Get Request list successfully", userList);
  };

  acceptRequest = async (req, res) => {
    const { userData } = req.headers;
    const { requestId } = req.params;

    const isExistRequest = await db.request.findOne({
      reciverId: userData.id,
      status: "pending",
    });

    if (!isExistRequest) {
      return badRequest("Request not found");
    }

    await db.request.updateOne(
      {
        _id: requestId,
      },
      {
        status: "accept",
      }
    );

    const users = [
      new ObjectId(isExistRequest.senderId),
      new ObjectId(isExistRequest.reciverId),
    ];
    await db.room.create({ users });
    return successResponses("Accpet request successfully");
  };
  declineRequest = async (req, res) => {
    const { userData } = req.headers;
    const { requestId } = req.params;

    const isExistRequest = await db.request.findOne({
      reciverId: userData.id,
      status: "pending",
    });

    if (!isExistRequest) {
      return badRequest("Request not found");
    }

    await db.request.updateOne(
      {
        _id: requestId,
      },
      {
        status: "decline",
      }
    );

    return successResponses("decline request successfully");
  };
}

module.exports = RequestController;
