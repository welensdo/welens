'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SurveyResponse {
  _id: string;
  responseId: string;
  submittedAt: string;
  age: number | null;
  ageGroup: string;
  usesGlasses: boolean | null;
  visionConditions: string[];
  customerPersona: string;
  marketSegment: string;
  interestInRemovableGraduation: string[];
  prescriptionStrength: number | null;
}

export default function RealTimeResponses() {
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [newResponseCount, setNewResponseCount] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch responses
  const fetchResponses = async (pageNum = 1, append = false) => {
    try {
      const response = await fetch(`/api/typeform/responses?page=${pageNum}&limit=20&sortBy=submittedAt&sortOrder=desc`, {
        headers: { 'authorization': 'admin' }
      });
      
      if (!response.ok) throw new Error('Failed to fetch');
      
      const data = await response.json();
      
      if (append) {
        setResponses(prev => [...prev, ...data.responses]);
      } else {
        setResponses(data.responses);
        if (pageNum === 1 && responses.length > 0) {
          // Check for new responses
          const newCount = data.responses.filter((r: any) => 
            !responses.some(existing => existing._id === r._id)
          ).length;
          if (newCount > 0) setNewResponseCount(prev => prev + newCount);
        }
      }
      
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.error('Error fetching responses:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchResponses();
  }, []);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchResponses(1, false);
    }, 30000);

    return () => clearInterval(interval);
  }, [responses]);

  // Load more responses
  const loadMore = () => {
    if (page < totalPages) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchResponses(nextPage, true);
    }
  };

  // Mark new responses as seen
  const markAsSeen = () => {
    setNewResponseCount(0);
  };

  // Format labels
  const formatLabel = (key: string, type: 'vision' | 'interest' | 'persona' | 'segment') => {
    const labels: Record<string, Record<string, string>> = {
      vision: {
        'myopia': 'Miopía',
        'hyperopia': 'Hipermetropía', 
        'astigmatism': 'Astigmatismo',
        'presbyopia': 'Presbicia',
        'other': 'Otra',
        'none': 'Ninguna'
      },
      interest: {
        'very_interested': 'Muy interesado',
        'interested': 'Interesado',
        'maybe': 'Tal vez',
        'not_sure': 'No está seguro',
        'not_interested': 'No interesado'
      },
      persona: {
        'young_professional': 'Profesional joven',
        'tech_worker': 'Trabajador tech',
        'fashion_enthusiast': 'Entusiasta de la moda',
        'practical_user': 'Usuario práctico',
        'vision_dependent': 'Dependiente de visión',
        'lifestyle_switcher': 'Cambiador de estilo',
        'price_conscious': 'Consciente del precio',
        'innovation_seeker': 'Buscador de innovación',
        'unknown': 'Desconocido'
      },
      segment: {
        'tech_professional': 'Profesional Tech',
        'student': 'Estudiante',
        'fashion_conscious': 'Fashion-Conscious',
        'vision_focused': 'Enfocado en visión',
        'price_sensitive': 'Sensible al precio',
        'lifestyle_active': 'Estilo de vida activo',
        'mixed': 'Mixto'
      }
    };
    
    return labels[type]?.[key] || key;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-accent-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate">Cargando respuestas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold text-ink mb-2 flex items-center gap-3">
            <span className="text-2xl">⚡</span>
            Respuestas en Tiempo Real
            {newResponseCount > 0 && (
              <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                +{newResponseCount}
              </span>
            )}
          </h3>
          <p className="text-slate">Últimas respuestas de la encuesta • Actualización automática cada 30s</p>
        </div>
        
        <div className="flex gap-2">
          {newResponseCount > 0 && (
            <button
              onClick={markAsSeen}
              className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors text-sm"
            >
              Marcar como visto
            </button>
          )}
          <button
            onClick={() => fetchResponses(1, false)}
            className="px-4 py-2 bg-accent-blue text-white rounded-xl hover:bg-accent-blue/90 transition-colors text-sm"
          >
            Actualizar
          </button>
        </div>
      </div>

      {/* Responses Grid */}
      {responses.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-studio-mist rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-slate" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-ink mb-2">No hay respuestas aún</h3>
          <p className="text-slate">Las respuestas de la encuesta aparecerán aquí en tiempo real.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {responses.map((response, index) => (
              <motion.div
                key={response._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-hairline-silver shadow-sm hover:shadow-md transition-all"
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="text-xs font-mono text-slate">
                    #{response.responseId.split('_').pop()?.slice(0, 8)}
                  </div>
                  <div className="text-xs text-slate">
                    {new Date(response.submittedAt).toLocaleString('es-MX')}
                  </div>
                </div>

                {/* Demographics */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate">Edad:</span>
                    <span className="text-sm font-medium text-ink">
                      {response.age ? `${response.age} años` : response.ageGroup || 'No especificado'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate">Lentes:</span>
                    <span className={`text-sm font-medium ${response.usesGlasses ? 'text-green-600' : 'text-red-600'}`}>
                      {response.usesGlasses === true ? 'Sí usa' : response.usesGlasses === false ? 'No usa' : 'No especificado'}
                    </span>
                  </div>

                  {response.prescriptionStrength !== null && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate">Graduación:</span>
                      <span className="text-sm font-medium text-ink">
                        {response.prescriptionStrength === 0 ? 'Sin graduación' : `±${response.prescriptionStrength}`}
                      </span>
                    </div>
                  )}

                  {response.visionConditions && response.visionConditions.length > 0 && (
                    <div>
                      <span className="text-sm text-slate">Condiciones:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {response.visionConditions.slice(0, 2).map((condition) => (
                          <span key={condition} className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                            {formatLabel(condition, 'vision')}
                          </span>
                        ))}
                        {response.visionConditions.length > 2 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{response.visionConditions.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Interest Level */}
                  {response.interestInRemovableGraduation && response.interestInRemovableGraduation.length > 0 && (
                    <div>
                      <span className="text-sm text-slate">Interés:</span>
                      <div className="mt-1">
                        {response.interestInRemovableGraduation.map((interest) => (
                          <span 
                            key={interest} 
                            className={`inline-block px-2 py-1 text-xs rounded-full ${
                              interest === 'very_interested' ? 'bg-green-100 text-green-700' :
                              interest === 'interested' ? 'bg-blue-100 text-blue-700' :
                              interest === 'maybe' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {formatLabel(interest, 'interest')}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Segmentation */}
                  <div className="pt-3 border-t border-hairline-silver">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate">Segmento:</span>
                      <span className="font-medium text-accent-blue">
                        {formatLabel(response.marketSegment, 'segment')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs mt-1">
                      <span className="text-slate">Persona:</span>
                      <span className="font-medium text-pricing-blue">
                        {formatLabel(response.customerPersona, 'persona')}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Load More Button */}
      {page < totalPages && (
        <div className="text-center">
          <button
            onClick={loadMore}
            className="px-6 py-3 bg-studio-mist hover:bg-control-gray text-ink font-medium rounded-2xl transition-colors"
          >
            Cargar más respuestas ({responses.length} de {totalPages * 20})
          </button>
        </div>
      )}
    </div>
  );
}