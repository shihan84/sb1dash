import React from 'react';
import { TrafficData } from '../types/dashboard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Props {
  data: TrafficData[];
}

export const TrafficChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Traffic Overview</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="bandwidth"
              stroke="#2563eb"
              name="Bandwidth (Mbps)"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="viewers"
              stroke="#16a34a"
              name="Viewers"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};