const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom
} = require("../controllers/roomcontroller");


// /api/rooms
router.post("/", upload.single("image"), createRoom);
router.get('/', getAllRooms);
router.get('/:id', getRoomById);
router.put('/:id',upload.single('image'), updateRoom);
router.delete('/:id', deleteRoom);


module.exports = router;
