const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    location: {
      type: String,
      required: [true, "location is required"],
    },
    phone: {
      type: String,
      required: [true, "phone is required"],
    },
    from: {
      type: String,
      required: [true, "from is required"],
    },
    to: {
      type: String,
      required: [true, "to is required"],
    },
    round_num: {
      type: Number,
      required: [true, "round_num is required"],
    },
    room_num: {
      type: Number,
      required: [true, "room_num is required"],
    },
    bloodGroup: {
      type: [String],
      required: [true, "bloodGroup is required"]
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Hospital", hospitalSchema);
