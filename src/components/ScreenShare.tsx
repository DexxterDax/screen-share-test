import { useEffect, useRef } from 'react';
import { webRTCService } from '../services/WebRTCService';

interface ScreenShareProps {
  channelId: string;
}

export function ScreenShare({ channelId }: ScreenShareProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    console.log('ScreenShare mounted for channel:', channelId);
    
    const handleStream = (stream: MediaStream) => {
      console.log('Received stream:', stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(err => {
          console.error('Error playing video:', err);
        });
      }
    };

    webRTCService.on('stream', handleStream);

    // If there's already a stream, use it
    if (webRTCService['stream']) {
      console.log('Using existing stream');
      handleStream(webRTCService['stream']);
    }

    return () => {
      console.log('ScreenShare unmounting');
      webRTCService.off('stream', handleStream);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, [channelId]);

  return (
    <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
      <div className="w-full h-full max-w-6xl max-h-[80vh] bg-black rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
} 