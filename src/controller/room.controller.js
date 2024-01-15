const db = require("../config/database");
const Responses = require("../responses/responses");
let ObjectId = require("mongoose").Types.ObjectId;
const responses = new Responses();

class RoomController {
  constructor() {}

  createRoom = async (req, res) => {
    const { users } = req.body;

    const roomCreate = db.room.create({ users });
    if (roomCreate) {
      return responses.successResponses(res, "Create Room Successfully", roomCreate, true);
    } else {
      return responses.failResponses(res, "Fail to Create");
    }
  };

  getUserList = async (req, res) => {
    const { usersId } = req.params;

    const getUser = await db.room.aggregate([
      {
        $match: {
          users: {
            $elemMatch: { $eq: new ObjectId(usersId) },
          },
        },
      },
      {
        $lookup: {
          from: "users",
          let: { allUserIds: "$users" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $in: ["$_id", "$$allUserIds"] }, { $ne: ["$_id", new ObjectId(usersId)] }],
                },
              },
            },
          ],
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails",
      },
    ]);

    if (getUser) {
      return responses.successResponses(res, "Get User Match Successfully", getUser, false);
    } else {
      return responses.failResponses(res, "Fail to Create");
    }
  };
}

module.exports = RoomController;
