const router = require("express").Router();
const {
  getThoughts,
  newThought,
  getSingleThought,
  updateThought,
  deleteThought,
  newReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

router.route("/").get(getThoughts).post(newThought);

router.route("/:thoughtId").get(getSingleThought).put(updateThought).delete(deleteThought);

router.route("/:thoughtId/reactions").post(newReaction);

router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;