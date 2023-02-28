const { User, Thought } = require("../models");

const thoughtController = {
  async getThoughts(req, res) {
    try {
      const thoughtData = await Thought.find();
      res.json(thoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleThought(req, res) {
    try {
      const thoughtData = await Thought.findOne({ _id: req.params.thoughtId });
      !thoughtData
        ? res.status(404).json({ message: "No Thought with that ID" })
        : res.json(thoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async newThought({ body }, res) {
    try {
      const newThoughtData = await Thought.create(body);
      const addToUser = await User.findOneAndUpdate(
        { _id: body.username },
        { $push: { thoughts: newThoughtData._id } },
        { runValidators: true, new: true }
      );
      !newThoughtData
        ? res
            .status(404)
            .json({ message: "Unable to add thought to user with this id" })
        : res.json(addToUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateThought({ body, params }, res) {
    try {
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $set: body },
        { runValidators: true, new: true }
      );
      const addToUser = await User.findOneAndUpdate(
        { _id: thoughtData.username },
        { $push: { thoughts: thoughtData._id } },
        { runValidators: true, new: true }
      );
      !thoughtData
        ? res
            .status(404)
            .json({ message: "Unable to update thought to user with this id" })
        : res.json(thoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteThought({ params }, res) {
    try {
      const thoughtData = await Thought.findOneAndDelete({
        _id: params.thoughtId,
      });
      const userData = await User.findOneAndUpdate(
        { _id: thoughtData.username },
        { $pull: { thoughts: thoughtData._id } },
        { runValidators: true, new: true }
      );
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async newReaction({ body, params }, res) {
    try {
      const reactionData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: body } },
        { runValidators: true, new: true }
      );
      !reactionData
        ? res
            .status(404)
            .json({ message: "Unable to add reaction to thought with this id" })
        : res.json(reactionData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteReaction({ params }, res) {
    const reactionData = await Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: params.reactionId } },
      { runValidators: true, new: true }
    );
    !reactionData
      ? res.status(404).json({ message: "Unable to add friend with this id" })
      : res.json(reactionData);
  },
};

module.exports = thoughtController;
