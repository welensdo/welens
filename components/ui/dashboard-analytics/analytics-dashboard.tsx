'use client';

import { useState, useEffect } from 'react';
import { DashboardStats } from './stats';
import { VisionConditionsChart } from './vision-conditions-chart';
import { AgeDistributionChart } from './age-distribution-chart';
import { InnovationInterestChart } from './innovation-interest-chart';
import { IndividualResponses } from './individual-responses';
import { QuickActions } from './quick-actions';
import { MarketSegmentsChart } from './market-segments-chart';

export function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch analytics data
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('/api/typeform/submit?type=analytics');
        if (!response.ok) {
          throw new Error('Failed to fetch analytics');
        }
        const data = await response.json();
        setAnalytics(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-accent-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate">Cargando analíticas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 max-w-md mx-auto">
          <p className="text-red-700">Error al cargar analíticas: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (!analytics || analytics.totalResponses === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-studio-mist rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-slate" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-ink mb-2">Sin datos aún</h3>
          <p className="text-slate mb-4">No hay respuestas de encuestas disponibles para generar analíticas.</p>
          <a 
            href="/typeform" 
            target="_blank"
            className="inline-block px-6 py-3 bg-accent-blue text-white rounded-2xl hover:bg-accent-blue/90 transition-colors"
          >
            Ver formulario de encuesta
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-ink mb-2">Dashboard de Analíticas WeLens</h2>
          <p className="text-slate">
            Última actualización: {new Date(analytics.generatedAt).toLocaleString('es-MX')}
          </p>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Stats - toma todo el ancho */}
        <DashboardStats analytics={analytics} />

        {/* Primera fila de gráficos */}
        <VisionConditionsChart analytics={analytics} />
        <AgeDistributionChart analytics={analytics} />
        <InnovationInterestChart analytics={analytics} />
        <MarketSegmentsChart analytics={analytics} />

        {/* Segunda fila */}
        <IndividualResponses analytics={analytics} />
        <QuickActions analytics={analytics} />
      </div>
    </div>
  );
}

export default AnalyticsDashboard;