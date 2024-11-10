import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_TRANSFERS } from './queries.js';  // Ensure this is correctly defined
import Push from 'push.js';  // Import Push.js
import { triggerNotification } from './push.js';  // Ensure this function exists in 'push.js'
import axios from 'axios';

const Dashboard = () => {
  const [address, setAddress] = useState(''); // State to store the address input
  const [transfers, setTransfers] = useState([]); // State to store fetched transfers
  const [loading, setLoading] = useState(false); // Loading state to show loading spinner
  const [error, setError] = useState(null); // State to store any error

  // Function to handle form submit and fetch transfers
  const fetchTransfers = async (address) => {
    try {
      setLoading(true); // Set loading to true when starting the request
      setError(null); // Reset any previous error
      const response = await axios.post('http://localhost:27000/get-transfers', { address });
      setTransfers(response.data.transfers); // Store fetched transfers in state
    } catch (err) {
      setError('Failed to fetch transfers.'); // Set error message if request fails
    } finally {
      setLoading(false); // Set loading to false after request is done
    }
  };

  // Handle address input change
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchTransfers(address); // Call function to fetch transfers with the provided address
  };

  return (
    <div>
      <h1>USDC Transfers Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Ethereum address"
          value={address}
          onChange={handleAddressChange}
        />
        <button type="submit" disabled={loading}>Get Transfers</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <ul>
        {transfers.length > 0 ? (
          transfers.map((transfer) => (
            <li key={transfer.id}>
              <strong>From:</strong> {transfer.from} <strong>To:</strong> {transfer.to} 
              <strong>Amount:</strong> {transfer.value} USDC
              <strong>Timestamp:</strong> {transfer.timestamp}
            </li>
          ))
        ) : (
          <p>No transfers found.</p>
        )}
      </ul>
    </div>
  );
};

export default Dashboard;
