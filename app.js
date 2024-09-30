const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Function to recursively parse JSON and log key-value pairs
const parseData = (data, parentKey = '') => {
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      const fullKey = parentKey ? `${parentKey}.${key}` : key;

      // Check if the value is an object, if so recurse
      if (typeof data[key] === 'object' && data[key] !== null) {
        parseData(data[key], fullKey);
      } else {
        console.log(`${fullKey}: ${data[key]}`);
      }
    }
  }
};

// Webhook endpoint that receives JSON data
app.post('/webhook', (req, res) => {
  const receivedData = req.body;

  // Parse the received JSON data
  parseData(receivedData);

  // Respond to the webhook sender
  res.status(200).send('Data received and parsed.');
});

// Start the server
app.listen(port, () => {
  console.log(`Webhook server listening at http://localhost:${port}`);
});
