const mongoose = require("mongoose");
const ReservationSchema = new mongoose.Schema({
  ArrivalDate: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  hospital: {
    type: mongoose.Schema.ObjectId,
    ref: "Camp",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  nigths:{
    type:Number,
    required:true
  }
});

module.exports = mongoose.model("Reservation", ReservationSchema);
