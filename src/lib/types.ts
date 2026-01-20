export type Emotion = 'happy' | 'sad' | 'angry' | 'calm' | 'excited' | 'neutral';

export interface Song {
  id: string;
  title: string;
  artist: string;
  emotion: Emotion;
  coverUrl: string;
  duration: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export const emotionConfig: Record<Emotion, { label: string; emoji: string; color: string; bgClass: string }> = {
  happy: {
    label: 'Happy',
    emoji: '😊',
    color: 'text-emotion-happy',
    bgClass: 'bg-emotion-happy',
  },
  sad: {
    label: 'Sad',
    emoji: '😢',
    color: 'text-emotion-sad',
    bgClass: 'bg-emotion-sad',
  },
  angry: {
    label: 'Angry',
    emoji: '😠',
    color: 'text-emotion-angry',
    bgClass: 'bg-emotion-angry',
  },
  calm: {
    label: 'Calm',
    emoji: '😌',
    color: 'text-emotion-calm',
    bgClass: 'bg-emotion-calm',
  },
  excited: {
    label: 'Excited',
    emoji: '🎉',
    color: 'text-emotion-excited',
    bgClass: 'bg-emotion-excited',
  },
  neutral: {
    label: 'Neutral',
    emoji: '😐',
    color: 'text-emotion-neutral',
    bgClass: 'bg-emotion-neutral',
  },
};