const { Schema, Types } = require("mongoose");
const dayjs = require("dayjs");

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: function () {
      return new Types.ObjectId();
    },
  },
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: function (date) {
      return dayjs(date).format("MMM DD YYYY H:m");
    },
  },
});

module.exports = reactionSchema