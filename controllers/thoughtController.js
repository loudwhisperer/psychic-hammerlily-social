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
};