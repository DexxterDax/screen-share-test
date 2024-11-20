import { useState } from 'react';
import { ServerList } from './components/ServerList';
import { ChannelList } from './components/ChannelList';
import { ChatArea } from './components/ChatArea';
import { Server, Channel, Message, User } from './types/Discord';

// Mock current user
const currentUser: User = {
  id: '4',
  username: 'Wals',
  status: 'online',
};

// Your existing mock data remains the same
const mockServers: Server[] = [
  { id: '1', name: 'Gaming Server' },
  { id: '2', name: 'Coding Server' },
];

const mockChannels: Channel[] = [
  { id: '1', name: 'general', type: 'text' },
  { id: '2', name: 'voice-chat', type: 'voice' },
];

function App() {
  const [selectedServer, setSelectedServer] = useState(mockServers[0].id);
  const [selectedChannel, setSelectedChannel] = useState(mockChannels[0].id);
  const [messages, setMessages] = useState<Message[]>([]);
  const [channels, setChannels] = useState(mockChannels);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      author: currentUser,
      timestamp: new Date(),
    };
    setMessages([...messages, newMessage]);
  };

  const handleScreenShare = (channelId: string) => {
    setChannels(channels.map(channel => ({
      ...channel,
      isScreenSharing: channel.id === channelId ? !channel.isScreenSharing : channel.isScreenSharing
    })));
  };

  const selectedChannelData = channels.find(c => c.id === selectedChannel);

  return (
    <div className="flex h-screen">
      <ServerList
        servers={mockServers}
        selectedServer={selectedServer}
        onServerSelect={setSelectedServer}
      />
      <ChannelList
        channels={channels}
        selectedChannel={selectedChannel}
        onChannelSelect={setSelectedChannel}
        onScreenShare={handleScreenShare}
      />
      <ChatArea 
        selectedChannel={selectedChannelData}
      />
    </div>
  );
}

export default App;
