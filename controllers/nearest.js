// backend/controllers/petrolPumpsController.js
const PetrolPump = require('../models/petrolPump');

exports.getNearestPumps = async (req, res) => {
  const { latitude, longitude } = req.body;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  try {
    const pumps = await PetrolPump.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          $maxDistance: 20000 // Distance in meters (5 km)
        }
      }
    })

    res.json(pumps);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch petrol pumps' });
  }
};