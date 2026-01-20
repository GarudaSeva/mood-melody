import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Camera, MessageSquare, Music, Sparkles, ArrowRight } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

const About: React.FC = () => {
  const steps = [
    {
      icon: Camera,
      title: 'Capture / Input',
      description: 'Use your camera for face detection or type your feelings.',
    },
    {
      icon: Brain,
      title: 'AI Analysis',
      description: 'Our AI analyzes the input to detect emotional patterns.',
    },
    {
      icon: Sparkles,
      title: 'Emotion Detection',
      description: 'We identify emotions like Happy, Sad, Calm, and more.',
    },
    {
      icon: Music,
      title: 'Music Match',
      description: 'Get personalized playlist recommendations for your mood.',
    },
  ];

  const technologies = [
    { name: 'Facial Recognition', description: 'Deep learning models for emotion detection from facial expressions' },
    { name: 'NLP Analysis', description: 'Natural Language Processing for text sentiment analysis' },
    { name: 'Emotion Classification', description: 'Multi-class classification for 6 distinct emotional states' },
    { name: 'Music Curation', description: 'AI-powered playlist generation based on emotional profiles' },
  ];

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center mx-auto mb-6"
          >
            <Brain className="w-10 h-10 text-background" />
          </motion.div>
          
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
            About <span className="gradient-text">Euphony</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            An AI-powered music recommendation system that understands your emotions
            and curates the perfect playlist for your mood.
          </p>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-display font-semibold text-center mb-8">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-4 gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="relative"
              >
                <GlassCard className="h-full p-6 text-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-4"
                  >
                    <step.icon className="w-7 h-7 text-primary" />
                  </motion.div>
                  <h3 className="font-display font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </GlassCard>
                
                {/* Arrow connector */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technology Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-display font-semibold text-center mb-8">
            Powered by AI
          </h2>

          <GlassCard className="p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-6">
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium mb-1">{tech.name}</h4>
                    <p className="text-sm text-muted-foreground">{tech.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Emotion Types */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-display font-semibold text-center mb-8">
            Emotions We Detect
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { emoji: '😊', label: 'Happy', color: 'from-amber-500 to-yellow-500' },
              { emoji: '😢', label: 'Sad', color: 'from-blue-500 to-indigo-500' },
              { emoji: '😠', label: 'Angry', color: 'from-red-500 to-rose-500' },
              { emoji: '😌', label: 'Calm', color: 'from-teal-500 to-cyan-500' },
              { emoji: '🎉', label: 'Excited', color: 'from-pink-500 to-fuchsia-500' },
              { emoji: '😐', label: 'Neutral', color: 'from-slate-500 to-gray-500' },
            ].map((emotion, index) => (
              <motion.div
                key={emotion.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                <GlassCard className="p-4 text-center" hover>
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${emotion.color} flex items-center justify-center mx-auto mb-3`}>
                    <span className="text-2xl">{emotion.emoji}</span>
                  </div>
                  <p className="font-medium">{emotion.label}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;