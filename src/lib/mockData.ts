import { Song, Emotion } from './types';
import { getSongsByEmotion as getRealSongs } from './musicData';

export const mockSongs: Song[] = [
  // Happy songs
  { id: '1', title: 'Happy', artist: 'Pharrell Williams', emotion: 'happy', coverUrl: '/placeholder.svg', duration: '3:53' },
  { id: '2', title: 'Good Vibrations', artist: 'The Beach Boys', emotion: 'happy', coverUrl: '/placeholder.svg', duration: '3:39' },
  { id: '3', title: 'Walking on Sunshine', artist: 'Katrina & The Waves', emotion: 'happy', coverUrl: '/placeholder.svg', duration: '3:58' },
  { id: '4', title: 'Uptown Funk', artist: 'Bruno Mars', emotion: 'happy', coverUrl: '/placeholder.svg', duration: '4:30' },
  { id: '5', title: "Can't Stop the Feeling", artist: 'Justin Timberlake', emotion: 'happy', coverUrl: '/placeholder.svg', duration: '3:56' },
  
  // Sad songs
  { id: '6', title: 'Someone Like You', artist: 'Adele', emotion: 'sad', coverUrl: '/placeholder.svg', duration: '4:45' },
  { id: '7', title: 'Fix You', artist: 'Coldplay', emotion: 'sad', coverUrl: '/placeholder.svg', duration: '4:54' },
  { id: '8', title: 'Hurt', artist: 'Johnny Cash', emotion: 'sad', coverUrl: '/placeholder.svg', duration: '3:38' },
  { id: '9', title: 'The Night We Met', artist: 'Lord Huron', emotion: 'sad', coverUrl: '/placeholder.svg', duration: '3:28' },
  { id: '10', title: 'Skinny Love', artist: 'Bon Iver', emotion: 'sad', coverUrl: '/placeholder.svg', duration: '3:58' },
  
  // Angry songs
  { id: '11', title: 'Break Stuff', artist: 'Limp Bizkit', emotion: 'angry', coverUrl: '/placeholder.svg', duration: '2:46' },
  { id: '12', title: 'Killing in the Name', artist: 'Rage Against the Machine', emotion: 'angry', coverUrl: '/placeholder.svg', duration: '5:13' },
  { id: '13', title: 'Given Up', artist: 'Linkin Park', emotion: 'angry', coverUrl: '/placeholder.svg', duration: '3:09' },
  { id: '14', title: 'Bodies', artist: 'Drowning Pool', emotion: 'angry', coverUrl: '/placeholder.svg', duration: '3:24' },
  { id: '15', title: 'Chop Suey!', artist: 'System of a Down', emotion: 'angry', coverUrl: '/placeholder.svg', duration: '3:30' },
  
  // Calm songs
  { id: '16', title: 'Weightless', artist: 'Marconi Union', emotion: 'calm', coverUrl: '/placeholder.svg', duration: '8:09' },
  { id: '17', title: 'Clair de Lune', artist: 'Debussy', emotion: 'calm', coverUrl: '/placeholder.svg', duration: '5:15' },
  { id: '18', title: 'Sunset Lover', artist: 'Petit Biscuit', emotion: 'calm', coverUrl: '/placeholder.svg', duration: '3:47' },
  { id: '19', title: 'Intro', artist: 'The xx', emotion: 'calm', coverUrl: '/placeholder.svg', duration: '2:07' },
  { id: '20', title: 'Porcelain', artist: 'Moby', emotion: 'calm', coverUrl: '/placeholder.svg', duration: '4:01' },
  
  // Excited songs
  { id: '21', title: 'Levels', artist: 'Avicii', emotion: 'excited', coverUrl: '/placeholder.svg', duration: '3:19' },
  { id: '22', title: 'Titanium', artist: 'David Guetta ft. Sia', emotion: 'excited', coverUrl: '/placeholder.svg', duration: '4:05' },
  { id: '23', title: "Don't Stop Me Now", artist: 'Queen', emotion: 'excited', coverUrl: '/placeholder.svg', duration: '3:29' },
  { id: '24', title: 'Wake Me Up', artist: 'Avicii', emotion: 'excited', coverUrl: '/placeholder.svg', duration: '4:07' },
  { id: '25', title: 'Pump It', artist: 'Black Eyed Peas', emotion: 'excited', coverUrl: '/placeholder.svg', duration: '3:33' },
  
  // Neutral songs
  { id: '26', title: 'Breathe', artist: 'Pink Floyd', emotion: 'neutral', coverUrl: '/placeholder.svg', duration: '2:49' },
  { id: '27', title: 'Teardrop', artist: 'Massive Attack', emotion: 'neutral', coverUrl: '/placeholder.svg', duration: '5:29' },
  { id: '28', title: 'Midnight City', artist: 'M83', emotion: 'neutral', coverUrl: '/placeholder.svg', duration: '4:03' },
  { id: '29', title: 'Somebody That I Used to Know', artist: 'Gotye', emotion: 'neutral', coverUrl: '/placeholder.svg', duration: '4:04' },
  { id: '30', title: 'Electric Feel', artist: 'MGMT', emotion: 'neutral', coverUrl: '/placeholder.svg', duration: '3:49' },
];

export const getSongsByEmotion = (emotion: Emotion): Song[] => {
  // Get real songs from musicData first
  const realSongs = getRealSongs(emotion);
  return realSongs;
};

export const detectEmotionFromText = (text: string): Emotion => {
  const lowercaseText = text.toLowerCase();
  
  const happyKeywords = ['happy', 'joy', 'excited', 'great', 'wonderful', 'amazing', 'love', '😊', '😄', '🥳', '❤️', '💕', '😁', '🎉', '✨'];
  const sadKeywords = ['sad', 'crying', 'depressed', 'lonely', 'heartbroken', 'miss', 'hurt', '😢', '😭', '💔', '😔', '😞'];
  const angryKeywords = ['angry', 'mad', 'furious', 'hate', 'annoyed', 'frustrated', '😠', '😡', '🤬', '💢'];
  const calmKeywords = ['calm', 'peaceful', 'relaxed', 'serene', 'quiet', 'zen', '😌', '🧘', '☮️', '🌿'];
  const excitedKeywords = ['excited', 'pumped', 'hyped', 'energized', 'thrilled', 'party', '🔥', '⚡', '💪', '🚀'];
  
  const scores: Record<Emotion, number> = {
    happy: 0, sad: 0, angry: 0, calm: 0, excited: 0, neutral: 0
  };
  
  happyKeywords.forEach(k => { if (lowercaseText.includes(k)) scores.happy++; });
  sadKeywords.forEach(k => { if (lowercaseText.includes(k)) scores.sad++; });
  angryKeywords.forEach(k => { if (lowercaseText.includes(k)) scores.angry++; });
  calmKeywords.forEach(k => { if (lowercaseText.includes(k)) scores.calm++; });
  excitedKeywords.forEach(k => { if (lowercaseText.includes(k)) scores.excited++; });
  
  const maxScore = Math.max(...Object.values(scores));
  if (maxScore === 0) return 'neutral';
  
  const emotion = Object.entries(scores).find(([, score]) => score === maxScore)?.[0] as Emotion;
  return emotion || 'neutral';
};

export const mockDetectFaceEmotion = (): Promise<Emotion> => {
  const emotions: Emotion[] = ['happy', 'sad', 'angry', 'calm', 'excited', 'neutral'];
  return new Promise((resolve) => {
    setTimeout(() => {
      const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
      resolve(randomEmotion);
    }, 2000);
  });
};