'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

interface PremiumRevenueChartProps {
  analytics?: any;
}

export function PremiumRevenueChart({ analytics }: PremiumRevenueChartProps) {
  const [timeframe, setTimeframe] = useState('Last 30 days');
  
  // Generar datos de tendencia basados en las respuestas reales
  const generateSurveyTrend = () => {
    if (!analytics?.monthlyTrend) return [];
    return analytics.monthlyTrend;
  };

  const trendData = generateSurveyTrend();
  const totalResponses = analytics?.totalResponses || 0;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
          <p className="text-gray-900 text-sm font-medium">{label}</p>
          <p className="text-accent-blue text-sm">
            Responses: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-xl p-6 border border-gray-200/60 shadow-sm col-span-1 md:col-span-2 lg:col-span-2"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-gray-900 text-lg font-semibold">Survey Responses</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-2xl font-bold text-gray-900">
              {totalResponses}
            </span>
            <span className="text-green-600 text-sm font-medium bg-green-50 px-2 py-1 rounded">
              Total submissions
            </span>
          </div>
        </div>
        
        <div className="relative">
          <select 
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="bg-white text-gray-900 text-sm px-3 py-2 rounded-lg border border-gray-200 focus:border-accent-blue focus:ring-1 focus:ring-accent-blue outline-none appearance-none pr-8"
          >
            <option value="Last 7 days">Last 7 days</option>
            <option value="Last 30 days">Last 30 days</option>
            <option value="Last 90 days">Last 90 days</option>
          </select>
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64 -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              dy={10}
            />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="responses" 
              stroke="url(#gradient)" 
              strokeWidth={2}
              dot={false}
              activeDot={{ 
                r: 4, 
                fill: '#0066cc',
                stroke: '#ffffff',
                strokeWidth: 2
              }}
            />
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#0066cc" />
                <stop offset="100%" stopColor="#60A5FA" />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-gray-200">
        <div>
          <div className="text-gray-600 text-xs">Glasses users</div>
          <div className="text-gray-900 font-semibold">
            {analytics?.keyMetrics?.glassesUserRate || 0}%
          </div>
        </div>
        <div>
          <div className="text-gray-600 text-xs">Avg age</div>
          <div className="text-gray-900 font-semibold">
            {analytics?.keyMetrics?.averageAge || 0} years
          </div>
        </div>
        <div>
          <div className="text-gray-600 text-xs">Most common</div>
          <div className="text-gray-900 font-semibold capitalize">
            {analytics?.keyMetrics?.mostCommonCondition || 'N/A'}
          </div>
        </div>
      </div>
    </motion.div>
  );
}