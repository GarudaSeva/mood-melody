import React from 'react';
import { motion } from 'framer-motion';
import { Emotion, emotionConfig } from '@/lib/types';
import { cn } from '@/lib/utils';

interface EmotionBadgeProps {
  emotion: Emotion;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animated?: boolean;
}

const EmotionBadge: React.FC<EmotionBadgeProps> = ({ 
  emotion, 
  size = 'md', 
  showLabel = true,
  animated = true 
}) => {
  const config = emotionConfig[emotion];
  
  const sizeClasses = {
    sm: 'text-lg px-3 py-1',
    md: 'text-2xl px-4 py-2',
    lg: 'text-4xl px-6 py-3',
  };

  if (animated) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring' as const, stiffness: 200 }}
        className={cn(
          'inline-flex items-center gap-2 rounded-full font-medium',
          sizeClasses[size],
          `emotion-glow-${emotion}`,
          config.bgClass,
          'text-background'
        )}
      >
        <span>{config.emoji}</span>
        {showLabel && <span>{config.label}</span>}
      </motion.div>
    );
  }

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-full font-medium',
        sizeClasses[size],
        `emotion-glow-${emotion}`,
        config.bgClass,
        'text-background'
      )}
    >
      <span>{config.emoji}</span>
      {showLabel && <span>{config.label}</span>}
    </div>
  );
};

export default EmotionBadge;