import React from 'react';
import { motion } from 'framer-motion';
import { Emotion, emotionConfig } from '@/lib/types';
import { cn } from '@/lib/utils';

interface EmotionFilterProps {
  selectedEmotion: Emotion | null;
  onSelect: (emotion: Emotion | null) => void;
  showAll?: boolean;
}

const emotions: Emotion[] = ['happy', 'sad', 'angry', 'calm', 'excited', 'neutral'];

const EmotionFilter: React.FC<EmotionFilterProps> = ({ 
  selectedEmotion, 
  onSelect, 
  showAll = true 
}) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {showAll && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(null)}
          className={cn(
            'px-4 py-2 rounded-full text-sm font-medium transition-all',
            selectedEmotion === null
              ? 'bg-foreground text-background'
              : 'glass-card text-muted-foreground hover:text-foreground'
          )}
        >
          All
        </motion.button>
      )}
      
      {emotions.map((emotion) => {
        const config = emotionConfig[emotion];
        const isSelected = selectedEmotion === emotion;
        
        return (
          <motion.button
            key={emotion}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(emotion)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2',
              isSelected
                ? `${config.bgClass} text-background`
                : 'glass-card text-muted-foreground hover:text-foreground'
            )}
          >
            <span>{config.emoji}</span>
            <span>{config.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default EmotionFilter;