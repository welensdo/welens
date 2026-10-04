'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Users, Glasses, TrendingUp } from 'lucide-react';

interface DashboardStatsProps {
  analytics?: any;
}

export function DashboardStats({ analytics }: DashboardStatsProps) {
  const [stats, setStats] = useState({
    totalResponses: 0,
    glassesUsers: 0,
    averageAge: 0,
    interestRate: 0
  });

  useEffect(() => {
    if (analytics) {
      // Calcular usuarios de lentes
      const glassesUsers = analytics.glassesUsage?.find((item: any) => item._id === true)?.count || 0;
      
      // Calcular interés en innovación
      const veryInterested = analytics.innovationInterest?.find((item: any) => item._id === 'very_interested')?.count || 0;
      const interested = analytics.innovationInterest?.find((item: any) => item._id === 'interested')?.count || 0;
      const totalInterested = veryInterested + interested;
      const interestRate = analytics.totalResponses > 0 ? (totalInterested / analytics.totalResponses) * 100 : 0;
      
      // Calcular edad promedio
      let totalAge = 0;
      let ageCount = 0;
      analytics.ageDistribution?.forEach((ageGroup: any) => {
        const ageRange = ageGroup._id;
        let midpoint = 25; // Default
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
        glassesUsers: Math.round((glassesUsers / analytics.totalResponses) * 100) || 0,
        averageAge,
        interestRate: Math.round(interestRate) || 0
      });
    }
  }, [analytics]);

  const statCards = [
    {
      title: "Total Respuestas",
      value: stats.totalResponses.toLocaleString(),
      icon: Users,
      color: "text-accent-blue",
      bgColor: "bg-accent-blue/10"
    },
    {
      title: "Usuarios de Lentes",
      value: `${stats.glassesUsers}%`,
      icon: Glasses,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Edad Promedio",
      value: `${stats.averageAge} años`,
      icon: Eye,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      title: "Interés en Innovación",
      value: `${stats.interestRate}%`,
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    }
  ];

  return (
    <div className="col-span-1 md:col-span-2 lg:col-span-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.title} className="border-hairline-silver">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate">
                {stat.title}
              </CardTitle>
              <div className={`w-8 h-8 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ink">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}