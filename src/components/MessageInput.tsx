import { useState } from 'react';

interface MessageInputProps {
  onSendMessage: (content: string) => void;
  channelName?: string;
}

export function MessageInput({ onSendMessage, channelName = 'general' }: MessageInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-700">
      <div className="bg-gray-600 rounded-lg p-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={`Message #${channelName}`}
          className="w-full bg-transparent text-white outline-none placeholder-gray-400"
        />
      </div>
    </form>
  );
} 