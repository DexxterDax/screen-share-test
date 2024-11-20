import { Server } from '../types/Discord';

interface ServerListProps {
  servers: Server[];
  selectedServer: string;
  onServerSelect: (serverId: string) => void;
}

export function ServerList({ servers, selectedServer, onServerSelect }: ServerListProps) {
  return (
    <div className="w-[72px] bg-gray-900 h-screen flex flex-col items-center pt-3 space-y-2">
      <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-indigo-500 cursor-pointer transition-colors">
        <span className="text-white text-2xl">⌂</span>
      </div>
      <div className="w-full h-[2px] bg-gray-700 mx-2" />
      {servers.map((server) => (
        <button
          key={server.id}
          onClick={() => onServerSelect(server.id)}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all hover:rounded-2xl ${
            selectedServer === server.id ? 'bg-indigo-500' : 'bg-gray-700 hover:bg-indigo-500'
          }`}
        >
          {server.imageUrl ? (
            <img src={server.imageUrl} alt={server.name} className="w-8 h-8 rounded-full" />
          ) : (
            <span className="text-white">{server.name.substring(0, 2)}</span>
          )}
        </button>
      ))}
    </div>
  );
} 