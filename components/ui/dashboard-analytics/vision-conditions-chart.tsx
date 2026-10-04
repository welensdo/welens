'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface VisionConditionsChartProps {
  analytics?: any;
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#6B7280'];

const conditionLabels: Record<string, string> = {
  'myopia': 'Miopía',
  'hyperopia': 'Hipermetropía', 
  'astigmatism': 'Astigmatismo',
  'presbyopia': 'Presbicia',
  'other': 'Otra condición',
  'none': 'Sin condiciones'
};

export function VisionConditionsChart({ analytics }: VisionConditionsChartProps) {
  const chartData = analytics?.visionConditionsAnalysis?.map((item: any, index: number) => ({
    name: conditionLabels[item._id] || item._id,
    value: item.count,
    percentage: analytics.totalResponses > 0 ? ((item.count / analytics.totalResponses) * 100).toFixed(1) : '0',
    color: COLORS[index % COLORS.length]
  })) || [];

  const chartConfig = chartData.reduce((config: any, item: any) => {
    config[item.name] = {
      label: item.name,
      color: item.color
    };
    return config;
  }, {});

  return (
    <Card className="col-span-1 md:col-span-1 border-hairline-silver">
      <CardHeader>
        <CardTitle className="text-ink">Condiciones Visuales</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
            >
              {chartData.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
          </PieChart>
        </ChartContainer>
        <div className="mt-4 space-y-2">
          {chartData.slice(0, 3).map((item: any) => (
            <div key={item.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-slate">{item.name}</span>
              </div>
              <span className="font-medium text-ink">{item.percentage}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}