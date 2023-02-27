const router = require("express").Router;
const {
  getUsers,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser,
  newFriend,
  deleteFriend,
} = require("../../controllers/userController");

router.route("/").get(getUsers).post(createUser);

router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

router.route("/:userId/friends/:friendId").put(newFriend).put(deleteFriend);

module.exports = router;
