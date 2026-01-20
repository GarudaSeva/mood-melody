import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Sparkles, Music, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import GlassCard from '@/components/ui/GlassCard';
import EmotionBadge from '@/components/ui/EmotionBadge';
import { Emotion, emotionConfig } from '@/lib/types';
import { detectEmotionFromText } from '@/lib/mockData';

const TextDetection: React.FC = () => {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [detectedEmotion, setDetectedEmotion] = useState<Emotion | null>(null);
  const navigate = useNavigate();

  const quickEmojis = ['😊', '😢', '😠', '😌', '🎉', '😐', '❤️', '💔', '🔥', '🧘'];

  const analyzeText = async () => {
    if (!text.trim()) return;
    
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    const emotion = detectEmotionFromText(text);
    setDetectedEmotion(emotion);
    setIsAnalyzing(false);
  };

  const reset = () => {
    setText('');
    setDetectedEmotion(null);
  };

  const addEmoji = (emoji: string) => {
    setText(prev => prev + ' ' + emoji);
  };

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Text & Emoji Analysis
          </h1>
          <p className="text-muted-foreground">
            Express your feelings through text or emojis
          </p>
        </motion.div>

        <GlassCard className="p-6 md:p-8">
          {/* Text Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">
              How are you feeling?
            </label>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type your thoughts, feelings, or use emojis..."
              className="min-h-32 bg-muted/50 border-border resize-none"
              disabled={isAnalyzing || !!detectedEmotion}
            />
          </div>

          {/* Quick Emojis */}
          {!detectedEmotion && (
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-3">Quick add:</p>
              <div className="flex flex-wrap gap-2">
                {quickEmojis.map((emoji) => (
                  <motion.button
                    key={emoji}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => addEmoji(emoji)}
                    className="text-2xl hover:bg-muted/50 p-2 rounded-lg transition-colors"
                    disabled={isAnalyzing}
                  >
                    {emoji}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Analyzing Animation */}
          <AnimatePresence>
            {isAnalyzing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-center py-8"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="inline-block"
                >
                  <Sparkles className="w-12 h-12 text-primary" />
                </motion.div>
                <p className="text-foreground mt-4">Analyzing your emotions...</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Detected Emotion */}
          <AnimatePresence>
            {detectedEmotion && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center mb-6 py-6"
              >
                <p className="text-muted-foreground mb-4">Based on your text, you seem to be:</p>
                <EmotionBadge emotion={detectedEmotion} size="lg" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {!detectedEmotion ? (
              <Button
                onClick={analyzeText}
                disabled={!text.trim() || isAnalyzing}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
              >
                <MessageSquare className="w-5 h-5" />
                Analyze Emotion
              </Button>
            ) : (
              <>
                <Button
                  onClick={reset}
                  variant="outline"
                  className="flex-1 border-border gap-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  Try Again
                </Button>
                <Button
                  onClick={() => navigate(`/recommendations?emotion=${detectedEmotion}`)}
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
                >
                  <Music className="w-5 h-5" />
                  Get Music
                </Button>
              </>
            )}
          </div>
        </GlassCard>

        {/* Emotion Examples */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <GlassCard className="p-6">
            <h3 className="font-display font-semibold mb-4">Emotion Keywords</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              {(Object.keys(emotionConfig) as Emotion[]).map((emotion) => {
                const config = emotionConfig[emotion];
                return (
                  <div key={emotion} className="flex items-center gap-2">
                    <span className="text-xl">{config.emoji}</span>
                    <span className="text-muted-foreground">{config.label}</span>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};

export default TextDetection;