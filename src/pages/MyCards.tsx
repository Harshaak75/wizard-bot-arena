
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWeb3 } from '../hooks/useWeb3';
import MagicCard from '../components/ui/MagicCard';
import MagicalButton from '../components/ui/MagicalButton';

interface CardData {
  name: string;
  image: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  etherscanUrl?: string;
  ipfsUrl?: string;
  bot?: string;
  spell?: string;
}

const MyCards: React.FC = () => {
  const { isConnected, address, connectWallet } = useWeb3();
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock card data for demonstration
  const mockCards: CardData[] = [
    {
      name: "WizardBet Card - AlbusBot Victory",
      image: "",
      rarity: "Epic",
      etherscanUrl: "https://sepolia.etherscan.io/tx/0x123...",
      ipfsUrl: "https://ipfs.io/ipfs/QmExample1",
      bot: "AlbusBot",
      spell: "Phoenix Fire"
    },
    {
      name: "WizardBet Card - VoldBot Triumph",
      image: "",
      rarity: "Legendary",
      etherscanUrl: "https://sepolia.etherscan.io/tx/0x456...",
      ipfsUrl: "https://ipfs.io/ipfs/QmExample2",
      bot: "VoldBot",
      spell: "Avada Kedavra"
    },
    {
      name: "WizardBet Card - AlbusBot Win",
      image: "",
      rarity: "Rare",
      etherscanUrl: "https://sepolia.etherscan.io/tx/0x789...",
      ipfsUrl: "https://ipfs.io/ipfs/QmExample3",
      bot: "AlbusBot",
      spell: "Elder Wand Strike"
    }
  ];

  useEffect(() => {
    const fetchCards = async () => {
      if (!isConnected || !address) return;

      setLoading(true);
      setError(null);

      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // In a real implementation, this would call:
        // const tokenIds = await contract.getCardsByOwner(address);
        // Then fetch metadata for each tokenId
        
        // For now, we'll show mock data if connected
        setCards(mockCards);
        
        console.log('Fetched cards for address:', address);
      } catch (err) {
        console.error('Error fetching cards:', err);
        setError('Failed to load your cards. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [isConnected, address]);

  if (!isConnected) {
    return (
      <div className="min-h-screen pt-24 pb-8 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-8 max-w-md mx-auto px-4"
        >
          <div className="text-8xl mb-6">🔗</div>
          <h1 className="font-cinzel font-bold text-3xl magical-text-gradient">
            Connect Your Wallet
          </h1>
          <p className="text-purple-200 font-lato text-lg">
            Connect your wallet to view your magical NFT card collection
          </p>
          <MagicalButton onClick={connectWallet} size="lg">
            Connect Wallet
          </MagicalButton>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="font-cinzel font-bold text-4xl md:text-5xl magical-text-gradient mb-4">
            🎴 My Magic Cards 🎴
          </h1>
          <p className="text-purple-200 font-lato text-lg">
            Your collection of victorious moments immortalized as NFTs
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="text-6xl mb-4"
            >
              ✨
            </motion.div>
            <h2 className="font-cinzel font-bold text-2xl text-purple-300 mb-2">
              Loading Your Cards...
            </h2>
            <p className="text-purple-200">
              Fetching your magical collection from the blockchain
            </p>
          </motion.div>
        )}

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">❌</div>
            <h2 className="font-cinzel font-bold text-2xl text-red-400 mb-2">
              Error Loading Cards
            </h2>
            <p className="text-red-300 mb-4">{error}</p>
            <MagicalButton onClick={() => window.location.reload()}>
              Try Again
            </MagicalButton>
          </motion.div>
        )}

        {/* Cards Grid */}
        {!loading && !error && (
          <>
            {cards.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {cards.map((card, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <MagicCard cardData={card} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="text-8xl mb-6">🎴</div>
                <h2 className="font-cinzel font-bold text-3xl text-purple-300 mb-4">
                  No Cards Yet
                </h2>
                <p className="text-purple-200 font-lato text-lg mb-6 max-w-md mx-auto">
                  You haven't won any duels yet! Start playing to earn magical NFT cards.
                </p>
                <MagicalButton onClick={() => window.location.href = '/game'} size="lg">
                  🎮 Play Game
                </MagicalButton>
              </motion.div>
            )}
          </>
        )}

        {/* Collection Stats */}
        {cards.length > 0 && !loading && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 max-w-2xl mx-auto"
          >
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
              <h3 className="font-cinzel font-bold text-xl text-yellow-400 mb-4 text-center">
                Collection Stats
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-white">{cards.length}</div>
                  <div className="text-sm text-purple-300">Total Cards</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-300">
                    {cards.filter(c => c.rarity === 'Common').length}
                  </div>
                  <div className="text-sm text-gray-400">Common</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-300">
                    {cards.filter(c => c.rarity === 'Rare').length}
                  </div>
                  <div className="text-sm text-blue-400">Rare</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-300">
                    {cards.filter(c => c.rarity === 'Epic').length}
                  </div>
                  <div className="text-sm text-purple-400">Epic</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyCards;
