import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui/GlassCard';
import EmotionBadge from '@/components/ui/EmotionBadge';
import SongCard from '@/components/music/SongCard';
import EmotionFilter from '@/components/music/EmotionFilter';
import { Emotion, Song } from '@/lib/types';

const Recommendations: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialEmotion = searchParams.get('emotion') as Emotion | null;
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(initialEmotion);
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      // Only fetch if an emotion is selected
      if (!selectedEmotion) return;
      
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:5000/api/music/recommendations?emotion=${selectedEmotion}`);
        if (!response.ok) {
          throw new Error('Failed to fetch recommendations');
        }
        const data = await response.json();
        setSongs(data);
      } catch (err) {
        console.error(err);
        setError('Could not load music recommendations. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
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
              {selectedEmotion ? `${selectedEmotion.charAt(0).toUpperCase() + selectedEmotion.slice(1)} Vibes` : 'Select an Emotion'}
            </h2>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Music className="w-4 h-4" />
              <span className="text-sm">{songs.length} songs</span>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-muted-foreground">Fetching your music...</p>
            </div>
          ) : error ? (
            <GlassCard className="p-8 text-center border-destructive/20">
              <p className="text-destructive mb-4">{error}</p>
              <Button onClick={() => setSelectedEmotion(selectedEmotion)} variant="outline">Try Again</Button>
            </GlassCard>
          ) : (
            <>
              <div className="space-y-3">
                {songs.map((song, index) => (
                  <SongCard key={song.id} song={song} index={index} />
                ))}
              </div>

              {songs.length === 0 && selectedEmotion && (
                <GlassCard className="p-12 text-center">
                  <Music className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No songs found for this emotion</p>
                </GlassCard>
              )}
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Recommendations;