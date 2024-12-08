// backend/routes/vehicleRoutes.js
const express = require('express')
const Vehicle = require('../models/Vehicle')

const router = express.Router()

// Create vehicle
router.post('/', async (req, res) => {
  try {
    const { trackerId, carPlate, latitude, longitude, trackerName } = req.body

    // Check if the tracker ID already exists
    const existingVehicle = await Vehicle.findOne({ trackerId })
    if (existingVehicle) {
      return res.status(400).json({ message: 'Tracker ID already exists' })
    }

    // Check if the car plate is already assigned to another tracker
    const existingCarPlate = await Vehicle.findOne({ carPlate })
    if (existingCarPlate) {
      return res
        .status(400)
        .json({ message: 'Car plate is already assigned to another tracker' })
    }

    const vehicle = new Vehicle({
      trackerId,
      carPlate,
      latitude,
      longitude,
      trackerName: trackerName || '',
    })
    await vehicle.save()
    res.status(201).json(vehicle)
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error })
  }
})

// Get all vehicles
router.get('/', async (req, res) => {
  try {
    const vehicles = await Vehicle.find()
    res.json(vehicles)
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error })
  }
})

// Get a specific vehicle by ID
router.get('/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id)
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' })
    }
    res.json(vehicle)
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error })
  }
})

module.exports = router
