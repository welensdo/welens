'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MarketSegmentsChartProps {
  analytics?: any;
}

const segmentLabels: Record<string, { name: string; color: string; bgColor: string }> = {
  'tech_professional': { name: 'Profesional Tech', color: 'text-blue-700', bgColor: 'bg-blue-100' },
  'student': { name: 'Estudiante', color: 'text-green-700', bgColor: 'bg-green-100' },
  'fashion_conscious': { name: 'Fashion-Conscious', color: 'text-pink-700', bgColor: 'bg-pink-100' },
  'vision_focused': { name: 'Enfocado en visión', color: 'text-purple-700', bgColor: 'bg-purple-100' },
  'price_sensitive': { name: 'Sensible al precio', color: 'text-orange-700', bgColor: 'bg-orange-100' },
  'lifestyle_active': { name: 'Estilo de vida activo', color: 'text-indigo-700', bgColor: 'bg-indigo-100' },
  'mixed': { name: 'Mixto', color: 'text-gray-700', bgColor: 'bg-gray-100' }
};

export function MarketSegmentsChart({ analytics }: MarketSegmentsChartProps) {
  const segmentData = analytics?.marketSegments?.map((item: any) => ({
    segment: item._id,
    count: item.count,
    percentage: analytics.totalResponses > 0 ? ((item.count / analytics.totalResponses) * 100).toFixed(1) : '0',
    ...segmentLabels[item._id] || { name: item._id, color: 'text-gray-700', bgColor: 'bg-gray-100' }
  })).sort((a: any, b: any) => b.count - a.count) || [];

  return (
    <Card className="col-span-1 border-hairline-silver">
      <CardHeader>
        <CardTitle className="text-ink">Segmentos de Mercado</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {segmentData.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate">No hay datos de segmentos disponibles</p>
            </div>
          ) : (
            segmentData.map((segment: any, index: number) => (
              <div key={segment.segment} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant="secondary" 
                      className={`${segment.bgColor} ${segment.color} border-0`}
                    >
                      #{index + 1}
                    </Badge>
                    <span className="text-sm font-medium text-ink">{segment.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-ink">{segment.percentage}%</div>
                    <div className="text-xs text-slate">{segment.count} personas</div>
                  </div>
                </div>
                
                <div className="w-full bg-studio-mist rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${segment.bgColor.replace('bg-', 'bg-').replace('-100', '-500')}`}
                    style={{ width: `${segment.percentage}%` }}
                  />
                </div>
              </div>
            ))
          )}
        </div>

        {segmentData.length > 0 && (
          <div className="mt-6 p-4 rounded-lg bg-studio-mist/50">
            <div className="text-center">
              <div className="text-lg font-bold text-ink">
                {segmentData[0]?.name}
              </div>
              <div className="text-sm text-slate">
                Segmento dominante ({segmentData[0]?.percentage}%)
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}