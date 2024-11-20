import { Channel } from '../types/Discord';
import { ScreenShare } from './ScreenShare';

interface ChatAreaProps {
  selectedChannel?: Channel;
}

export function ChatArea({ selectedChannel }: ChatAreaProps) {
  console.log('ChatArea render:', selectedChannel);
  
  if (!selectedChannel?.isScreenSharing) {
    return null;
  }

  return (
    <div className="flex-1">
      <ScreenShare channelId={selectedChannel.id} />
    </div>
  );
} 