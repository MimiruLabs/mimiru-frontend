'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedContainerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  show?: boolean;
  exitDirection?: 'up' | 'down' | 'left' | 'right';
}

const directionVariants = {
  up: { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } },
};

export const AnimatedContainer = ({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  direction = 'up',
  show = true,
  exitDirection,
}: AnimatedContainerProps) => {
  const variants = {
    hidden: directionVariants[direction].hidden,
    visible: directionVariants[direction].visible,
    exit: exitDirection ? directionVariants[exitDirection].hidden : directionVariants[direction].hidden,
  };

  const transition = {
    duration,
    delay,
    ease: [0.25, 0.46, 0.45, 0.94] as const,
  };

  // If show prop is provided, use AnimatePresence for conditional rendering
  if (show !== undefined) {
    return (
      <AnimatePresence>
        {show && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            transition={transition}
            className={className}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // Default behavior for always-visible containers
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}; 