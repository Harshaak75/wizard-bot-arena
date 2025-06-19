
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from '../ui/Modal';
import MagicalButton from '../ui/MagicalButton';
import MagicCard from '../ui/MagicCard';
import { useWeb3 } from '../../hooks/useWeb3';

interface Bot {
  name: string;
  power: number;
  defense: number;
  spells: string[];
}

interface MintCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  winningBot: Bot & { spell: string };
}

type MintState = 'idle' | 'minting' | 'success' | 'error';

const MintCardModal: React.FC<MintCardModalProps> = ({ isOpen, onClose, winningBot }) => {
  const { isConnected, address, connectWallet } = useWeb3();
  const [mintState, setMintState] = useState<MintState>('idle');
  const [transactionHash, setTransactionHash] = useState<string>('');
  const [mintedCard, setMintedCard] = useState<any>(null);

  const generateRarity = (): 'Common' | 'Rare' | 'Epic' | 'Legendary' => {
    const rand = Math.random();
    if (rand < 0.5) return 'Common';
    if (rand < 0.75) return 'Rare';
    if (rand < 0.9) return 'Epic';
    return 'Legendary';
  };

  const handleMint = async () => {
    if (!isConnected) {
      await connectWallet();
      return;
    }

    setMintState('minting');

    try {
      // Simulate minting process
      await new Promise(resolve => setTimeout(resolve, 3000));

      const rarity = generateRarity();
      const metadata = {
        name: `WizardBet Card - ${winningBot.name}`,
        description: "A magical card earned by betting on a victorious bot.",
        image: "ipfs://QmPlaceholderHashForCardImage",
        attributes: [
          { trait_type: "Bot", value: winningBot.name },
          { trait_type: "Winning Spell", value: winningBot.spell },
          { trait_type: "Timestamp", value: Math.floor(Date.now() / 1000).toString() },
          { trait_type: "Rarity", value: rarity }
        ]
      };

      // Simulate transaction hash
      const mockTxHash = '0x' + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
      setTransactionHash(mockTxHash);

      const cardData = {
        name: metadata.name,
        image: '', // Placeholder for now
        rarity: rarity,
        etherscanUrl: `https://sepolia.etherscan.io/tx/${mockTxHash}`,
        ipfsUrl: `https://ipfs.io/ipfs/QmPlaceholderHashForMetadata`,
        bot: winningBot.name,
        spell: winningBot.spell
      };

      setMintedCard(cardData);
      setMintState('success');

      console.log('Card minted:', metadata);
    } catch (error) {
      console.error('Minting failed:', error);
      setMintState('error');
    }
  };

  const handleClose = () => {
    setMintState('idle');
    setTransactionHash('');
    setMintedCard(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Mint Your Victory Card">
      <div className="space-y-6">
        {mintState === 'idle' && (
          <div className="text-center space-y-4">
            <div className="text-6xl mb-4">🎴</div>
            <h3 className="font-cinzel font-bold text-xl text-white">
              Congratulations on your victory!
            </h3>
            <p className="text-gray-300">
              You backed <span className="text-yellow-400 font-bold">{winningBot.name}</span> who won with{' '}
              <span className="text-purple-400 italic">"{winningBot.spell}"</span>!
            </p>
            <p className="text-sm text-gray-400">
              Mint a commemorative NFT card to celebrate your successful bet.
            </p>
            
            {!isConnected ? (
              <MagicalButton onClick={connectWallet} size="lg">
                Connect Wallet First
              </MagicalButton>
            ) : (
              <MagicalButton onClick={handleMint} size="lg">
                Mint Magic Card
              </MagicalButton>
            )}
          </div>
        )}

        {mintState === 'minting' && (
          <div className="text-center space-y-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="text-6xl mb-4"
            >
              ✨
            </motion.div>
            <h3 className="font-cinzel font-bold text-xl text-white">
              Minting your card on Sepolia...
            </h3>
            <p className="text-gray-300">
              Please wait while we create your magical NFT card.
            </p>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-purple-500 to-yellow-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 3 }}
              />
            </div>
          </div>
        )}

        {mintState === 'success' && mintedCard && (
          <div className="text-center space-y-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="font-cinzel font-bold text-xl text-green-400 mb-4">
                Success! Card Minted!
              </h3>
            </motion.div>
            
            <div className="flex justify-center">
              <MagicCard cardData={mintedCard} />
            </div>
            
            <div className="space-y-2 text-sm">
              <p className="text-gray-300">Transaction Hash:</p>
              <a
                href={`https://sepolia.etherscan.io/tx/${transactionHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 break-all"
              >
                {transactionHash}
              </a>
            </div>
            
            <MagicalButton onClick={handleClose} variant="secondary">
              Close
            </MagicalButton>
          </div>
        )}

        {mintState === 'error' && (
          <div className="text-center space-y-4">
            <div className="text-6xl mb-4">❌</div>
            <h3 className="font-cinzel font-bold text-xl text-red-400">
              Minting Failed
            </h3>
            <p className="text-gray-300">
              Something went wrong while minting your card. Please try again.
            </p>
            <div className="flex space-x-3 justify-center">
              <MagicalButton onClick={handleMint}>
                Try Again
              </MagicalButton>
              <MagicalButton onClick={handleClose} variant="secondary">
                Close
              </MagicalButton>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default MintCardModal;
