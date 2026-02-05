import { Emotion, Song } from './types';

// Real music database from public/musicData folder
export const musicDatabase: Record<Emotion, Song[]> = {
  happy: [
    {
      id: 'happy-1',
      title: 'The Beast in My Head',
      artist: 'Brightest Avenue',
      emotion: 'happy',
      coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop',
      duration: '3:00',
      audioUrl: '/musicData/happy/brightestavenue-the-beast-in-my-head-155364.mp3'
    }
  ],
  sad: [
    {
      id: 'sad-1',
      title: 'Cold War',
      artist: 'R33lm0bstr',
      emotion: 'sad',
      coverUrl: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=300&h=300&fit=crop',
      duration: '3:30',
      audioUrl: '/musicData/sad/r33lm0bstr-coldwar-offical-audio-112451.mp3'
    },
    {
      id: 'sad-2',
      title: 'The Beast in My Head',
      artist: 'Brightest Avenue',
      emotion: 'sad',
      coverUrl: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=300&h=300&fit=crop',
      duration: '3:00',
      audioUrl: '/musicData/sad/brightestavenue-the-beast-in-my-head-155364 (1).mp3'
    }
  ],
  angry: [
    {
      id: 'angry-1',
      title: 'Cold War',
      artist: 'R33lm0bstr',
      emotion: 'angry',
      coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
      duration: '3:30',
      audioUrl: '/musicData/angry/r33lm0bstr-coldwar-offical-audio-112451.mp3'
    },
    {
      id: 'angry-2',
      title: 'The Beast in My Head',
      artist: 'Brightest Avenue',
      emotion: 'angry',
      coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
      duration: '3:00',
      audioUrl: '/musicData/angry/brightestavenue-the-beast-in-my-head-155364.mp3'
    }
  ],
  calm: [
    {
      id: 'calm-1',
      title: 'Sad Instrumental Music',
      artist: 'Andriig',
      emotion: 'calm',
      coverUrl: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&h=300&fit=crop',
      duration: '4:00',
      audioUrl: '/musicData/calm/andriig-sad-sad-instrumental-music-471913.mp3'
    }
  ],
  excited: [
    {
      id: 'excited-1',
      title: 'Excited Event Music',
      artist: 'HitsLab',
      emotion: 'excited',
      coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
      duration: '3:15',
      audioUrl: '/musicData/excited/hitslab-exciting-excited-event-music-460586.mp3'
    },
    {
      id: 'excited-2',
      title: 'Excited Event Music',
      artist: 'TataMusic',
      emotion: 'excited',
      coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
      duration: '3:20',
      audioUrl: '/musicData/excited/tatamusic-exciting-excited-event-music-478209.mp3'
    }
  ],
  neutral: [
    {
      id: 'neutral-1',
      title: 'Science Documentary',
      artist: 'Lexin Music',
      emotion: 'neutral',
      coverUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop',
      duration: '4:00',
      audioUrl: '/musicData/neutral/lexin_music-science-documentary-169621.mp3'
    },
    {
      id: 'neutral-2',
      title: 'Ambient Neutral V21',
      artist: 'SenorMusica81',
      emotion: 'neutral',
      coverUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop',
      duration: '3:45',
      audioUrl: '/musicData/neutral/senormusica81-ambient-neutral-v21-456869 (1).mp3'
    }
  ],
};

// Get songs by emotion
export function getSongsByEmotion(emotion: Emotion): Song[] {
  return musicDatabase[emotion] || [];
}

// Get all songs
export function getAllSongs(): Song[] {
  return Object.values(musicDatabase).flat();
}
