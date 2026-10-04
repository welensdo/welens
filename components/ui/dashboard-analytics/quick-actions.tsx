'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw, ExternalLink, BarChart3, Users, FileText } from 'lucide-react';

interface QuickActionsProps {
  analytics?: any;
}

export function QuickActions({ analytics }: QuickActionsProps) {
  const handleExportData = () => {
    // Función para exportar datos
    console.log('Exportando datos...');
  };

  const handleRefreshData = () => {
    window.location.reload();
  };

  const handleViewSurvey = () => {
    window.open('/typeform', '_blank');
  };

  const handleViewAdvanced = () => {
    // Navegar a analytics avanzados
    console.log('Ver analytics avanzados...');
  };

  const actions = [
    {
      title: 'Exportar Datos',
      description: 'Descargar CSV con todas las respuestas',
      icon: Download,
      onClick: handleExportData,
      variant: 'default' as const
    },
    {
      title: 'Actualizar',
      description: 'Refrescar datos en tiempo real',
      icon: RefreshCw,
      onClick: handleRefreshData,
      variant: 'outline' as const
    },
    {
      title: 'Ver Encuesta',
      description: 'Abrir formulario en nueva pestaña',
      icon: ExternalLink,
      onClick: handleViewSurvey,
      variant: 'outline' as const
    },
    {
      title: 'Analytics Avanzados',
      description: 'Ver correlaciones y insights',
      icon: BarChart3,
      onClick: handleViewAdvanced,
      variant: 'outline' as const
    }
  ];

  return (
    <Card className="col-span-1 border-hairline-silver">
      <CardHeader>
        <CardTitle className="text-ink flex items-center gap-2">
          <Users className="w-5 h-5" />
          Acciones Rápidas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {actions.map((action) => (
            <Button
              key={action.title}
              variant={action.variant}
              className="w-full justify-start h-auto p-4"
              onClick={action.onClick}
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-accent-blue/10">
                  <action.icon className="w-4 h-4 text-accent-blue" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-sm">{action.title}</div>
                  <div className="text-xs text-slate">{action.description}</div>
                </div>
              </div>
            </Button>
          ))}
        </div>
        
        {analytics && (
          <div className="mt-6 pt-4 border-t border-hairline-silver">
            <div className="text-center">
              <div className="text-2xl font-bold text-ink">
                {analytics.totalResponses || 0}
              </div>
              <div className="text-sm text-slate">
                Total de respuestas
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-lg font-semibold text-green-600">
                  {analytics.glassesUsage?.find((item: any) => item._id === true)?.count || 0}
                </div>
                <div className="text-xs text-slate">Usan lentes</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-orange-600">
                  {analytics.visionConditionsAnalysis?.length || 0}
                </div>
                <div className="text-xs text-slate">Condiciones</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}