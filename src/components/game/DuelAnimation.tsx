
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Bot {
  name: string;
  power: number;
  defense: number;
  spells: string[];
}

interface DuelAnimationProps {
  bot1: Bot;
  bot2: Bot;
  onComplete: (winner: Bot) => void;
}

interface Turn {
  attacker: Bot;
  defender: Bot;
  spell: string;
  damage: number;
}

const DuelAnimation: React.FC<DuelAnimationProps> = ({ bot1, bot2, onComplete }) => {
  const [currentTurn, setCurrentTurn] = useState(0);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [winner, setWinner] = useState<Bot | null>(null);

  useEffect(() => {
    // Generate duel simulation
    const simulateDuel = () => {
      const duelTurns: Turn[] = [];
      let bot1Health = 100;
      let bot2Health = 100;
      
      for (let i = 0; i < 3; i++) {
        const attacker = i % 2 === 0 ? bot1 : bot2;
        const defender = i % 2 === 0 ? bot2 : bot1;
        const spell = attacker.spells[Math.floor(Math.random() * attacker.spells.length)];
        const damage = Math.floor(Math.random() * 30) + 10;
        
        duelTurns.push({ attacker, defender, spell, damage });
        
        if (i % 2 === 0) {
          bot2Health -= damage;
        } else {
          bot1Health -= damage;
        }
      }
      
      // Determine winner based on remaining health and some randomness
      const finalWinner = Math.random() > 0.5 ? bot1 : bot2;
      setWinner(finalWinner);
      setTurns(duelTurns);
    };

    simulateDuel();
  }, [bot1, bot2]);

  useEffect(() => {
    if (turns.length === 0) return;

    const timer = setTimeout(() => {
      if (currentTurn < turns.length) {
        setCurrentTurn(currentTurn + 1);
      } else if (!isComplete) {
        setIsComplete(true);
        setTimeout(() => {
          if (winner) {
            onComplete(winner);
          }
        }, 2000);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [currentTurn, turns.length, isComplete, winner, onComplete]);

  const currentTurnData = turns[currentTurn - 1];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
    >
      <div className="text-center space-y-8">
        {/* Title */}
        <motion.h2
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="font-cinzel font-bold text-4xl magical-text-gradient"
        >
          ⚡ MAGICAL DUEL ⚡
        </motion.h2>

        {/* Bot Battle Arena */}
        <div className="flex items-center justify-center space-x-16">
          {/* Bot 1 */}
          <motion.div
            animate={currentTurnData?.attacker.name === bot1.name ? { scale: [1, 1.1, 1], rotate: [0, -5, 0] } : {}}
            className="text-center"
          >
            <div className="text-6xl mb-2">🧙‍♂️</div>
            <div className="font-cinzel font-bold text-xl text-white">{bot1.name}</div>
          </motion.div>

          {/* VS */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-4xl"
          >
            ⚔️
          </motion.div>

          {/* Bot 2 */}
          <motion.div
            animate={currentTurnData?.attacker.name === bot2.name ? { scale: [1, 1.1, 1], rotate: [0, 5, 0] } : {}}
            className="text-center"
          >
            <div className="text-6xl mb-2">🐍</div>
            <div className="font-cinzel font-bold text-xl text-white">{bot2.name}</div>
          </motion.div>
        </div>

        {/* Turn Display */}
        <AnimatePresence mode="wait">
          {currentTurnData && !isComplete && (
            <motion.div
              key={currentTurn}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="space-y-4"
            >
              <div className="text-2xl font-lato font-bold text-purple-300">
                Turn {currentTurn}
              </div>
              <div className="text-xl text-white">
                <span className="text-yellow-400 font-bold">{currentTurnData.attacker.name}</span> casts{' '}
                <span className="text-purple-400 font-bold italic">"{currentTurnData.spell}"</span>!
              </div>
              
              {/* Spell Effect Animation */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0.7] }}
                className="text-6xl"
              >
                ✨💥✨
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Winner Display */}
        <AnimatePresence>
          {isComplete && winner && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="space-y-6"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: 3 }}
                className="text-8xl"
              >
                🏆
              </motion.div>
              <div className="space-y-2">
                <div className="font-cinzel font-bold text-3xl magical-text-gradient">
                  VICTORY!
                </div>
                <div className="text-xl text-white">
                  <span className="text-yellow-400 font-bold">{winner.name}</span> emerges triumphant!
                </div>
              </div>
              
              {/* Celebration Particles */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ 
                      x: Math.random() * window.innerWidth,
                      y: window.innerHeight,
                      opacity: 1 
                    }}
                    animate={{ 
                      y: -100,
                      opacity: 0 
                    }}
                    transition={{ 
                      duration: 3,
                      delay: Math.random() * 2,
                      repeat: Infinity 
                    }}
                    className="absolute text-2xl"
                  >
                    ✨
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default DuelAnimation;
