import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, RefreshCw, Video, VideoOff, Scan } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui/GlassCard';
import EmotionBadge from '@/components/ui/EmotionBadge';
import SongCard from '@/components/music/SongCard';
import { Emotion } from '@/lib/types';
import { mockDetectFaceEmotion, getSongsByEmotion } from '@/lib/mockData';

const FaceDetection: React.FC = () => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [detectedEmotion, setDetectedEmotion] = useState<Emotion | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 640 },
          height: { ideal: 480 }
        } 
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setIsCameraOn(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setCameraError('Could not access camera. Please allow camera permissions.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraOn(false);
  };

  const captureImage = async () => {
    if (videoRef.current && isCameraOn) {
      // Create canvas and capture frame
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // Mirror the image for selfie view
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(videoRef.current, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg', 0.9);
        setCapturedImage(imageData);
      }

      // Stop the camera after capture
      stopCamera();

      // Analyze emotion (mock)
      setIsAnalyzing(true);
      const emotion = await mockDetectFaceEmotion();
      setDetectedEmotion(emotion);
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setCapturedImage(null);
    setDetectedEmotion(null);
    setCameraError(null);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const recommendedSongs = detectedEmotion ? getSongsByEmotion(detectedEmotion) : [];

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Face Emotion Detection
          </h1>
          <p className="text-muted-foreground">
            Open your camera, make an expression, and click to capture!
          </p>
        </motion.div>

        <GlassCard className="p-6 md:p-8">
          {/* Camera/Image Display */}
          <div className="relative aspect-video rounded-xl overflow-hidden bg-muted/50 mb-6">
            {/* Hidden video element for camera */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`absolute inset-0 w-full h-full object-cover ${isCameraOn && !capturedImage ? 'block' : 'hidden'}`}
              style={{ transform: 'scaleX(-1)' }}
            />

            <AnimatePresence mode="wait">
              {!isCameraOn && !capturedImage && (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center"
                >
                  <Camera className="w-20 h-20 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center px-4">
                    {cameraError || 'Click "Open Camera" to start'}
                  </p>
                </motion.div>
              )}

              {capturedImage && (
                <motion.img
                  key="captured"
                  src={capturedImage}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
            </AnimatePresence>

            {/* Capture hint overlay when camera is on */}
            {isCameraOn && !capturedImage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-4 left-0 right-0 flex justify-center pointer-events-none"
              >
                <div className="bg-background/70 backdrop-blur-sm px-4 py-2 rounded-full">
                  <p className="text-sm text-foreground">😊 Make an expression & click Capture!</p>
                </div>
              </motion.div>
            )}

            {/* Analyzing Overlay */}
            {isAnalyzing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <Scan className="w-16 h-16 text-primary" />
                </motion.div>
                <p className="text-foreground mt-4">Analyzing your expression...</p>
              </motion.div>
            )}
          </div>

          {/* Detected Emotion */}
          <AnimatePresence>
            {detectedEmotion && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center mb-6"
              >
                <p className="text-muted-foreground mb-3">Your Emotion:</p>
                <EmotionBadge emotion={detectedEmotion} size="lg" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {!isCameraOn && !capturedImage && (
              <Button
                onClick={startCamera}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
              >
                <Video className="w-5 h-5" />
                Open Camera
              </Button>
            )}

            {isCameraOn && !capturedImage && (
              <>
                <Button
                  onClick={captureImage}
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
                >
                  <Camera className="w-5 h-5" />
                  Capture Photo
                </Button>
                <Button
                  onClick={stopCamera}
                  variant="outline"
                  className="flex-1 border-border gap-2"
                >
                  <VideoOff className="w-5 h-5" />
                  Stop Camera
                </Button>
              </>
            )}

            {capturedImage && (
              <Button
                onClick={reset}
                variant="outline"
                className="w-full border-border gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                Try Again
              </Button>
            )}
          </div>
        </GlassCard>

        {/* Music Recommendations Section */}
        <AnimatePresence>
          {detectedEmotion && recommendedSongs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ delay: 0.3 }}
              className="mt-8"
            >
              <GlassCard className="p-6 md:p-8">
                <h2 className="text-2xl font-display font-bold text-center mb-2">
                  🎵 Music for Your Mood
                </h2>
                <p className="text-muted-foreground text-center mb-6">
                  Based on your <span className="text-primary font-medium">{detectedEmotion}</span> expression
                </p>

                <div className="space-y-3">
                  {recommendedSongs.slice(0, 5).map((song, index) => (
                    <SongCard key={song.id} song={song} index={index} />
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FaceDetection;
