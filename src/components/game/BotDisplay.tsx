import React, { useState } from "react";
import { motion } from "framer-motion";

interface Bot {
  name: string;
  power: number;
  img: string;
  staticImg: string;
  defense: number;
  spells: string[];
}

interface BotDisplayProps {
  bot: Bot;
  isSelected: boolean;
  onSelect: () => void;
}

const BotDisplay: React.FC<BotDisplayProps> = ({
  bot,
  isSelected,
  onSelect,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
        isSelected
          ? "border-yellow-400 bg-yellow-400/10 shadow-lg shadow-yellow-400/20"
          : "border-purple-500/30 bg-gray-900/50 hover:border-purple-400/50"
      }`}
    >
      {/* Bot Avatar */}
      <div className="text-center mb-6">
        <div className="w-40 h-40 mx-auto mb-4 overflow-hidden rounded-2xl bg-gradient-to-br from-purple-700 to-blue-700 p-1 shadow-lg transition-transform duration-500 hover:scale-105 hover:shadow-[0_0_25px_rgba(138,43,226,0.8)]">
          <img
            src={isHovered ? bot.img : bot.staticImg}
            alt={bot.name}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
        <h3 className="font-cinzel font-bold text-2xl text-yellow-300">
          {bot.name}
        </h3>
      </div>

      {/* Stats */}
      <div className="space-y-3 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-purple-300 font-lato">Power:</span>
          <div className="flex items-center space-x-2">
            <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-red-500 to-orange-500"
                initial={{ width: 0 }}
                animate={{ width: `${bot.power}%` }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </div>
            <span className="text-white font-bold text-sm">{bot.power}</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-purple-300 font-lato">Defense:</span>
          <div className="flex items-center space-x-2">
            <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                initial={{ width: 0 }}
                animate={{ width: `${bot.defense}%` }}
                transition={{ duration: 1, delay: 0.4 }}
              />
            </div>
            <span className="text-white font-bold text-sm">{bot.defense}</span>
          </div>
        </div>
      </div>

      {/* Spells */}
      <div>
        <h4 className="text-yellow-300 font-lato font-medium mb-2">Spells:</h4>
        <div className="space-y-1">
          {bot.spells.map((spell, index) => (
            <motion.div
              key={spell}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="text-sm text-gray-300 bg-gray-800/50 px-2 py-1 rounded"
            >
              ✨ {spell}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Selection indicator */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center"
        >
          <span className="text-black font-bold text-sm">✓</span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default BotDisplay;
