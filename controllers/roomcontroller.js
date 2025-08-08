const Room = require("../models/Room");
//const upload = require('../middleware/upload');
const { cloudinaryUploadImage,  cloudinaryRemoveImage } = require("../utils/cloudinary");
const fs = require("fs");

//Create a new room 
// exports.createRoom = async (req, res) => {
//   try {
//     const newRoom = new Room(req.body);
//     const savedRoom = await newRoom.save();
//     res.status(201).json(savedRoom);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

exports.createRoom = async (req, res) => {
  try {
    const { name, etage, description, price, capacity, amenities } = req.body;

    // Upload image if available
    let image = {};
    if (req.file) {
      const result = await cloudinaryUploadImage(req.file.path);

      image = {
        url: result.secure_url,
        publicId: result.public_id,
      };

      // Optional: delete local file after upload
      fs.unlinkSync(req.file.path);
    }

    // Create new room
    const newRoom = await Room.create({
      name,
      etage,
      description,
      price,
      capacity,
      amenities: amenities?.split(',') || [],
      image,
    });

    res.status(201).json({
      message: "Room created successfully",
      room: newRoom,
    });
  } catch (error) {
    console.error("Upload Room Error:", error.message);
    res.status(500).json({ error: "Failed to create room" });
  }
};

//Get all rooms
exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get single room by ID
exports.getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Update a room
exports.updateRoom = async (req, res) => {
  try {
    const roomId = req.params.id;
    const existingRoom = await Room.findById(roomId);
    if (!existingRoom) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // If a new image is uploaded
    if (req.file) {
      // Remove the old image from Cloudinary if it exists
      if (existingRoom.image?.publicId) {
        await cloudinaryRemoveImage(existingRoom.image.publicId);
      }

      // Upload the new image to Cloudinary
      const imagePath = req.file.path;
      const result = await cloudinaryUploadImage(imagePath);

      // Update image fields
      req.body.image = {
        url: result.secure_url,
        publicId: result.public_id,
      };
    }

    // Update room with new data
    const updatedRoom = await Room.findByIdAndUpdate(roomId, req.body, {
      new: true,
    });

    res.status(200).json({ message: 'Room updated successfully', room: updatedRoom });
  } catch (error) {
    console.error('Update Room Error:', error);
    res.status(500).json({ message: 'Failed to update room', error });
  }
};



//Delete a room
// exports.deleteRoom = async (req, res) => {
//   try {
//     const deletedRoom = await Room.findByIdAndDelete(req.params.id);
//     if (!deletedRoom) return res.status(404).json({ message: 'Room not found' });
//     res.status(200).json({ message: 'Room deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

exports.deleteRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Remove image from Cloudinary if it exists
    if (room.image?.publicId) {
      await cloudinaryRemoveImage(room.image.publicId);
    }

    // Delete room from database
    await room.deleteOne();

    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error) {
    console.error('Delete Room Error:', error);
    res.status(500).json({ message: 'Failed to delete room', error });
  }
};