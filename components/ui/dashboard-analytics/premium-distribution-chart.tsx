'use client';

import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface PremiumDistributionChartProps {
  analytics?: any;
}

const COLORS = ['#0066cc', '#6B7280', '#9CA3AF', '#D1D5DB', '#F3F4F6'];

const conditionLabels: Record<string, string> = {
  'myopia': 'Myopia',
  'hyperopia': 'Hyperopia', 
  'astigmatism': 'Astigmatism',
  'presbyopia': 'Presbyopia',
  'other': 'Other',
  'none': 'No conditions'
};

export function PremiumDistributionChart({ analytics }: PremiumDistributionChartProps) {
  const chartData = analytics?.visionConditions?.map((item: any, index: number) => ({
    name: conditionLabels[item._id] || item._id,
    value: item.count,
    percentage: analytics.totalResponses > 0 ? ((item.count / analytics.totalResponses) * 100) : 0,
    color: COLORS[index % COLORS.length]
  })).slice(0, 5) || [];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
          <p className="text-gray-900 text-sm font-medium">{data.name}</p>
          <p className="text-accent-blue text-sm">{data.value} responses</p>
          <p className="text-gray-600 text-xs">{data.percentage.toFixed(1)}% of total</p>
        </div>
      );
    }
    return null;
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    if (percent < 0.05) return null; // Don't show labels for very small segments
    
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="gray" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="500"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-xl p-6 border border-gray-200/60 shadow-sm col-span-1"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-gray-900 text-lg font-semibold">Vision conditions</h3>
          <p className="text-gray-600 text-sm">Distribution by type</p>
        </div>
        <div className="w-8 h-8 bg-accent-blue/10 rounded-lg flex items-center justify-center">
          <svg className="w-4 h-4 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </div>
      </div>

      {/* Chart */}
      <div className="h-48 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={70}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="space-y-3">
        {chartData.map((item: any, index: number) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-gray-700 text-sm">{item.name}</span>
            </div>
            <div className="text-right">
              <div className="text-gray-900 text-sm font-medium">{item.value}</div>
              <div className="text-gray-600 text-xs">{item.percentage.toFixed(1)}%</div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}