const db = require("../../config/database");
const { successResponses, failResponses } = require("../../responses/response");
let ObjectId = require("mongoose").Types.ObjectId;

class RoomController {
  constructor() { }

  createRoom = async (req, res) => {
    const { users } = req.body;

    const roomCreate = db.room.create({ users });
    if (roomCreate) {
      return successResponses(res, "Create Room Successfully", roomCreate, true);
    } else {
      return failResponses(res, "Fail to Create");
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
      return successResponses("Get User Match Successfully", getUser);
    } else {
      return failResponses("Fail to Create");
    }
  };
}

module.exports = RoomController;
