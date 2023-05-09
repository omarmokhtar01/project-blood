const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
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
    email: {
      type: String,
      uniqe: true,
      required: [true, "email is required"],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [6, "too short password"],
    },
    phone: {
      type: String,
      required: [true, "phone is required"],
    },
    nationalID: {
      type: String,
      required: [true, "nationalID is required"],
    },
    location: {
      type: String,
      required: [true, "location is required"],
    },
    birthDate: { type: Date, required: [true, "birthDate is required"] },
    bloodType: {
      type: String,
      required: [true, "bloodType is required"],
      enum: ["AB+", "AB-", "A+", "A-", "B+", "B-", "O+", "O-", "لا أعلم"],
    },
    role: {
      type: String,
      default: 'user'
    }
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("User", userSchema);
