
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useWeb3 } from '../../hooks/useWeb3';

const Header: React.FC = () => {
  const { isConnected, address, connectWallet, disconnectWallet } = useWeb3();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-purple-500/20"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-cinzel font-bold magical-text-gradient"
          >
            WizardBet
          </motion.div>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className={`font-lato font-medium transition-colors hover:text-yellow-400 ${
              isActive('/') ? 'text-yellow-400' : 'text-white'
            }`}
          >
            Home
          </Link>
          <Link
            to="/game"
            className={`font-lato font-medium transition-colors hover:text-yellow-400 ${
              isActive('/game') ? 'text-yellow-400' : 'text-white'
            }`}
          >
            Game
          </Link>
          <Link
            to="/my-cards"
            className={`font-lato font-medium transition-colors hover:text-yellow-400 ${
              isActive('/my-cards') ? 'text-yellow-400' : 'text-white'
            }`}
          >
            My Cards
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          {isConnected ? (
            <div className="flex items-center space-x-2">
              <div className="px-3 py-2 bg-purple-600/20 rounded-lg border border-purple-500/30">
                <span className="text-sm text-purple-200">
                  {address && truncateAddress(address)}
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={disconnectWallet}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors"
              >
                Disconnect
              </motion.button>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={connectWallet}
              className="px-6 py-2 magical-gradient hover:opacity-90 rounded-lg font-medium transition-opacity"
            >
              Connect Wallet
            </motion.button>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
