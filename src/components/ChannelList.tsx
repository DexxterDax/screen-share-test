import { Channel } from '../types/Discord';
import { webRTCService } from '../services/WebRTCService';

interface ChannelListProps {
  channels: Channel[];
  selectedChannel: string;
  onChannelSelect: (channelId: string) => void;
  onScreenShare?: (channelId: string) => void;
}

export function ChannelList({ 
  channels, 
  selectedChannel, 
  onChannelSelect,
  onScreenShare 
}: ChannelListProps) {
  const handleScreenShare = async (channelId: string) => {
    try {
      const channel = channels.find(c => c.id === channelId);
      if (channel?.isScreenSharing) {
        await webRTCService.stopScreenShare();
      } else {
        await webRTCService.startScreenShare();
      }
      onScreenShare?.(channelId);
    } catch (error) {
      console.error('Screen sharing error:', error);
    }
  };

  return (
    <div className="w-60 bg-gray-800 h-screen">
      <div className="p-4 shadow-md">
        <h2 className="text-white font-bold">Server Name</h2>
      </div>
      <div className="p-2">
        {channels.map((channel) => (
          <div key={channel.id} className="group">
            <div className={`w-full p-2 rounded flex items-center justify-between ${
              selectedChannel === channel.id
                ? 'bg-gray-600 text-white'
                : 'text-gray-400 hover:bg-gray-700 hover:text-gray-200'
            }`}>
              <button
                onClick={() => onChannelSelect(channel.id)}
                className="flex items-center space-x-2"
              >
                <span>{channel.type === 'text' ? '#' : '🔊'}</span>
                <span>{channel.name}</span>
              </button>
              
              {channel.type === 'voice' && (
                <button
                  onClick={() => handleScreenShare(channel.id)}
                  className={`opacity-0 group-hover:opacity-100 transition-opacity ${
                    channel.isScreenSharing ? 'text-green-500' : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M4 4h16v12H4z" />
                    <path d="M4 18h16v2H4z" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 