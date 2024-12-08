const mongoose = require('mongoose')

const vehicleSchema = new mongoose.Schema({
  trackerId: { type: String, required: true, unique: true },
  carPlate: { type: String, required: true, unique: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  trackerName: { type: String, required: false },
})

module.exports = mongoose.model('Vehicle', vehicleSchema)
