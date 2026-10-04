'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";

interface InnovationInterestChartProps {
  analytics?: any;
}

const interestLabels: Record<string, string> = {
  'very_interested': 'Muy interesado',
  'interested': 'Interesado',
  'maybe': 'Tal vez',
  'not_sure': 'No está seguro',
  'not_interested': 'No interesado'
};

export function InnovationInterestChart({ analytics }: InnovationInterestChartProps) {
  const chartData = analytics?.innovationInterest?.map((item: any) => ({
    interest: interestLabels[item._id] || item._id,
    count: item.count,
    percentage: analytics.totalResponses > 0 ? ((item.count / analytics.totalResponses) * 100).toFixed(1) : '0'
  })) || [];

  const chartConfig = {
    count: {
      label: "Respuestas",
      color: "#10B981"
    }
  };

  return (
    <Card className="col-span-1 md:col-span-1 border-hairline-silver">
      <CardHeader>
        <CardTitle className="text-ink">Interés en Graduación Removible</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart data={chartData}>
            <XAxis 
              dataKey="interest" 
              tick={{ fontSize: 10, fill: '#64748B' }}
              axisLine={false}
              tickLine={false}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#64748B' }}
              axisLine={false}
              tickLine={false}
            />
            <Area 
              type="monotone"
              dataKey="count" 
              stroke="#10B981"
              fill="#10B981"
              fillOpacity={0.2}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
          </AreaChart>
        </ChartContainer>
        <div className="mt-4 text-center">
          <p className="text-sm text-slate">
            Mayor interés: {chartData[0]?.interest} ({chartData[0]?.percentage}%)
          </p>
        </div>
      </CardContent>
    </Card>
  );
}