// Import necessary libraries
import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import cors from 'cors';  // Import CORS middleware

// Initialize Express app
const app = express();
const port = process.env.PORT || 7600;  // Use environment variable for port or default to 8000

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Use CORS middleware to handle cross-origin requests (especially for React frontend)
app.use(cors());

// Define a simple GET route for the root URL to confirm server is running
app.get('/', (_req, res) => {
  res.send('Server is running');
});

// Define a POST route to handle transfers by address
app.post('/get-transfers', async (req, res) => {
  const { address } = req.body;  // Extract address from the request body

  // Validate if address is provided in the request
  if (!address) {
    return res.status(400).json({ error: 'Address is required.' });  // Return error if address is missing
  }

  try {
    // Fetch transfer data from The Graph for the given address
    const transfers = await fetchTransfers(address);
    res.json({ message: `Transfers for address: ${address}`, transfers });  // Send transfer data as response
  } catch (error) {
    console.error('Error fetching transfers:', error.message);
    res.status(500).json({ error: 'Failed to fetch transfers' });  // Handle errors during the fetch operation
  }
});

// Function to fetch transfers from The Graph
const fetchTransfers = async (address) => {
  const subgraphUrl = 'https://api.studio.thegraph.com/query/94122/usdc-transfer-tracker/version/latest';  // The Graph API endpoint

  // Construct the GraphQL query to fetch transfers for the given address
  const query = `
    {
      transfers(where: { to: "${address}" }) {
        id
        from
        to
        value
        timestamp
      }
    }
  `;

  try {
    // Make a POST request to the GraphQL endpoint with the query
    const response = await axios.post(subgraphUrl, { query });
    if (response.data.data.transfers.length === 0) {
      throw new Error('No transfers found for this address.');
    }
    return response.data.data.transfers;  // Return the list of transfers from the response
  } catch (error) {
    console.error('Error fetching data from The Graph:', error.response ? error.response.data : error.message);
    throw new Error('Failed to fetch transfers');
  }
};

// Start the Express server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
