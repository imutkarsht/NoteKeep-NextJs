import { motion } from 'framer-motion';

const ShimmerEffect = () => (
  <motion.div
    className="w-full h-32 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse"
    initial={{ opacity: 0.6 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1.2, repeat: Infinity, repeatType: 'reverse' }}
  />
);

export default ShimmerEffect;
