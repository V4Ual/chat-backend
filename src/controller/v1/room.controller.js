const db = require("../../config/database");
const { successResponses, badRequest } = require("../../responses/response");
let ObjectId = require("mongoose").Types.ObjectId;

class RoomController {
  constructor() {}

  createRoom = async (req, res) => {
    const { users } = req.body;

    // const users = [new ObjectId('6623420b87887a4725b61cf8'), new Object('6623432887887a4725b61d01')]

    const roomCreate = db.room.create({ users });
    if (roomCreate) {
      return successResponses("Create Room Successfully", roomCreate);
    } else {
      return badRequest("Fail to Create");
    }
  };

  getUserList = async (req, res) => {
    const { search } = req.query;
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
                $or: [
                  { name: { $regex: new RegExp(search, "i") } },
                  { email: { $regex: new RegExp(search, "i") } },
                ],
              },
            },
            {
              $addFields: {
                profilePic: {
                  $function: {
                    body: `function(profilePicFileName) { return "${process.env.LOCAL_IMAGE_URL}"+ profilePicFileName }`,
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

    const formateUser = getUser.map((item) => ({
      // user: { ...item.userDetails, image: item.userDetails.profilePic },
      user: item.userDetails,
      lastMessage: "test",
      lastMessageTime: "12:45 PM",
      unreadCount: null,
      messages: [],
      roomId: item._id,
    }));

    if (getUser) {
      return successResponses("Get User Match Successfully", formateUser);
    } else {
      return badRequest("Fail to Create");
    }
  };
}

module.exports = RoomController;
