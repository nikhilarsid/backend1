const fs = require('fs');
const csv = require('csv-parser');

const convertCsvToGeoJSON = (csvFilePath, outputFilePath) => {
  const results = [];

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (data) => {
      results.push({
        CustomerID: data.CustomerID,
        CustomerName: data['Customer Name'],
        City: data.City,
        District: data.District,
        State: data.State,
        OMC: data.OMC,
        ClassOfMkt: data['Class of Mkt'],
        FiscalYear: parseInt(data['Fiscal Year'], 10),
        Month: data.Month,
        MSVol: parseFloat(data['MS Vol']),
        HSDVol: parseFloat(data['HSD Vol']),
        location: {
          type: 'Point',
          coordinates: [parseFloat(data.Longitude), parseFloat(data.Latitude)]
        }
      });
    })
    .on('end', () => {
      fs.writeFileSync(outputFilePath, JSON.stringify(results, null, 2));
      console.log(`Conversion complete. Data saved to ${outputFilePath}`);
    });
};

// Run the conversion
convertCsvToGeoJSON('data.csv', 'output.json'); // Replace 'data.csv' with your CSV file path and 'output.json' with your desired output file path

