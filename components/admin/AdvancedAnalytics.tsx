'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AdvancedAnalyticsData {
  totalResponses: number;
  generatedAt: string;
  analytics: {
    ageAnalysis: any;
    visionHealthMetrics: any;
    marketOpportunity: any;
    customerSegmentation: any;
    purchaseBehavior: any;
    innovationAdoption: any;
    lifestylePatterns: any;
    conversionPotential: any;
    competitiveAnalysis: any;
    timeTrends: any;
  };
}

export default function AdvancedAnalytics() {
  const [data, setData] = useState<AdvancedAnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/typeform/analytics');
        if (!response.ok) throw new Error('Failed to fetch data');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!data || data.totalResponses === 0) return <NoDataMessage />;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-accent-blue to-pricing-blue text-white rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-2">Analíticas Avanzadas</h2>
        <p className="opacity-90">
          {data.totalResponses} respuestas analizadas • Actualizado {new Date(data.generatedAt).toLocaleString('es-MX')}
        </p>
      </div>

      {/* Key Performance Indicators */}
      <KPIDashboard analytics={data.analytics} totalResponses={data.totalResponses} />
      
      {/* Market Opportunity Section */}
      <MarketOpportunitySection analytics={data.analytics} />
      
      {/* Customer Intelligence */}
      <CustomerIntelligenceSection analytics={data.analytics} />
      
      {/* Vision Health Analysis */}
      <VisionHealthSection analytics={data.analytics} />
      
      {/* Innovation & Adoption */}
      <InnovationSection analytics={data.analytics} />
      
      {/* Competitive Insights */}
      <CompetitiveSection analytics={data.analytics} />
    </div>
  );
}

// Loading Component
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-accent-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate">Generando analíticas avanzadas...</p>
      </div>
    </div>
  );
}

