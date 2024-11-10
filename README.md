Here’s a `README.md` file for your **USDC Transfer Tracker** project:

```markdown
# USDC Transfer Tracker

This project is designed to track USDC transfers to a specific Ethereum address on the Sepolia testnet using The Graph Protocol. It includes a backend subgraph that listens to `Transfer` events from the USDC contract and a frontend dashboard that displays recent transactions in real time. Additionally, a notification bot sends alerts for new transfers to the specified address.

---

## Features

- Subgraph: Tracks all incoming USDC transfers to a specific address using The Graph Protocol.
- Dashboard: Displays recent transfer transactions, including the sender, receiver, value, and timestamp.
- Notification Bot: Sends push notifications for new incoming transfers.
- Polling: Regularly checks for new transactions and updates the dashboard and notifications accordingly.

---

## Project Structure

- `subgraph.yaml`: Defines the subgraph, including data sources and event mappings.
- `src/mapping.ts`: Contains event handler code for the `Transfer` event.
- `pollTransfers.js`: Script for polling the subgraph and triggering notifications.
- `usdc-transfer-dashboard/`: React frontend application to display recent transfers.

---

## Setup Instructions

### Prerequisites

- Node.js and npm
- Yarn (optional, if using Yarn as package manager)
- A [The Graph Protocol](https://thegraph.com/) account and access token
- A Firebase account (for push notifications)

---

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd usdc-transfer-tracker
```

### Step 2: Install Dependencies

#### Backend Dependencies

```bash
cd usdc-transfer-tracker
yarn install  # or npm install
```

#### Frontend Dependencies

```bash
cd usdc-transfer-dashboard
yarn install  # or npm install
```

### Step 3: Configure the Subgraph

1. Open `subgraph.yaml` and ensure the following settings are correct:
   - `network`: Should be set to `sepolia` for tracking on the Sepolia testnet.
   - `address`: Use `0xA0b86991c6218b36c1d19d4a2e9eb0ce3606eb48` for the USDC contract address on Sepolia.
   - `name`: Update to `<your_github_username>/usdc-transfer-tracker`.

2. Modify the `src/mapping.ts` file to define the event handler for USDC transfers.

### Step 4: Deploy the Subgraph

1. Authenticate with The Graph:

   ```bash
   graph auth --product hosted-service <ACCESS_TOKEN>
   ```

2. Deploy the subgraph:

   ```bash
   graph deploy --product hosted-service <your_github_username>/usdc-transfer-tracker
   ```

After successful deployment, you’ll receive the Subgraph endpoint URL.

### Step 5: Set Up Polling Script

1. Open `pollTransfers.js`.
2. Replace `<YOUR_SUBGRAPH_ENDPOINT>` with your actual subgraph endpoint URL.
3. Replace `<SPECIFIED_ADDRESS>` with the Ethereum address to track.
4. Add Firebase credentials for push notifications (if using Firebase).

### Step 6: Run the Polling Script

```bash
node pollTransfers.js
```

This script will check for new transfers every minute and trigger notifications for new transactions.

### Step 7: Start the Frontend Dashboard

1. In a new terminal, navigate to the `usdc-transfer-dashboard` directory:

   ```bash
   cd usdc-transfer-dashboard
   ```

2. Start the React app:

   ```bash
   yarn start  # or npm start
   ```

The dashboard will be available at `http://localhost:3000`.

---

## Usage

1. **Dashboard**: Visit `http://localhost:3000` to view the recent USDC transfers.
2. **Notifications**: Receive push notifications whenever a transfer to the specified address occurs.

---

## Folder Structure

```plaintext
usdc-transfer-tracker/
├── subgraph.yaml         # Subgraph configuration file
├── schema.graphql        # GraphQL schema defining the Transfer entity
├── src/
│   └── mapping.ts        # Event handler for USDC Transfer events
├── pollTransfers.js      # Polling script for transfers and notifications
└── usdc-transfer-dashboard/  # React frontend for displaying transfers
```

---

## Troubleshooting

- **Subgraph Not Updating**: Ensure that the subgraph is correctly deployed and synced.
- **Notifications Not Sent**: Check Firebase configurations and ensure that device tokens are correctly set.
- **Frontend Errors**: Verify that the Subgraph endpoint URL is correctly configured in the frontend.

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

## Acknowledgments

- [The Graph Protocol](https://thegraph.com/) for subgraph infrastructure
- [Firebase](https://firebase.google.com/) for push notifications
- [Ethereum Sepolia Testnet](https://ethereum.org/en/developers/docs/networks/#sepolia-testnet) for testing

---

Enjoy tracking USDC transfers!
```

This `README.md` covers project setup, usage, structure, and troubleshooting. Replace placeholder values (e.g., `<repository-url>`, `<ACCESS_TOKEN>`, `<your_github_username>`) with actual values specific to your setup. Let me know if you’d like further details on any section!
