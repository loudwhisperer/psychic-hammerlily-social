const { User, Thought } = require("../models");

const userController = {
  async getUsers(req, res) {
    try {
      const userData = await User.find();
      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
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
    try{
    const userData = await User.findOneAndUpdate(
      { _id: req.params.courseId },
      { $set: req.body },
      { runValidators: true, new: true }
    );
    !userData
      ? res.status(404).json({ message: "No User with that ID" })
      : res.json(userData);
  } catch(err){
    res.status(500).json(err);
  }
},
async deleteUser(req,res) {
    try{
        const userData = await User.findOneAndDelete({ _id: req.params.userId });
        const id = userData._id
        await Thought.deleteMany({username: id})
        await User.updateMany({friends: id}, {$pull: {friends: id}})
        !userData
          ? res.status(404).json({ message: "No User with that ID" })
          : res.json('User and associated thoughts and friend associations deleted')
    } catch(err){
        res.status(500).json(err);
    }
}
}
