
import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="mt-auto py-8 text-center border-t border-purple-500/20"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center space-x-2 text-purple-300">
          <span className="font-lato">Powered by ALGONOVA</span>
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">AN</span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
