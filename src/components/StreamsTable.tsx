import React from 'react';
import { StreamData } from '../types/dashboard';
import { Activity, Wifi } from 'lucide-react';

interface Props {
  streams: StreamData[];
}

export const StreamsTable: React.FC<Props> = ({ streams }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Active Streams</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Viewers</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quality</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bitrate</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {streams.map((stream) => (
              <tr key={stream.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {stream.status === 'active' ? (
                    <Activity className="w-5 h-5 text-green-500" />
                  ) : (
                    <Wifi className="w-5 h-5 text-gray-400" />
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{stream.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{stream.viewers.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">{stream.quality}</td>
                <td className="px-6 py-4 whitespace-nowrap">{stream.bitrate} kbps</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};