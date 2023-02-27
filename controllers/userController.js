const { User, Thought } = require("../models");

const userController = {
  //get all users
  async getUsers(req, res) {
    try {
      const userData = await User.find();
      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // get a single user 
  async getSingleUser(req, res) {
    try {
      const userData = await User.findOne({ _id: req.params.userId });
      !userData
        ? res.status(404).json({ message: "No User with that ID" })
        : res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      res.json(newUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateUser(req, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      !userData
        ? res.status(404).json({ message: "No User with that ID" })
        : res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteUser(req, res) {
    try {
      const userData = await User.findOneAndDelete({ _id: req.params.userId });
      const id = userData._id;
      await Thought.deleteMany({ username: id });
      await User.updateMany({ friends: id }, { $pull: { friends: id } });
      !userData
        ? res.status(404).json({ message: "No User with that ID" })
        : res.json(
            "User and associated thoughts and friend associations deleted"
          );
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async newFriend(req, res) {
    try {
      const friendData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $push: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      )
      !friendData
        ? res.status(404).json({ message: "Unable to add friend with this id" })
        : res.json(friendData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteFriend(req, res) {
    try {
      const friendData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      !friendData
        ? res.status(404).json({ message: "Unable to add friend with this id" })
        : res.json(friendData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = userController;