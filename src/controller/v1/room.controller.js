const db = require("../../config/database");
const { successResponses, badRequest } = require("../../responses/response");
let ObjectId = require("mongoose").Types.ObjectId;

class RoomController {
  constructor() { }

  createRoom = async (req, res) => {
    const { users } = req.body;

    // const users = [new ObjectId('6623420b87887a4725b61cf8'), new Object('6623432887887a4725b61d01')]

    const roomCreate = db.room.create({ users });
    if (roomCreate) {
      return successResponses(
        "Create Room Successfully",
        roomCreate
      );
    } else {
      return badRequest("Fail to Create");
    }
  };

  getUserList = async (req, res) => {
    const userID = req.headers.userData.id;

    const getUser = await db.room.aggregate([
      {
        $match: {
          users: {
            $elemMatch: { $eq: new ObjectId(userID) },
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
                  $and: [
                    { $in: ["$_id", "$$allUserIds"] },
                    { $ne: ["$_id", new ObjectId(userID)] },
                  ],
                },
              },
            },
            {
              $addFields: {
                profilePic: {
                  $function: {
                    body: 'function(profilePicFileName) { return "http://192.168.25.86:3001/public/"+ profilePicFileName }',
                    args: ["$profilePic"],
                    lang: "js",
                  },
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

    // const getUser = await db.users.findOne({ _id: new ObjectId(userID) })
    // console.log(getUser.profilePic);

    if (getUser) {
      return successResponses("Get User Match Successfully", getUser);
    } else {
      return badRequest("Fail to Create");
    }
  };
}

module.exports = RoomController;
