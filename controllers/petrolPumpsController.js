const geolib = require('geolib'); // For calculating bearings
const PetrolPump = require('../models/petrolPump');


exports.getNearestPumps = async (req, res) => {
  //  coordinates from query parameters
  const { currentLatitude, currentLongitude, targetLatitude, targetLongitude } = req.query;
  const radius = 15000; // Radius in meters (3 km)

  
  if (!currentLatitude || !currentLongitude || !targetLatitude || !targetLongitude) {
    return res.status(400).json({ error: 'Current and target latitudes and longitudes are required' });
  }

  // Parse coordinates as floats
  const currentLocation = {
    latitude: parseFloat(currentLatitude),
    longitude: parseFloat(currentLongitude)
  };
  const targetLocation = {
    latitude: parseFloat(targetLatitude),
    longitude: parseFloat(targetLongitude)
  };

  
  const targetBearing = geolib.getGreatCircleBearing(currentLocation, targetLocation);

  try {
    // Find petrol pumps within the specified radius
    const pumps = await PetrolPump.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [currentLocation.longitude, currentLocation.latitude]
          },
          $maxDistance: radius
        }
      }
    });

    
    const pumpsInDirection = pumps.filter(pump => {
      const pumpLocation = {
        latitude: pump.location.coordinates[1],
        longitude: pump.location.coordinates[0]
      };
      const pumpBearing = geolib.getGreatCircleBearing(currentLocation, pumpLocation);

      
      return Math.abs(pumpBearing - targetBearing) <= 150; // Adjust deviation as needed
    });

    res.json(pumpsInDirection);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch petrol pumps' });
  }
};




