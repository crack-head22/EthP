const axios = require('axios');
const SUBGRAPH_URL = 'https://api.studio.thegraph.com/query/94122/usdc-transfer-tracker/version/latest';

async function fetchTransfers() {
  const query = `
    {
      transfers(orderBy: timestamp, orderDirection: desc, where: { to: "0xA0b86991c6218b36c1d19d4a2e9eb0ce3606eb48" }) {
        id
        from
        to
        value
        timestamp
      }
    }
  `;
  try {
    const response = await axios.post(SUBGRAPH_URL, { query });
    return response.data.data.transfers;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

setInterval(async () => {
  const transfers = await fetchTransfers();
  console.log(transfers);
  // Push notification logic here
}, 60000);
