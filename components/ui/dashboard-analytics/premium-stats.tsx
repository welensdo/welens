'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

interface PremiumStatsProps {
  analytics?: any;
}

export function PremiumStats({ analytics }: PremiumStatsProps) {
  const [stats, setStats] = useState({
    totalResponses: 0,
    glassesUsers: 0,
    averageAge: 0,
    interestRate: 0
  });

  useEffect(() => {
    if (analytics) {
      const glassesUsers = analytics.glassesUsage?.find((item: any) => item._id === true)?.count || 0;
      const glassesUserPercentage = analytics.totalResponses > 0 ? Math.round((glassesUsers / analytics.totalResponses) * 100) : 0;
      
      // Calcular interés en innovación basado en willingnessToTry
      const veryInterested = analytics.willingnessToTry?.find((item: any) => item._id === 'definitely')?.count || 0;
      const interested = analytics.willingnessToTry?.find((item: any) => item._id === 'probably')?.count || 0;
      const totalInterested = veryInterested + interested;
      const interestRate = analytics.totalResponses > 0 ? Math.round((totalInterested / analytics.totalResponses) * 100) : 0;
      
      // Calcular edad promedio
      let totalAge = 0;
      let ageCount = 0;
      analytics.ageDistribution?.forEach((ageGroup: any) => {
        const ageRange = ageGroup._id;
        let midpoint = 25;
        if (ageRange === '18-25') midpoint = 21.5;
        else if (ageRange === '26-35') midpoint = 30.5;
        else if (ageRange === '36-45') midpoint = 40.5;
        else if (ageRange === '46-55') midpoint = 50.5;
        else if (ageRange === '56+') midpoint = 60;
        
        totalAge += midpoint * ageGroup.count;
        ageCount += ageGroup.count;
      });
      const averageAge = ageCount > 0 ? Math.round(totalAge / ageCount) : 0;

      setStats({
        totalResponses: analytics.totalResponses || 0,
        glassesUsers: glassesUserPercentage,
        averageAge,
        interestRate: interestRate
      });
    }
  }, [analytics]);

  const statCards = [
    {
      title: "Total responses",
      value: stats.totalResponses,
      change: `${stats.totalResponses} survey submissions`,
      isPositive: true,
      format: "number"
    },
    {
      title: "Glasses users",
      value: stats.glassesUsers,
      change: `${stats.glassesUsers}% use glasses`,
      isPositive: true,
      format: "percentage"
    },
    {
      title: "Average age",
      value: stats.averageAge,
      change: "Years old average",
      isPositive: true,
      format: "number"
    },
    {
      title: "Innovation interest",
      value: stats.interestRate,
      change: `Interest in removable graduation`,
      isPositive: stats.interestRate > 50,
      format: "percentage"
    }
  ];

  return (
    <div className="col-span-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 border border-gray-200/60 shadow-sm hover:shadow-md transition-all duration-200"
          >
            {/* Icon */}
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-accent-blue/10 rounded-lg flex items-center justify-center">
                <div className="w-2 h-2 bg-accent-blue rounded-full" />
              </div>
              <div className={`px-2 py-1 rounded-md text-xs font-medium ${
                stat.isPositive 
                  ? 'bg-green-50 text-green-600' 
                  : 'bg-red-50 text-red-600'
              }`}>
                {stat.change.includes('%') ? stat.change.split(' ')[0] : '+12%'}
              </div>
            </div>

            {/* Value */}
            <div className="mb-2">
              <div className="text-3xl font-bold text-gray-900">
                {stat.format === 'currency' && '$'}
                <CountUp
                  end={stat.value}
                  duration={2}
                  separator=","
                />
                {stat.format === 'percentage' && '%'}
              </div>
            </div>

            {/* Title and Change */}
            <div>
              <div className="text-gray-600 text-sm font-medium mb-1">
                {stat.title}
              </div>
              <div className="text-xs text-gray-500">
                {stat.change}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}