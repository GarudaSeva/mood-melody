import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Compass, Music } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import SongCard from '@/components/music/SongCard';
import EmotionFilter from '@/components/music/EmotionFilter';
import { Emotion } from '@/lib/types';
import { getSongsByEmotion } from '@/lib/mockData';
import { getAllSongs } from '@/lib/musicData';

const Explore: React.FC = () => {
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);

  const filteredSongs = useMemo(() => {
    if (!selectedEmotion) return getAllSongs();
    return getSongsByEmotion(selectedEmotion);
  }, [selectedEmotion]);

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6"
          >
            <Compass className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Browse Music</span>
          </motion.div>

          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Explore by Emotion
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Discover music curated for every emotional state. Select an emotion to filter the playlist.
          </p>
        </motion.div>

        {/* Emotion Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <GlassCard className="p-6">
            <h2 className="text-lg font-display font-semibold text-center mb-4">
              How do you want to feel?
            </h2>
            <EmotionFilter
              selectedEmotion={selectedEmotion}
              onSelect={setSelectedEmotion}
            />
          </GlassCard>
        </motion.div>

        {/* Songs List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-display font-semibold">
              {selectedEmotion 
                ? `${selectedEmotion.charAt(0).toUpperCase() + selectedEmotion.slice(1)} Playlist`
                : 'All Music'
              }
            </h2>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Music className="w-4 h-4" />
              <span className="text-sm">{filteredSongs.length} songs</span>
            </div>
          </div>

          <div className="space-y-3">
            {filteredSongs.map((song, index) => (
              <SongCard key={song.id} song={song} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Explore;