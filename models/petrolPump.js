const mongoose = require('mongoose');
const { Schema } = mongoose;

const petrolPumpSchema = new Schema({
  CustomerID: String,
  CustomerName: String,
  City: String,
  District: String,
  State: String,
  OMC: String,
  ClassOfMkt: String,
  FiscalYear: Number,
  Month: String,
  MSVol: Number,
  HSDVol: Number,
  location: {
    type: { type: String }, // 'Point' for GeoJSON
    coordinates: [Number] // [longitude, latitude]
  }
});

// Create a 2dsphere index for geospatial queries
petrolPumpSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('PetrolPump', petrolPumpSchema);


