import React from 'react';
import { StreamsTable } from './components/StreamsTable';
import { TrafficChart } from './components/TrafficChart';
import { UsersList } from './components/UsersList';
import { mockStreams, mockTrafficData, mockUsers } from './data/mockData';
import { Bell, Download } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Stream Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Bell className="w-6 h-6 text-gray-600" />
              </button>
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Active Streams</h3>
              <p className="text-3xl font-bold text-blue-600">
                {mockStreams.filter(s => s.status === 'active').length}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Total Viewers</h3>
              <p className="text-3xl font-bold text-green-600">
                {mockStreams.reduce((acc, curr) => acc + curr.viewers, 0).toLocaleString()}
              </p>
            </div>
          </div>

          <StreamsTable streams={mockStreams} />
          <TrafficChart data={mockTrafficData} />
          <UsersList users={mockUsers} />
        </div>
      </main>
    </div>
  );
}

export default App;