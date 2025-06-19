
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BotDisplay from '../components/game/BotDisplay';
import DuelAnimation from '../components/game/DuelAnimation';
import MintCardModal from '../components/game/MintCardModal';
import MagicalButton from '../components/ui/MagicalButton';

interface Bot {
  name: string;
  power: number;
  defense: number;
  spells: string[];
}

const bots: Bot[] = [
  {
    name: "AlbusBot",
    power: 95,
    defense: 88,
    spells: ["Phoenix Fire", "Elder Wand Strike", "Disarming Charm"]
  },
  {
    name: "VoldBot",
    power: 98,
    defense: 85,
    spells: ["Avada Kedavra", "Horcrux Shield", "Serpent Strike"]
  }
];

type GameState = 'betting' | 'dueling' | 'result';

const Game: React.FC = () => {
  const [selectedBot, setSelectedBot] = useState<Bot | null>(null);
  const [betAmount, setBetAmount] = useState<number>(0);
  const [gameState, setGameState] = useState<GameState>('betting');
  const [winner, setWinner] = useState<Bot | null>(null);
  const [userWon, setUserWon] = useState<boolean>(false);
  const [showMintModal, setShowMintModal] = useState<boolean>(false);
  const [winningSpell, setWinningSpell] = useState<string>('');

  const handleBotSelect = (bot: Bot) => {
    if (gameState === 'betting') {
      setSelectedBot(bot);
    }
  };

  const handleStartDuel = () => {
    if (selectedBot && betAmount > 0) {
      setGameState('dueling');
    }
  };

  const handleDuelComplete = (winningBot: Bot) => {
    setWinner(winningBot);
    setUserWon(selectedBot?.name === winningBot.name);
    setWinningSpell(winningBot.spells[Math.floor(Math.random() * winningBot.spells.length)]);
    setGameState('result');
  };

  const handleNewGame = () => {
    setSelectedBot(null);
    setBetAmount(0);
    setGameState('betting');
    setWinner(null);
    setUserWon(false);
    setShowMintModal(false);
    setWinningSpell('');
  };

  const handleMintCard = () => {
    setShowMintModal(true);
  };

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
            ⚔️ Magical Bot Arena ⚔️
          </h1>
          <p className="text-purple-200 font-lato text-lg">
            Choose your champion, place your bet, and witness the magical duel!
          </p>
        </motion.div>

        {gameState === 'betting' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {/* Bot Selection */}
            <div>
              <h2 className="font-cinzel font-bold text-2xl text-yellow-400 mb-6 text-center">
                Choose Your Champion
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {bots.map((bot) => (
                  <BotDisplay
                    key={bot.name}
                    bot={bot}
                    isSelected={selectedBot?.name === bot.name}
                    onSelect={() => handleBotSelect(bot)}
                  />
                ))}
              </div>
            </div>

            {/* Betting Controls */}
            <div className="max-w-md mx-auto bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
              <h3 className="font-cinzel font-bold text-xl text-yellow-400 mb-4 text-center">
                Place Your Bet
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-purple-300 font-lato mb-2">
                    Bet Amount (Simulated)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    value={betAmount || ''}
                    onChange={(e) => setBetAmount(Number(e.target.value))}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                    placeholder="Enter amount..."
                  />
                </div>

                {selectedBot && (
                  <div className="text-center p-3 bg-purple-900/30 rounded-lg border border-purple-500/20">
                    <span className="text-purple-200">Betting on: </span>
                    <span className="text-yellow-400 font-bold">{selectedBot.name}</span>
                  </div>
                )}

                <MagicalButton
                  onClick={handleStartDuel}
                  disabled={!selectedBot || betAmount <= 0}
                  size="lg"
                  className="w-full"
                >
                  🎯 Start Duel
                </MagicalButton>
              </div>
            </div>
          </motion.div>
        )}

        {gameState === 'result' && winner && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8"
          >
            {/* Result Display */}
            <div className="max-w-2xl mx-auto">
              {userWon ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.6 }}
                  className="space-y-6"
                >
                  <div className="text-8xl mb-4">🎉</div>
                  <h2 className="font-cinzel font-bold text-4xl text-green-400 mb-4">
                    YOU WON!
                  </h2>
                  <p className="text-xl text-white mb-2">
                    <span className="text-yellow-400 font-bold">{winner.name}</span> emerged victorious!
                  </p>
                  <p className="text-lg text-purple-300">
                    Your champion won with <span className="text-yellow-400 italic">"{winningSpell}"</span>
                  </p>
                  <p className="text-green-300 font-bold text-lg">
                    You won {betAmount * 1.8} tokens! 💰
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <MagicalButton onClick={handleMintCard} size="lg">
                      🎴 Mint Magic Card
                    </MagicalButton>
                    <MagicalButton onClick={handleNewGame} variant="secondary" size="lg">
                      🎮 New Game
                    </MagicalButton>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.6 }}
                  className="space-y-6"
                >
                  <div className="text-8xl mb-4">💀</div>
                  <h2 className="font-cinzel font-bold text-4xl text-red-400 mb-4">
                    YOU LOST
                  </h2>
                  <p className="text-xl text-white mb-2">
                    <span className="text-yellow-400 font-bold">{winner.name}</span> emerged victorious!
                  </p>
                  <p className="text-lg text-purple-300">
                    The winner cast <span className="text-yellow-400 italic">"{winningSpell}"</span>
                  </p>
                  <p className="text-red-300 font-bold text-lg">
                    You lost {betAmount} tokens 💸
                  </p>
                  
                  <MagicalButton onClick={handleNewGame} size="lg">
                    🎮 Try Again
                  </MagicalButton>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* Duel Animation Overlay */}
        <AnimatePresence>
          {gameState === 'dueling' && (
            <DuelAnimation
              bot1={bots[0]}
              bot2={bots[1]}
              onComplete={handleDuelComplete}
            />
          )}
        </AnimatePresence>

        {/* Mint Card Modal */}
        {winner && winningSpell && (
          <MintCardModal
            isOpen={showMintModal}
            onClose={() => setShowMintModal(false)}
            winningBot={{ ...winner, spell: winningSpell }}
          />
        )}
      </div>
    </div>
  );
};

export default Game;
