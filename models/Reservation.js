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
  camp: {
    type: mongoose.Schema.ObjectId,
    ref: "Camp",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  nights:{
    type:Number,
    min: [1],
    max: [3, 'You cant reserve for more than three nights'],
    required:true
  }
});

module.exports = mongoose.model("Reservation", ReservationSchema);
