interface Server {
    id: string;
    name: string;
    imageUrl?: string;
  }
  
  interface Channel {
    id: string;
    name: string;
    type: 'text' | 'voice';
    isScreenSharing?: boolean;
  }
  
  interface Message {
    id: string;
    content: string;
    author: User;
    timestamp: Date;
  }
  
  interface User {
    id: string;
    username: string;
    avatarUrl?: string;
    status: 'online' | 'idle' | 'dnd' | 'offline';
  }
  
  interface ChatAreaProps {
    messages: Message[];
    onSendMessage: (content: string) => void;
    channelName?: string;
    selectedChannel?: Channel;
  }
  
  export type { Server, Channel, Message, User, ChatAreaProps };