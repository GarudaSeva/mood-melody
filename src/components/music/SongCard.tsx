import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Music } from 'lucide-react';
import { Song, emotionConfig } from '@/lib/types';
import GlassCard from '@/components/ui/GlassCard';
import { cn } from '@/lib/utils';

interface SongCardProps {
  song: Song;
  index: number;
}

const SongCard: React.FC<SongCardProps> = ({ song, index }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const config = emotionConfig[song.emotion];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <GlassCard className="p-4 hover:glow-effect transition-all duration-300 group" hover>
        <div className="flex items-center gap-4">
          {/* Album Art */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={cn(
              'relative w-16 h-16 rounded-xl flex items-center justify-center overflow-hidden',
              'bg-gradient-to-br from-muted to-muted/50'
            )}
          >
            <Music className="w-8 h-8 text-muted-foreground" />
            
            {/* Play button overlay */}
            <motion.button
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-primary" />
              ) : (
                <Play className="w-6 h-6 text-primary fill-primary" />
              )}
            </motion.button>
          </motion.div>

          {/* Song Info */}
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-foreground truncate">{song.title}</h4>
            <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
          </div>

          {/* Emotion Tag */}
          <div className="hidden sm:flex flex-col items-end gap-1">
            <span className="text-lg">{config.emoji}</span>
            <span className="text-xs text-muted-foreground">{song.duration}</span>
          </div>
        </div>

        {/* Playing indicator */}
        {isPlaying && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            className="mt-3 h-1 rounded-full bg-gradient-to-r from-primary via-secondary to-accent origin-left"
          />
        )}
      </GlassCard>
    </motion.div>
  );
};

export default SongCard;