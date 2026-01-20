import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui/GlassCard';
import EmotionBadge from '@/components/ui/EmotionBadge';
import SongCard from '@/components/music/SongCard';
import EmotionFilter from '@/components/music/EmotionFilter';
import { Emotion } from '@/lib/types';
import { mockSongs, getSongsByEmotion } from '@/lib/mockData';

const Recommendations: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialEmotion = searchParams.get('emotion') as Emotion | null;
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(initialEmotion);

  const filteredSongs = useMemo(() => {
    if (!selectedEmotion) return mockSongs;
    return getSongsByEmotion(selectedEmotion);
  }, [selectedEmotion]);

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link to="/home">
            <Button variant="ghost" className="mb-4 text-muted-foreground hover:text-foreground gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </Link>

          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Music Recommendations
            </h1>
            {initialEmotion && (
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-muted-foreground">Based on your mood:</span>
                <EmotionBadge emotion={initialEmotion} size="md" />
              </div>
            )}
          </div>
        </motion.div>

        {/* Emotion Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <GlassCard className="p-4">
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
              {selectedEmotion ? `${selectedEmotion.charAt(0).toUpperCase() + selectedEmotion.slice(1)} Vibes` : 'All Songs'}
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

          {filteredSongs.length === 0 && (
            <GlassCard className="p-12 text-center">
              <Music className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No songs found for this emotion</p>
            </GlassCard>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Recommendations;