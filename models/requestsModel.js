const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    hospitalId: {
      type: mongoose.Schema.ObjectId,
      ref: "Hospital",
    },
    details: {
      type: String,
      default: 'No Details'
    },
    donate_status: {
      type: String,
      enum: ['تم قبول الطلب', 'تم رفض الطلب', 'قيد الانتظار'],
      default: 'قيد الانتظار'
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Request", requestSchema);
