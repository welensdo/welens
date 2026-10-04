'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

interface AgeDistributionChartProps {
  analytics?: any;
}

const ageLabels: Record<string, string> = {
  '18-25': '18-25',
  '26-35': '26-35', 
  '36-45': '36-45',
  '46-55': '46-55',
  '56+': '56+',
  'unknown': 'No especificado'
};

export function AgeDistributionChart({ analytics }: AgeDistributionChartProps) {
  const chartData = analytics?.ageDistribution?.map((item: any) => ({
    ageGroup: ageLabels[item._id] || item._id,
    count: item.count,
    percentage: analytics.totalResponses > 0 ? ((item.count / analytics.totalResponses) * 100).toFixed(1) : '0'
  })) || [];

  const chartConfig = {
    count: {
      label: "Respuestas",
      color: "#3B82F6"
    }
  };

  return (
    <Card className="col-span-1 md:col-span-1 border-hairline-silver">
      <CardHeader>
        <CardTitle className="text-ink">Distribución por Edad</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData}>
            <XAxis 
              dataKey="ageGroup" 
              tick={{ fontSize: 12, fill: '#64748B' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#64748B' }}
              axisLine={false}
              tickLine={false}
            />
            <Bar 
              dataKey="count" 
              fill="#3B82F6"
              radius={[4, 4, 0, 0]}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
          </BarChart>
        </ChartContainer>
        <div className="mt-4 text-center">
          <p className="text-sm text-slate">
            Mayor concentración: {chartData[0]?.ageGroup} ({chartData[0]?.percentage}%)
          </p>
        </div>
      </CardContent>
    </Card>
  );
}