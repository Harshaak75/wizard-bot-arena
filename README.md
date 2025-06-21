# Wizard Bot Arena

Wizard Bot Arena is a web-based dApp where users can participate in magical bot duels, place strategic bets, and mint exclusive NFT cards to commemorate their victories. The project leverages Ethereum smart contracts and integrates with MetaMask for wallet connectivity and NFT minting.

## Features

- **Connect Wallet:** Securely connect your Ethereum wallet using MetaMask. The app will prompt for permission when you click "Connect Wallet" and can be disconnected at any time.
- **Smart Betting:** Place bets on your favorite magical bots and witness duels in real time.
- **NFT Minting:** Mint unique NFT cards as proof of your victories. Each card is stored on-chain and can be viewed in your personal collection.
- **NFT Gallery:** View all the NFT cards you own, complete with rarity, spell, and bot details.
- **Seamless UX:** Smooth animations, loading states, and clear feedback for wallet and blockchain interactions.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MetaMask](https://metamask.io/) browser extension installed

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/wizard-bot-arena.git
   cd wizard-bot-arena
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Start the development server:**
   ```sh
   npm run dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173).

### Connecting Your Wallet

1. Open the app in your browser.
2. Click the **"Connect Wallet"** button.
3. MetaMask will prompt you to connect your wallet. Approve the connection.
4. Once connected, your wallet address will be used for all blockchain interactions.
5. You can disconnect your wallet at any time using the disconnect option.

### Minting NFT Cards

- After winning a duel, you’ll be prompted to mint a commemorative NFT card.
- Confirm the mint transaction in MetaMask.
- Once minted, your NFT card will appear in the **My Cards** section, complete with details and links to view on Etherscan and IPFS.

### Viewing Your NFT Collection

- Navigate to the **My Cards** page.
- All NFT cards owned by your connected wallet will be displayed.
- If you have no cards, you’ll be prompted to play and win duels to earn your first NFT.

## Project Structure

- **src/pages/Game.tsx**: Main game logic, betting, and duel flow.
- **src/pages/MyCards.tsx**: Fetches and displays your NFT card collection.
- **src/components/game/MintCardModal.tsx**: Handles NFT minting modal and logic.
- **src/contexts/Web3Context.tsx**: Manages wallet connection state and logic.
- **src/constants/contract.ts**: Contains contract ABI and address.

## Blockchain Details

- **Network:** Sepolia Testnet (default)
- **Smart Contract:** ERC-721 NFT contract for minting and managing cards

## Notes

- Make sure you have Sepolia ETH in your MetaMask wallet for test transactions.
- All NFT metadata is stored on IPFS and can be viewed via the provided links.

## **✨ Created By**

# **ALOGONOVA TEAM**

---

Happy dueling and minting!