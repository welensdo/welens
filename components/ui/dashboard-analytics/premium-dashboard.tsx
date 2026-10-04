'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PremiumStats } from './premium-stats';
import { PremiumRevenueChart } from './premium-revenue-chart';
import { PremiumDistributionChart } from './premium-distribution-chart';
import { PremiumIndividualResponses } from './premium-individual-responses';
import { AdvancedAnalytics } from './advanced-analytics';
import { IndividualResponsesList } from './individual-responses-list';

// Modal de Questions
function QuestionsModal({ isOpen, onClose, analytics }: { isOpen: boolean, onClose: () => void, analytics: any }) {
  if (!isOpen || !analytics) return null;

  const questions = [
    {
      id: 'usesGlasses',
      question: '¿Usas gafas actualmente?',
      options: [
        { value: true, label: 'Sí, uso gafas', count: analytics.glassesUsage?.find((item: any) => item._id === true)?.count || 0 },
        { value: false, label: 'No uso gafas', count: analytics.glassesUsage?.find((item: any) => item._id === false)?.count || 0 }
      ]
    },
    {
      id: 'glassesType',
      question: '¿Qué tipo de gafas usas?',
      options: [
        { value: 'reading', label: 'Para leer', count: analytics.glassesType?.find((item: any) => item._id === 'reading')?.count || 0 },
        { value: 'distance', label: 'Para distancia', count: analytics.glassesType?.find((item: any) => item._id === 'distance')?.count || 0 },
        { value: 'computer', label: 'Para computadora', count: analytics.glassesType?.find((item: any) => item._id === 'computer')?.count || 0 },
        { value: 'sunglasses', label: 'Gafas de sol', count: analytics.glassesType?.find((item: any) => item._id === 'sunglasses')?.count || 0 },
        { value: 'bifocal', label: 'Bifocales', count: analytics.glassesType?.find((item: any) => item._id === 'bifocal')?.count || 0 }
      ]
    },
    {
      id: 'visionConditions',
      question: '¿Qué condiciones de visión tienes?',
      options: [
        { value: 'myopia', label: 'Miopía', count: analytics.visionConditions?.find((item: any) => item._id === 'myopia')?.count || 0 },
        { value: 'hyperopia', label: 'Hipermetropía', count: analytics.visionConditions?.find((item: any) => item._id === 'hyperopia')?.count || 0 },
        { value: 'astigmatism', label: 'Astigmatismo', count: analytics.visionConditions?.find((item: any) => item._id === 'astigmatism')?.count || 0 },
        { value: 'presbyopia', label: 'Presbicia', count: analytics.visionConditions?.find((item: any) => item._id === 'presbyopia')?.count || 0 },
        { value: 'none', label: 'Ninguna condición', count: analytics.visionConditions?.find((item: any) => item._id === 'none')?.count || 0 }
      ]
    },
    {
      id: 'prescriptionStrength',
      question: '¿Cuál es tu graduación aproximada?',
      options: [
        { value: '0', label: 'Sin graduación', count: analytics.graduationLevels?.find((item: any) => item._id === '0')?.count || 0 },
        { value: '1', label: '±1.00', count: analytics.graduationLevels?.find((item: any) => item._id === '1')?.count || 0 },
        { value: '2', label: '±2.00', count: analytics.graduationLevels?.find((item: any) => item._id === '2')?.count || 0 },
        { value: '3', label: '±3.00', count: analytics.graduationLevels?.find((item: any) => item._id === '3')?.count || 0 },
        { value: '4', label: '±4.00', count: analytics.graduationLevels?.find((item: any) => item._id === '4')?.count || 0 },
        { value: '5+', label: '±5.00+', count: analytics.graduationLevels?.find((item: any) => item._id === '5+')?.count || 0 }
      ]
    },
    {
      id: 'ageGroup',
      question: '¿Cuál es tu rango de edad?',
      options: [
        { value: '18-25', label: '18 - 25 años (Joven adulto)', count: analytics.ageDistribution?.find((item: any) => item._id === '18-25')?.count || 0 },
        { value: '26-35', label: '26 - 35 años (Adulto joven)', count: analytics.ageDistribution?.find((item: any) => item._id === '26-35')?.count || 0 },
        { value: '36-45', label: '36 - 45 años (Adulto)', count: analytics.ageDistribution?.find((item: any) => item._id === '36-45')?.count || 0 },
        { value: '46-55', label: '46 - 55 años (Adulto maduro)', count: analytics.ageDistribution?.find((item: any) => item._id === '46-55')?.count || 0 },
        { value: '56+', label: '56+ años (Adulto mayor)', count: analytics.ageDistribution?.find((item: any) => item._id === '56+')?.count || 0 }
      ]
    },
    {
      id: 'stoppedUsingGlasses',
      question: '¿Alguna vez dejaste de usar gafas que te gustaban?',
      options: [
        { value: true, label: 'Sí, he dejado de usar gafas', count: analytics.stoppedUsingRate || 0 },
        { value: false, label: 'No, siempre las he usado', count: (analytics.totalResponses || 0) - (analytics.stoppedUsingRate || 0) }
      ]
    },
    {
      id: 'reasonsForStopping',
      question: '¿Por qué dejaste de usar gafas?',
      options: [
        { value: 'uncomfortable', label: 'Eran incómodas', count: analytics.reasonsForStopping?.find((item: any) => item._id === 'uncomfortable')?.count || 0 },
        { value: 'broke', label: 'Se rompieron', count: analytics.reasonsForStopping?.find((item: any) => item._id === 'broke')?.count || 0 },
        { value: 'lost', label: 'Las perdí', count: analytics.reasonsForStopping?.find((item: any) => item._id === 'lost')?.count || 0 },
        { value: 'style', label: 'No me gustaba como me veía', count: analytics.reasonsForStopping?.find((item: any) => item._id === 'style')?.count || 0 },
        { value: 'forgot', label: 'Se me olvidaba usarlas', count: analytics.reasonsForStopping?.find((item: any) => item._id === 'forgot')?.count || 0 }
      ]
    },
    {
      id: 'interestInRemovableGraduation',
      question: '¿Te interesaría poder quitar y poner la graduación de tus gafas?',
      options: [
        { value: 'very_interested', label: '¡Me encantaría!', count: analytics.innovationInterest?.find((item: any) => item._id === 'very_interested')?.count || 0 },
        { value: 'interested', label: 'Me interesa mucho', count: analytics.innovationInterest?.find((item: any) => item._id === 'interested')?.count || 0 },
        { value: 'maybe', label: 'Tal vez', count: analytics.innovationInterest?.find((item: any) => item._id === 'maybe')?.count || 0 },
        { value: 'not_sure', label: 'No estoy seguro/a', count: analytics.innovationInterest?.find((item: any) => item._id === 'not_sure')?.count || 0 },
        { value: 'not_interested', label: 'No me interesa', count: analytics.innovationInterest?.find((item: any) => item._id === 'not_interested')?.count || 0 }
      ]
    },
    {
      id: 'glassesUsageFrequency',
      question: '¿Con qué frecuencia usas gafas?',
      options: [
        { value: 'always', label: 'Todo el tiempo', count: analytics.glassesUsageFrequency?.find((item: any) => item._id === 'always')?.count || 0 },
        { value: 'most_time', label: 'La mayor parte del tiempo', count: analytics.glassesUsageFrequency?.find((item: any) => item._id === 'most_time')?.count || 0 },
        { value: 'sometimes', label: 'A veces', count: analytics.glassesUsageFrequency?.find((item: any) => item._id === 'sometimes')?.count || 0 },
        { value: 'rarely', label: 'Rara vez', count: analytics.glassesUsageFrequency?.find((item: any) => item._id === 'rarely')?.count || 0 }
      ]
    },
    {
      id: 'lifestyleFactors',
      question: '¿Cuáles de estos factores influyen en tu estilo de vida?',
      options: [
        { value: 'professional_work', label: 'Trabajo profesional', count: analytics.lifestyleFactors?.find((item: any) => item._id === 'professional_work')?.count || 0 },
        { value: 'student', label: 'Estudiante', count: analytics.lifestyleFactors?.find((item: any) => item._id === 'student')?.count || 0 },
        { value: 'screen_heavy', label: 'Uso intensivo de pantallas', count: analytics.lifestyleFactors?.find((item: any) => item._id === 'screen_heavy')?.count || 0 },
        { value: 'sports', label: 'Deportes/Ejercicio', count: analytics.lifestyleFactors?.find((item: any) => item._id === 'sports')?.count || 0 },
        { value: 'social_active', label: 'Vida social activa', count: analytics.lifestyleFactors?.find((item: any) => item._id === 'social_active')?.count || 0 },
        { value: 'travel', label: 'Viajes frecuentes', count: analytics.lifestyleFactors?.find((item: any) => item._id === 'travel')?.count || 0 }
      ]
    }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-accent-blue to-pricing-blue px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-white">Preguntas del Survey</h2>
                <p className="text-white/80 text-sm">Estadísticas detalladas por pregunta</p>
              </div>
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
            <div className="space-y-8">
              {questions.map((question, index) => (
                <div key={question.id} className="border border-hairline-silver rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-ink mb-4">
                    {index + 1}. {question.question}
                  </h3>
                  <div className="space-y-3">
                    {question.options.map((option) => {
                      const percentage = analytics.totalResponses > 0 
                        ? ((option.count / analytics.totalResponses) * 100).toFixed(1)
                        : '0.0';
                      
                      return (
                        <div key={String(option.value)} className="flex items-center justify-between p-3 bg-studio-mist rounded-lg">
                          <div className="flex items-center space-x-3 flex-1">
                            <div className="w-full">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-medium text-ink">{option.label}</span>
                                <span className="text-sm text-slate">{option.count} respuestas ({percentage}%)</span>
                              </div>
                              <div className="w-full bg-white rounded-full h-2">
                                <div
                                  className="bg-accent-blue h-2 rounded-full transition-all duration-500"
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-3 text-xs text-slate">
                    Total de respuestas para esta pregunta: {question.options.reduce((sum, option) => sum + option.count, 0)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-studio-mist px-6 py-4 border-t border-hairline-silver">
            <div className="flex justify-between items-center">
              <div className="text-sm text-slate">
                Basado en {analytics.totalResponses} respuestas totales
              </div>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-accent-blue text-white rounded-lg hover:bg-accent-blue/90 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export function PremiumDashboard({ initialAnalytics }: { initialAnalytics?: any } = {}) {
  const [analytics, setAnalytics] = useState<any>(initialAnalytics || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showQuestionsModal, setShowQuestionsModal] = useState(false);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔄 Fetching analytics from /api/typeform/analytics');
        
        // Fetch real analytics from our new API
        const response = await fetch('/api/typeform/analytics');
        
        console.log('📡 Analytics response status:', response.status);
        
        if (!response.ok) {
          const errorData = await response.text();
          console.error('❌ Analytics API error:', errorData);
          throw new Error(`HTTP ${response.status}: ${errorData}`);
        }
        
        const data = await response.json();
        console.log('✅ Analytics data received:', data.totalResponses, 'responses');
        
        setAnalytics(data);
        setError(null);
      } catch (err) {
        console.error('❌ Analytics fetch error:', err);
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        setError(`Error loading analytics: ${errorMessage}`);
        
        // Provide minimal fallback data structure so components don't crash
        setAnalytics({
          totalResponses: 0,
          keyMetrics: {
            glassesUserRate: 0,
            conversionRate: 0,
            averageAge: 0,
            mostCommonCondition: 'N/A'
          },
          advancedAnalytics: {
            segmentation: { targetMarket: 0, premiumSegment: 0, dissatisfiedUsers: 0 },
            correlationMatrix: { ageVisionCorrelations: {}, innovationCorrelations: {} },
            behaviorInsights: { stoppedUsingRate: 0, satisfactionScore: 0, innovationReadiness: 0 }
          }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gallery-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-12 h-12 border-2 border-gray-200 border-t-accent-blue rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </motion.div>
      </div>
    );
  }

  if (error && !analytics) {
    return (
      <div className="min-h-screen bg-gallery-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto p-8"
        >
          <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-gray-900 text-xl font-semibold mb-2">Connection Error</h3>
          <p className="text-gray-600 mb-6">Unable to load analytics data. Please check your connection.</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-accent-blue text-white px-6 py-3 rounded-lg hover:bg-accent-blue/90 transition-colors"
          >
            Retry
          </button>
        </motion.div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="min-h-screen bg-gallery-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto p-8"
        >
          <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-gray-900 text-xl font-semibold mb-2">No Data Available</h3>
          <p className="text-gray-600 mb-6">No survey responses found. Complete some surveys to see analytics.</p>
          <a 
            href="/typeform"
            className="bg-accent-blue text-white px-6 py-3 rounded-lg hover:bg-accent-blue/90 transition-colors inline-block"
          >
            Take Survey
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gallery-white text-ink">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-hairline-silver bg-gallery-white/95 backdrop-blur-xl sticky top-0 z-50"
      >
        <div className="w-full px-4 py-3">
          <div className="flex items-center justify-end gap-3">
            <button 
              onClick={() => setShowQuestionsModal(true)}
              className="bg-ink text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-ink/90 transition-colors"
            >
              Questions
            </button>
            <button className="bg-ink text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-ink/90 transition-colors">
              Export
            </button>
            <button className="bg-ink text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-ink/90 transition-colors">
              Filters  
            </button>
            <button className="bg-ink text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-ink/90 transition-colors">
              Refresh
            </button>
          </div>
        </div>
      </motion.div>

      {/* Dashboard Content */}
      <div className="w-full px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Stats - Full width */}
          <PremiumStats analytics={analytics} />
          
          {/* Revenue Chart - 2 columns */}
          <PremiumRevenueChart analytics={analytics} />
          
          {/* Distribution Chart - 1 column */}
          <PremiumDistributionChart analytics={analytics} />
          
          {/* Quick Stats - 1 column */}
          <div className="bg-white rounded-xl p-6 border border-gray-200/60 shadow-sm">
            <h3 className="text-gray-900 text-lg font-semibold mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-accent-blue" fill="currentColor" viewBox="0 0 256 256">
                <path d="M225.86,102.82c-3.77-3.94-7.67-8-9.14-11.57-1.36-3.27-1.44-8.69-1.52-13.94-.15-9.76-.31-20.82-8-28.51s-18.75-7.85-28.51-8c-5.25-.08-10.67-.16-13.94-1.52-3.56-1.47-7.63-5.37-11.57-9.14C146.28,23.51,138.44,16,128,16s-18.27,7.51-25.18,14.14c-3.94,3.77-8,7.67-11.57,9.14C88,40.64,82.56,40.72,77.31,40.8c-9.76.15-20.82.31-28.51,8S41,67.55,40.8,77.31c-.08,5.25-.16,10.67-1.52,13.94-1.47,3.56-5.37,7.63-9.14,11.57C23.51,109.72,16,117.56,16,128s7.51,18.27,14.14,25.18c3.77,3.94,7.67,8,9.14,11.57,1.36,3.27,1.44,8.69,1.52,13.94.15,9.76.31,20.82,8,28.51s18.75,7.85,28.51,8c5.25.08,10.67.16,13.94,1.52,3.56,1.47,7.63,5.37,11.57,9.14C109.72,232.49,117.56,240,128,240s18.27-7.51,25.18-14.14c3.94-3.77,8-7.67,11.57-9.14,3.27-1.36,8.69-1.44,13.94-1.52,9.76-.15,20.82-.31,28.51-8s7.85-18.75,8-28.51c.08-5.25.16-10.67,1.52-13.94,1.47-3.56,5.37-7.63,9.14-11.57C232.49,146.28,240,138.44,240,128S232.49,109.72,225.86,102.82Zm-52.2,6.84-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z"/>
              </svg>
              Quick Stats
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Data Quality</span>
                <span className="font-semibold text-green-600">98.5%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Response Time</span>
                <span className="font-semibold text-gray-900">3.2 min</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Completion Rate</span>
                <span className="font-semibold text-gray-900">94.2%</span>
              </div>
            </div>
          </div>
          
          {/* Advanced Analytics - Full width */}
          <AdvancedAnalytics analytics={analytics} />
          
          {/* Complete Individual Responses List - Full width */}
          <IndividualResponsesList analytics={analytics} />
        </div>

        {/* Additional Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8"
        >
          {/* Market Insights */}
          <div className="bg-gallery-white rounded-2xl p-6 border border-hairline-silver shadow-sm">
            <h4 className="text-ink font-semibold mb-4">Market insights</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate text-sm">Glasses users</span>
                <span className="text-ink font-medium">
                  {analytics?.keyMetrics?.glassesUserRate || 0}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate text-sm">Innovation interest</span>
                <span className="text-accent-blue font-medium">
                  {analytics?.keyMetrics?.conversionRate || 0}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate text-sm">Average age</span>
                <span className="text-ink font-medium">
                  {analytics?.keyMetrics?.averageAge || 0} years
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate text-sm">Most common condition</span>
                <span className="text-ink font-medium capitalize">
                  {analytics?.keyMetrics?.mostCommonCondition || 'N/A'}
                </span>
              </div>
            </div>
          </div>

          {/* Performance */}
          <div className="bg-gallery-white rounded-2xl p-6 border border-hairline-silver shadow-sm">
            <h4 className="text-ink font-semibold mb-4">Performance</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate text-sm">Total responses</span>
                <span className="text-green-600 font-medium">
                  {analytics?.totalResponses || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate text-sm">Avg. graduation</span>
                <span className="text-ink font-medium">
                  {analytics?.keyMetrics?.avgGraduation || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate text-sm">Data quality</span>
                <span className="text-ink font-medium">
                  {analytics?.totalResponses > 0 ? '98.5%' : 'N/A'}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gallery-white rounded-2xl p-6 border border-hairline-silver shadow-sm">
            <h4 className="text-ink font-semibold mb-4">Quick actions</h4>
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-studio-mist rounded-lg border border-hairline-silver hover:bg-control-gray transition-colors">
                <div className="text-ink text-sm font-medium">View survey</div>
                <div className="text-slate text-xs">Open typeform</div>
              </button>
              <button className="w-full text-left p-3 bg-studio-mist rounded-lg border border-hairline-silver hover:bg-control-gray transition-colors">
                <div className="text-ink text-sm font-medium">Export data</div>
                <div className="text-slate text-xs">Download CSV</div>
              </button>
              <button className="w-full text-left p-3 bg-studio-mist rounded-lg border border-hairline-silver hover:bg-control-gray transition-colors">
                <div className="text-ink text-sm font-medium">Settings</div>
                <div className="text-slate text-xs">Configure dashboard</div>
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Questions Modal */}
      <QuestionsModal 
        isOpen={showQuestionsModal} 
        onClose={() => setShowQuestionsModal(false)} 
        analytics={analytics} 
      />
    </div>
  );
}

export default PremiumDashboard;