const geolib = require('geolib'); // For calculating bearings

// Mock function to get current location (you can replace this with actual GPS data)
const getCurrentLocation = () => {
    return {
        latitude: 13.0105,  // NITK latitude
        longitude: 74.7922  // NITK longitude
    };
};

// Route to handle destination input and calculate the initial bearing
const calculateBearingController = (req, res) => {
    const { targetLatitude, targetLongitude } = req.body;

    if (!targetLatitude || !targetLongitude) {
        return res.status(400).json({ message: 'Target latitude and longitude are required.' });
    }

    const currentLocation = getCurrentLocation();
    const bearing = geolib.getGreatCircleBearing(
        currentLocation,
        { latitude: targetLatitude, longitude: targetLongitude }
    );

    return res.status(200).json({ bearing });
};

module.exports = { calculateBearingController };
