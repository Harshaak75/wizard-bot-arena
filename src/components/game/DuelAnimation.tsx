import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Bot {
  name: string;
  power: number;
  defense: number;
  staticImg: string;
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

const DuelAnimation: React.FC<DuelAnimationProps> = ({
  bot1,
  bot2,
  onComplete,
}) => {
  const [currentTurn, setCurrentTurn] = useState(0);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [winner, setWinner] = useState<Bot | null>(null);
  const [bot1Health, setBot1Health] = useState(100);
  const [bot2Health, setBot2Health] = useState(100);
  const [showSpellEffect, setShowSpellEffect] = useState(false);
  const [currentSpellEffect, setCurrentSpellEffect] = useState("");

  useEffect(() => {
    // Generate duel simulation
    const simulateDuel = () => {
      const duelTurns: Turn[] = [];
      let currentBot1Health = 100;
      let currentBot2Health = 100;

      for (let i = 0; i < 4; i++) {
        const attacker = i % 2 === 0 ? bot1 : bot2;
        const defender = i % 2 === 0 ? bot2 : bot1;
        const spell =
          attacker.spells[Math.floor(Math.random() * attacker.spells.length)];
        const damage = Math.floor(Math.random() * 25) + 15;

        duelTurns.push({ attacker, defender, spell, damage });

        if (i % 2 === 0) {
          currentBot2Health = Math.max(0, currentBot2Health - damage);
        } else {
          currentBot1Health = Math.max(0, currentBot1Health - damage);
        }
      }

      // Determine winner based on remaining health
      const finalWinner = currentBot1Health > currentBot2Health ? bot1 : bot2;
      setWinner(finalWinner);
      setTurns(duelTurns);
    };

    simulateDuel();
  }, [bot1, bot2]);

  useEffect(() => {
    if (turns.length === 0) return;

    const timer = setTimeout(() => {
      if (currentTurn < turns.length) {
        const turn = turns[currentTurn];

        // Show spell effect
        setCurrentSpellEffect(getSpellEffect(turn.spell));
        setShowSpellEffect(true);

        // Update health after animation
        setTimeout(() => {
          if (turn.attacker.name === bot1.name) {
            setBot2Health((prev) => Math.max(0, prev - turn.damage));
          } else {
            setBot1Health((prev) => Math.max(0, prev - turn.damage));
          }
          setShowSpellEffect(false);
        }, 1500);

        setCurrentTurn(currentTurn + 1);
      } else if (!isComplete) {
        setIsComplete(true);
        setTimeout(() => {
          if (winner) {
            onComplete(winner);
          }
        }, 2000);
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [currentTurn, turns.length, isComplete, winner, onComplete, bot1.name]);

  const getSpellEffect = (spell: string) => {
    const effects: { [key: string]: string } = {
      "Phoenix Fire": "🔥🐦🔥",
      "Elder Wand Strike": "⚡🪄⚡",
      "Disarming Charm": "✨🌟✨",
      "Avada Kedavra": "💚💀💚",
      "Horcrux Shield": "🛡️⚫🛡️",
      "Serpent Strike": "🐍⚡🐍",
    };
    return effects[spell] || "✨💥✨";
  };

  const currentTurnData = turns[currentTurn - 1];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
    >
      <div className="text-center space-y-8 w-full max-w-4xl px-4">
        {/* Title */}
        <motion.h2
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="font-cinzel font-bold text-4xl magical-text-gradient"
        >
          ⚡ MAGICAL DUEL ⚡
        </motion.h2>

        {/* Health Bars */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-center space-y-2">
            <div className="font-cinzel font-bold text-xl text-white">
              {bot1.name}
            </div>
            <div className="w-32 h-4 bg-gray-700 rounded-full overflow-hidden border-2 border-red-500">
              <motion.div
                className="h-full bg-gradient-to-r from-red-500 to-red-300"
                initial={{ width: "100%" }}
                animate={{ width: `${bot1Health}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="text-red-300 font-bold">{bot1Health}/100</div>
          </div>

          <div className="text-center space-y-2">
            <div className="font-cinzel font-bold text-xl text-white">
              {bot2.name}
            </div>
            <div className="w-32 h-4 bg-gray-700 rounded-full overflow-hidden border-2 border-red-500">
              <motion.div
                className="h-full bg-gradient-to-r from-red-500 to-red-300"
                initial={{ width: "100%" }}
                animate={{ width: `${bot2Health}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="text-red-300 font-bold">{bot2Health}/100</div>
          </div>
        </div>

        {/* Bot Battle Arena */}
        <div className="flex items-center justify-center space-x-16 relative">
          {/* Bot 1 */}
          <motion.div
            animate={
              currentTurnData?.attacker.name === bot1.name
                ? {
                    scale: [1, 1.2, 1],
                    rotate: [0, -10, 0],
                    x: [0, 20, 0],
                  }
                : currentTurnData?.defender.name === bot1.name
                ? {
                    x: [0, -10, 0],
                    rotate: [0, 5, 0],
                  }
                : {}
            }
            transition={{ duration: 1 }}
            className="text-center relative"
          >
            <motion.div
              className="text-8xl mb-2"
              animate={
                currentTurnData?.defender.name === bot1.name && showSpellEffect
                  ? { scale: [1, 0.8, 1], opacity: [1, 0.5, 1] }
                  : {}
              }
            >
              <img
                src={bot1?.staticImg}
                alt={bot1?.name}
                className="w-[12rem] h-[14rem] object-contain drop-shadow-[0_0_15px_rgba(138,43,226,0.8)] hover:scale-105 transition-transform duration-300 ease-in-out"
              />
            </motion.div>
            <div className="font-cinzel font-bold text-xl text-white">
              {bot1.name}
            </div>

            {/* Damage indicator */}
            <AnimatePresence>
              {currentTurnData?.defender.name === bot1.name &&
                showSpellEffect && (
                  <motion.div
                    initial={{ y: 0, opacity: 1, scale: 0.5 }}
                    animate={{ y: -50, opacity: 0, scale: 1.5 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 text-red-500 font-bold text-2xl"
                  >
                    -{currentTurnData.damage}
                  </motion.div>
                )}
            </AnimatePresence>
          </motion.div>

          {/* Central Battle Effects */}
          <div className="relative">
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-4xl"
            >
              ⚔️
            </motion.div>

            {/* Spell Effect */}
            <AnimatePresence>
              {showSpellEffect && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 2, 1.5, 0],
                    opacity: [0, 1, 0.8, 0],
                    rotate: [0, 180, 360],
                  }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 1.5 }}
                  className="absolute inset-0 flex items-center justify-center text-6xl"
                >
                  {currentSpellEffect}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bot 2 */}
          <motion.div
            animate={
              currentTurnData?.attacker.name === bot2.name
                ? {
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, 0],
                    x: [0, -20, 0],
                  }
                : currentTurnData?.defender.name === bot2.name
                ? {
                    x: [0, 10, 0],
                    rotate: [0, -5, 0],
                  }
                : {}
            }
            transition={{ duration: 1 }}
            className="text-center relative"
          >
            <motion.div
              className="text-8xl mb-2"
              animate={
                currentTurnData?.defender.name === bot2.name && showSpellEffect
                  ? { scale: [1, 0.8, 1], opacity: [1, 0.5, 1] }
                  : {}
              }
            >
              <img
                src={bot2?.staticImg}
                alt={bot2?.name}
                className="w-[12rem] h-[14rem] object-contain drop-shadow-[0_0_15px_rgba(138,43,226,0.8)] hover:scale-105 transition-transform duration-300 ease-in-out"
              />
            </motion.div>
            <div className="font-cinzel font-bold text-xl text-white">
              {bot2.name}
            </div>

            {/* Damage indicator */}
            <AnimatePresence>
              {currentTurnData?.defender.name === bot2.name &&
                showSpellEffect && (
                  <motion.div
                    initial={{ y: 0, opacity: 1, scale: 0.5 }}
                    animate={{ y: -50, opacity: 0, scale: 1.5 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 text-red-500 font-bold text-2xl"
                  >
                    -{currentTurnData.damage}
                  </motion.div>
                )}
            </AnimatePresence>
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
              <motion.div
                className="text-xl text-white"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-yellow-400 font-bold">
                  {currentTurnData.attacker.name}
                </span>{" "}
                casts{" "}
                <span className="text-purple-400 font-bold italic">
                  "{currentTurnData.spell}"
                </span>
                !
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
                  <span className="text-yellow-400 font-bold">
                    {winner.name}
                  </span>{" "}
                  emerges triumphant!
                </div>
              </div>

              {/* Enhanced Celebration Particles */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(30)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{
                      x:
                        Math.random() *
                        (typeof window !== "undefined"
                          ? window.innerWidth
                          : 1200),
                      y:
                        typeof window !== "undefined"
                          ? window.innerHeight
                          : 800,
                      opacity: 1,
                      scale: Math.random() * 0.5 + 0.5,
                    }}
                    animate={{
                      y: -100,
                      opacity: 0,
                      rotate: 360,
                    }}
                    transition={{
                      duration: Math.random() * 2 + 2,
                      delay: Math.random() * 3,
                      repeat: Infinity,
                    }}
                    className="absolute text-2xl"
                  >
                    {
                      ["✨", "🎉", "⭐", "💫", "🌟"][
                        Math.floor(Math.random() * 5)
                      ]
                    }
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
