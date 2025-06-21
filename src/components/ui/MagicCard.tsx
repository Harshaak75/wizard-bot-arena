
import React from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink } from 'react-icons/fi';

interface CardData {
  name: string;
  image: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  etherscanUrl?: string;
  ipfsUrl?: string;
  bot?: string;
  spell?: string;
}

interface MagicCardProps {
  cardData: CardData;
}

const MagicCard: React.FC<MagicCardProps> = ({ cardData }) => {
  const { name, image, rarity, etherscanUrl, ipfsUrl, bot, spell } = cardData;
  
  const getRarityClasses = (rarity: string) => {
    switch (rarity) {
      case 'Common':
        return 'card-glow-common border-gray-400';
      case 'Rare':
        return 'card-glow-rare border-blue-400';
      case 'Epic':
        return 'card-glow-epic border-purple-400';
      case 'Legendary':
        return 'card-glow-legendary border-yellow-400';
      default:
        return 'card-glow-common border-gray-400';
    }
  };

  const getRarityTextColor = (rarity: string) => {
    switch (rarity) {
      case 'Common':
        return 'text-gray-300';
      case 'Rare':
        return 'text-blue-300';
      case 'Epic':
        return 'text-purple-300';
      case 'Legendary':
        return 'text-yellow-300';
      default:
        return 'text-gray-300';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={`relative bg-gray-900/80 backdrop-blur-sm rounded-xl border-2 ${getRarityClasses(rarity)} p-4 max-w-sm`}
    >
      {/* Card Image */}
      <div className="aspect-square mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-purple-900/50 to-blue-900/50">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-6xl opacity-50">🎴</div>
          </div>
        )}
      </div>

      {/* Card Info */}
      <div className="space-y-2">
        <h3 className="font-cinzel font-bold text-lg text-white truncate">{name}</h3>
        
        <div className="flex items-center justify-between">
          <span className={`font-lato font-medium ${getRarityTextColor(rarity)}`}>
            {rarity}
          </span>
          {bot && (
            <span className="text-sm text-purple-300">{bot}</span>
          )}
        </div>

        {spell && (
          <div className="text-sm text-yellow-300 italic">
            "{spell}"
          </div>
        )}

        {/* Links */}
        <div className="flex items-center space-x-4 pt-2 cursor-pointer">
          {etherscanUrl && (
            <a
              href={etherscanUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 text-sm transition-colors"
            >
              <FiExternalLink size={14} />
              <span>Etherscan</span>
            </a>
          )}
          {ipfsUrl && (
            <a
              href={ipfsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-green-400 hover:text-green-300 text-sm transition-colors cursor-pointer"
            >
              <FiExternalLink size={14} />
              <span>IPFS</span>
            </a>
          )}
        </div>
      </div>

      {/* Rarity glow effect */}
      {rarity === 'Legendary' && (
        <motion.div
          className="absolute inset-0 rounded-xl border-2 border-yellow-400/50"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
};

export default MagicCard;
