const mongoose = require('mongoose');


const roomSchema = new mongoose.Schema(
{
  name: { 
    type: String, 
    required: true 
    },
  etage: {
      type: Number, 
      required: true,
    },
  description: String,
  price: { 
    type: Number, 
    required: true },
  capacity: Number,
  image: {
    url: String,
    publicId: String,
    },
  amenities: [String], // ex: ['Wi-Fi', 'TV', 'Air Conditioning']
  status: { 
    type: String, 
    enum: ['available', 'booked', 'maintenance'], default: 'available' },
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);
