import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, RefreshCw, Music, Scan } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui/GlassCard';
import EmotionBadge from '@/components/ui/EmotionBadge';
import { Emotion } from '@/lib/types';
import { mockDetectFaceEmotion } from '@/lib/mockData';

const FaceDetection: React.FC = () => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [detectedEmotion, setDetectedEmotion] = useState<Emotion | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCapturing(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const captureImage = async () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(videoRef.current, 0, 0);
      const imageData = canvas.toDataURL('image/jpeg');
      setCapturedImage(imageData);

      // Stop the camera
      const stream = videoRef.current.srcObject as MediaStream;
      stream?.getTracks().forEach(track => track.stop());
      setIsCapturing(false);

      // Analyze emotion
      setIsAnalyzing(true);
      const emotion = await mockDetectFaceEmotion();
      setDetectedEmotion(emotion);
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setCapturedImage(null);
    setDetectedEmotion(null);
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
            Face Emotion Detection
          </h1>
          <p className="text-muted-foreground">
            Let our AI analyze your facial expression to detect your mood
          </p>
        </motion.div>

        <GlassCard className="p-6 md:p-8">
          {/* Camera/Image Display */}
          <div className="relative aspect-video rounded-xl overflow-hidden bg-muted/50 mb-6">
            <AnimatePresence mode="wait">
              {!isCapturing && !capturedImage && (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center"
                >
                  <Camera className="w-20 h-20 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Camera preview will appear here</p>
                </motion.div>
              )}

              {isCapturing && (
                <motion.video
                  key="video"
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
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
                <p className="text-foreground mt-4">Analyzing your emotion...</p>
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
                <p className="text-muted-foreground mb-3">Detected Emotion:</p>
                <EmotionBadge emotion={detectedEmotion} size="lg" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {!isCapturing && !capturedImage && (
              <Button
                onClick={startCamera}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
              >
                <Camera className="w-5 h-5" />
                Open Camera
              </Button>
            )}

            {isCapturing && (
              <Button
                onClick={captureImage}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
              >
                <Camera className="w-5 h-5" />
                Capture Image
              </Button>
            )}

            {capturedImage && (
              <>
                <Button
                  onClick={reset}
                  variant="outline"
                  className="flex-1 border-border gap-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  Try Again
                </Button>
                {detectedEmotion && (
                  <Button
                    onClick={() => navigate(`/recommendations?emotion=${detectedEmotion}`)}
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
                  >
                    <Music className="w-5 h-5" />
                    Get Music
                  </Button>
                )}
              </>
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default FaceDetection;