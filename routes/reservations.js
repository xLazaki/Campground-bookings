const express = require("express");

const {
  getReservations,
  getReservation,
  addReservation,
  updateReservation,
  deleteReservation,
} = require("../controllers/reservations");

const router = express.Router({ mergeParams: true });

const { protect ,authorize} = require("../middleware/auth");

router.route("/").get(protect, getReservations)
router.route("/:campId/reservation").post(protect,authorize('user','admin'),addReservation);
router
  .route("/:id")
  .get(protect,authorize('admin','user'),getReservation)
  .put(protect,authorize('admin','user'),updateReservation)
  .delete(protect,authorize('user','admin'),deleteReservation);

module.exports = router;
