import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, MessageSquare, Sparkles } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import { useAuth } from '@/contexts/AuthContext';

const Home: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const options = [
    {
      icon: Camera,
      title: 'Detect via Face',
      description: 'Use your camera to analyze facial expressions and detect your current emotion.',
      path: '/face-detection',
      gradient: 'from-primary to-secondary',
    },
    {
      icon: MessageSquare,
      title: 'Detect via Text',
      description: 'Type your thoughts or use emojis to express how you feel right now.',
      path: '/text-detection',
      gradient: 'from-secondary to-accent',
    },
  ];

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="container mx-auto max-w-4xl">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Welcome back!</span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Hey, <span className="gradient-text">{user?.name || 'there'}</span>!
          </h1>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto">
            How would you like to discover music that matches your mood today?
          </p>
        </motion.div>

        {/* Options Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {options.map((option, index) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <GlassCard
                className="h-full p-8 cursor-pointer group"
                hover
                onClick={() => navigate(option.path)}
              >
                <div className="flex flex-col items-center text-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${option.gradient} flex items-center justify-center mb-6 group-hover:animate-pulse-glow`}
                  >
                    <option.icon className="w-10 h-10 text-background" />
                  </motion.div>
                  
                  <h2 className="text-2xl font-display font-semibold mb-3">
                    {option.title}
                  </h2>
                  <p className="text-muted-foreground">
                    {option.description}
                  </p>

                  <motion.div
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    className="h-1 bg-gradient-to-r from-primary to-secondary rounded-full mt-6"
                  />
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <GlassCard className="p-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-3xl font-display font-bold gradient-text">6</p>
                <p className="text-sm text-muted-foreground">Emotions</p>
              </div>
              <div>
                <p className="text-3xl font-display font-bold gradient-text">30+</p>
                <p className="text-sm text-muted-foreground">Songs</p>
              </div>
              <div>
                <p className="text-3xl font-display font-bold gradient-text">AI</p>
                <p className="text-sm text-muted-foreground">Powered</p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;