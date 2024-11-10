import fetch from 'node-fetch';

const SUBGRAPH_ENDPOINT = "https://api.studio.thegraph.com/query/94122/usdc-transfer-tracker/version/latest";
const SPECIFIED_ADDRESS = "0xA0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
const POLLING_INTERVAL = 60000; // 1 minute in milliseconds

async function fetchTransfers() {
  const query = `{ 
    transfers(orderBy: timestamp, orderDirection: desc, where: { to: "${SPECIFIED_ADDRESS}" }) { 
      from 
      to 
      value 
      timestamp 
    } 
  }`;

  try {
    const response = await fetch(SUBGRAPH_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query })
    });

    const data = await response.json();

    if (!data || !data.data || !data.data.transfers) {
      console.error('No transfers found or invalid response:', data);
      return [];
    }

    return data.data.transfers;
  } catch (error) {
    console.error('Error fetching transfers:', error);
    return [];
  }
}

async function pollTransfers() {
  setInterval(async () => {
    const transfers = await fetchTransfers();
    console.log("Recent transfers:", transfers);

    // Call sendNotification() if new transfers are detected.
  }, POLLING_INTERVAL);
}

pollTransfers();