// Error Component
function ErrorMessage({ error }: { error: string }) {
  return (
    <div className="text-center py-12">
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 max-w-md mx-auto">
        <p className="text-red-700">Error: {error}</p>
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

// No Data Component
function NoDataMessage() {
  return (
    <div className="text-center py-12">
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 bg-studio-mist rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-slate" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-ink mb-2">Datos insuficientes</h3>
        <p className="text-slate mb-4">Se necesitan más respuestas para generar analíticas avanzadas.</p>
      </div>
    </div>
  );
}
// KPI Dashboard Component
function KPIDashboard({ analytics, totalResponses }: { analytics: any, totalResponses: number }) {
  const kpis = [
    {
      title: 'Salud Visual Promedio',
      value: analytics.visionHealthMetrics?.visionHealthIndex || '0',
      unit: '%',
      color: 'bg-green-500',
      trend: 'up',
      description: 'Índice general de salud visual'
    },
    {
      title: 'Oportunidad de Mercado',
      value: analytics.marketOpportunity?.addressableMarket || '0',
      unit: '%', 
      color: 'bg-blue-500',
      trend: 'up',
      description: 'Personas que han dejado de usar lentes'
    },
    {
      title: 'Adopción de Innovación',
      value: analytics.innovationAdoption?.innovationReadiness || '0',
      unit: '%',
      color: 'bg-purple-500', 
      trend: 'up',
      description: 'Usuarios listos para innovación'
    },
    {
      title: 'Potencial de Conversión',
      value: analytics.conversionPotential?.highConversionPotential || '0',
      unit: '%',
      color: 'bg-orange-500',
      trend: 'up',
      description: 'Alta probabilidad de compra'
    },
    {
      title: 'Sensibilidad al Precio',
      value: analytics.purchaseBehavior?.pricesensitivity || '0',
      unit: '%',
      color: 'bg-red-500',
      trend: 'down',
      description: 'Usuarios sensibles al precio'
    },
    {
      title: 'Compatibilidad de Estilo',
      value: analytics.lifestylePatterns?.lifestyleCompatibility || '0',
      unit: '%',
      color: 'bg-pink-500',
      trend: 'up', 
      description: 'Compatibilidad con estilo de vida'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {kpis.map((kpi, index) => (
        <motion.div
          key={kpi.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-2xl p-6 border border-hairline-silver shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-4 h-4 rounded-full ${kpi.color}`}></div>
            <div className="flex items-center gap-1 text-sm text-slate">
              <svg className={`w-4 h-4 ${kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d={kpi.trend === 'up' ? 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' : 'M13 17h8m0 0V9m0 8l-8-8-4 4-6-6'} />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-ink mb-2">{kpi.value}{kpi.unit}</div>
          <h3 className="font-semibold text-ink mb-1">{kpi.title}</h3>
          <p className="text-sm text-slate">{kpi.description}</p>
        </motion.div>
      ))}
    </div>
  );
}

// Market Opportunity Section
function MarketOpportunitySection({ analytics }: { analytics: any }) {
  const opportunity = analytics.marketOpportunity || {};
  
  return (
    <div className="bg-white rounded-2xl p-8 border border-hairline-silver">
      <h3 className="text-xl font-bold text-ink mb-6 flex items-center gap-3">
        <span className="text-2xl">🎯</span>
        Oportunidad de Mercado
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="text-center p-6 bg-blue-50 rounded-xl">
          <div className="text-3xl font-bold text-blue-600 mb-2">{opportunity.addressableMarket || '0'}%</div>
          <div className="text-sm font-medium text-blue-800">Mercado Direccionable</div>
          <div className="text-xs text-blue-600 mt-1">Han dejado lentes que les gustaban</div>
        </div>
        
        <div className="text-center p-6 bg-green-50 rounded-xl">
          <div className="text-3xl font-bold text-green-600 mb-2">{opportunity.interestLevel || '0'}%</div>
          <div className="text-sm font-medium text-green-800">Nivel de Interés</div>
          <div className="text-xs text-green-600 mt-1">Interesados en la solución</div>
        </div>
        
        <div className="text-center p-6 bg-purple-50 rounded-xl">
          <div className="text-3xl font-bold text-purple-600 mb-2">{opportunity.qualifiedLeads || '0'}%</div>
          <div className="text-sm font-medium text-purple-800">Leads Calificados</div>
          <div className="text-xs text-purple-600 mt-1">Alta probabilidad de compra</div>
        </div>
        
        <div className="text-center p-6 bg-orange-50 rounded-xl">
          <div className="text-3xl font-bold text-orange-600 mb-2">{opportunity.marketPenetrationPotential || '0'}%</div>
          <div className="text-sm font-medium text-orange-800">Penetración Potencial</div>
          <div className="text-xs text-orange-600 mt-1">Usuarios tech-savvy</div>
        </div>
      </div>
    </div>
  );
}

// Customer Intelligence Section  
function CustomerIntelligenceSection({ analytics }: { analytics: any }) {
  const segmentation = analytics.customerSegmentation || {};
  const personas = segmentation.customerPersonas || {};
  
  return (
    <div className="bg-white rounded-2xl p-8 border border-hairline-silver">
      <h3 className="text-xl font-bold text-ink mb-6 flex items-center gap-3">
        <span className="text-2xl">🧠</span>
        Inteligencia de Clientes
      </h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Customer Personas */}
        <div>
          <h4 className="font-semibold text-ink mb-4">Personas de Cliente</h4>
          <div className="space-y-3">
            {Object.entries(personas).map(([persona, count]) => (
              <div key={persona} className="flex justify-between items-center p-3 bg-studio-mist rounded-xl">
                <span className="capitalize text-ink">{persona.replace('_', ' ')}</span>
                <span className="font-medium text-accent-blue">{count as number}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Purchase Personas */}
        <div>
          <h4 className="font-semibold text-ink mb-4">Perfiles de Compra</h4>
          <div className="space-y-3">
            {segmentation.purchasePersonas && Object.entries(segmentation.purchasePersonas).map(([persona, count]) => (
              <div key={persona} className="flex justify-between items-center p-3 bg-studio-mist rounded-xl">
                <span className="capitalize text-ink">{persona.replace('_', ' ')}</span>
                <span className="font-medium text-pricing-blue">{count as number}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-accent-blue/5 rounded-xl border border-accent-blue/20">
        <div className="text-sm text-accent-blue">
          <strong>Precisión de Segmentación:</strong> {segmentation.segmentationAccuracy || '0'}% de usuarios clasificados correctamente
        </div>
      </div>
    </div>
  );
}
// Vision Health Section
function VisionHealthSection({ analytics }: { analytics: any }) {
  const vision = analytics.visionHealthMetrics || {};
  
  return (
    <div className="bg-white rounded-2xl p-8 border border-hairline-silver">
      <h3 className="text-xl font-bold text-ink mb-6 flex items-center gap-3">
        <span className="text-2xl">👁️</span>
        Análisis de Salud Visual
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
          <div className="text-2xl font-bold text-green-600 mb-2">{vision.glassesUsageRate || '0'}%</div>
          <div className="text-sm font-medium text-green-800">Tasa de Uso de Lentes</div>
          <div className="text-xs text-green-600 mt-1">Usuarios activos de lentes</div>
        </div>
        
        <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
          <div className="text-2xl font-bold text-orange-600 mb-2">{vision.multipleConditionsRate || '0'}%</div>
          <div className="text-sm font-medium text-orange-800">Condiciones Múltiples</div>
          <div className="text-xs text-orange-600 mt-1">Usuarios con varias condiciones</div>
        </div>
        
        <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
          <div className="text-2xl font-bold text-blue-600 mb-2">{vision.averagePrescriptionStrength || '0'}</div>
          <div className="text-sm font-medium text-blue-800">Graduación Promedio</div>
          <div className="text-xs text-blue-600 mt-1">Dioptrías promedio</div>
        </div>
      </div>
      
      {vision.prescriptionDistribution && (
        <div className="mt-8">
          <h4 className="font-semibold text-ink mb-4">Distribución de Graduación</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <div className="text-xl font-bold text-green-600">{vision.prescriptionDistribution.light || 0}</div>
              <div className="text-sm text-green-700">Ligera (≤2.0)</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-xl">
              <div className="text-xl font-bold text-yellow-600">{vision.prescriptionDistribution.moderate || 0}</div>
              <div className="text-sm text-yellow-700">Moderada (2.1-4.0)</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-xl">
              <div className="text-xl font-bold text-red-600">{vision.prescriptionDistribution.strong || 0}</div>
              <div className="text-sm text-red-700">Fuerte (&gt;4.0)</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Innovation Section
function InnovationSection({ analytics }: { analytics: any }) {
  const innovation = analytics.innovationAdoption || {};
  const adoption = innovation.adoptionDistribution || {};
  
  return (
    <div className="bg-white rounded-2xl p-8 border border-hairline-silver">
      <h3 className="text-xl font-bold text-ink mb-6 flex items-center gap-3">
        <span className="text-2xl">🚀</span>
        Adopción de Innovación
      </h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Adoption Curve */}
        <div>
          <h4 className="font-semibold text-ink mb-4">Curva de Adopción</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-xl">
              <span className="text-purple-800 font-medium">Innovadores</span>
              <span className="text-purple-600 font-bold">{adoption.innovators || 0}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-xl">
              <span className="text-blue-800 font-medium">Early Adopters</span>
              <span className="text-blue-600 font-bold">{adoption.earlyAdopters || 0}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl">
              <span className="text-green-800 font-medium">Mayoría Temprana</span>
              <span className="text-green-600 font-bold">{adoption.earlyMajority || 0}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-xl">
              <span className="text-yellow-800 font-medium">Mayoría Tardía</span>
              <span className="text-yellow-600 font-bold">{adoption.lateMajority || 0}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-red-50 rounded-xl">
              <span className="text-red-800 font-medium">Rezagados</span>
              <span className="text-red-600 font-bold">{adoption.laggards || 0}</span>
            </div>
          </div>
        </div>
        
        {/* Innovation Readiness */}
        <div>
          <h4 className="font-semibold text-ink mb-4">Preparación del Mercado</h4>
          <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
            <div className="text-4xl font-bold text-purple-600 mb-4">{innovation.innovationReadiness || '0'}%</div>
            <div className="text-lg font-semibold text-purple-800 mb-2">Listos para Innovación</div>
            <div className="text-sm text-purple-600">Innovadores + Early Adopters</div>
          </div>
          
          <div className="mt-6 p-4 bg-accent-blue/5 rounded-xl border border-accent-blue/20">
            <div className="text-sm text-accent-blue">
              <strong>Timing del Mercado:</strong> {innovation.marketTiming === 'ready' ? '🟢 Listo' : innovation.marketTiming === 'emerging' ? '🟡 Emergente' : '🔴 Temprano'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Competitive Section
function CompetitiveSection({ analytics }: { analytics: any }) {
  const competitive = analytics.competitiveAnalysis || {};
  const purchase = analytics.purchaseBehavior || {};
  
  return (
    <div className="bg-white rounded-2xl p-8 border border-hairline-silver">
      <h3 className="text-xl font-bold text-ink mb-6 flex items-center gap-3">
        <span className="text-2xl">⚔️</span>
        Análisis Competitivo
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="text-center p-6 bg-red-50 rounded-xl">
          <div className="text-2xl font-bold text-red-600 mb-2">{competitive.brandDependency || '0'}%</div>
          <div className="text-sm font-medium text-red-800">Dependencia de Marca</div>
          <div className="text-xs text-red-600 mt-1">Usuarios leales a marcas</div>
        </div>
        
        <div className="text-center p-6 bg-purple-50 rounded-xl">
          <div className="text-2xl font-bold text-purple-600 mb-2">{competitive.innovationAppetite || '0'}%</div>
          <div className="text-sm font-medium text-purple-800">Apetito por Innovación</div>
          <div className="text-xs text-purple-600 mt-1">Buscan productos innovadores</div>
        </div>
        
        <div className="text-center p-6 bg-orange-50 rounded-xl">
          <div className="text-2xl font-bold text-orange-600 mb-2">{purchase.pricesensitivity || '0'}%</div>
          <div className="text-sm font-medium text-orange-800">Sensibilidad Precio</div>
          <div className="text-xs text-orange-600 mt-1">Decisión basada en precio</div>
        </div>
        
        <div className="text-center p-6 bg-green-50 rounded-xl">
          <div className="text-2xl font-bold text-green-600 mb-2">{purchase.purchaseReadiness || '0'}%</div>
          <div className="text-sm font-medium text-green-800">Listos para Comprar</div>
          <div className="text-xs text-green-600 mt-1">Alta intención de compra</div>
        </div>
      </div>
      
      <div className="mt-8 p-6 bg-gradient-to-r from-accent-blue/10 to-pricing-blue/10 rounded-xl border border-accent-blue/20">
        <h4 className="font-semibold text-ink mb-3">Ventajas Competitivas Identificadas</h4>
        <ul className="space-y-2 text-sm text-slate">
          <li className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            <span>Alta demanda por soluciones innovadoras ({competitive.innovationAppetite || '0'}% del mercado)</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            <span>Mercado dispuesto a adoptar nueva tecnología</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-yellow-500">⚠</span>
            <span>Competir en precio puede ser desafiante ({purchase.pricesensitivity || '0'}% sensibles al precio)</span>
          </li>
        </ul>
      </div>
    </div>
  );
}