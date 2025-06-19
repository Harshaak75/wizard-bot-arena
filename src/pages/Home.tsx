
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MagicalButton from '../components/ui/MagicalButton';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Floating magical elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-400/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              rotate: [0, 180, 360],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <div className="text-2xl">✨</div>
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-8 max-w-4xl">
          {/* Title */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h1 className="font-cinzel font-bold text-5xl md:text-7xl magical-text-gradient">
              WizardBet
            </h1>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-2xl md:text-3xl text-white font-cinzel"
            >
              The Magical Bot Duel
            </motion.div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg md:text-xl text-purple-200 font-lato max-w-2xl mx-auto leading-relaxed"
          >
            Enter the mystical realm where powerful magical bots clash in epic duels. 
            Place your bets, witness spectacular spell battles, and mint exclusive NFT cards 
            to commemorate your victories!
          </motion.p>

          {/* Features */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-purple-500/20">
              <div className="text-3xl mb-2">⚔️</div>
              <h3 className="font-cinzel font-bold text-yellow-400 mb-2">Epic Duels</h3>
              <p className="text-sm text-purple-200">Watch magical bots cast powerful spells in thrilling battles</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-purple-500/20">
              <div className="text-3xl mb-2">💰</div>
              <h3 className="font-cinzel font-bold text-yellow-400 mb-2">Smart Betting</h3>
              <p className="text-sm text-purple-200">Place strategic bets on your favorite magical warriors</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-purple-500/20">
              <div className="text-3xl mb-2">🎴</div>
              <h3 className="font-cinzel font-bold text-yellow-400 mb-2">NFT Cards</h3>
              <p className="text-sm text-purple-200">Mint exclusive commemorative cards for your victories</p>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <Link to="/game">
              <MagicalButton size="lg" className="text-xl px-12 py-4">
                🎮 Play Game
              </MagicalButton>
            </Link>
          </motion.div>

          {/* Magical orbs animation */}
          <motion.div
            className="absolute top-1/4 left-1/4"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3] 
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              delay: 1 
            }}
          >
            <div className="w-16 h-16 rounded-full bg-purple-500/20 blur-xl"></div>
          </motion.div>
          
          <motion.div
            className="absolute top-3/4 right-1/4"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.7, 0.3] 
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              delay: 2 
            }}
          >
            <div className="w-20 h-20 rounded-full bg-yellow-500/20 blur-xl"></div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
