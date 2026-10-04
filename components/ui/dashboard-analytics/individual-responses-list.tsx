'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IndividualResponsesListProps {
  analytics?: any;
}

interface ResponseDetailsModalProps {
  response: any;
  isOpen: boolean;
  onClose: () => void;
}

function ResponseDetailsModal({ response, isOpen, onClose }: ResponseDetailsModalProps) {
  if (!isOpen || !response) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Response Details</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Submitted {new Date(response.submittedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Personal Info */}
            <div className="bg-accent-blue/5 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <span className="w-2 h-2 bg-accent-blue rounded-full mr-2"></span>
                Personal Information
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">Name</label>
                  <div className="font-medium text-gray-900">
                    {response.firstName && response.lastName 
                      ? `${response.firstName} ${response.lastName}`
                      : 'Not provided'
                    }
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Age</label>
                  <div className="font-medium text-gray-900">
                    {response.age ? `${response.age} years` : 'Not provided'}
                  </div>
                </div>
              </div>
              
              {/* Social Media */}
              {response.socialMedia && (
                <div className="mt-4 pt-4 border-t border-accent-blue/20">
                  <label className="text-sm text-gray-600">Social Media</label>
                  <div className="font-medium text-accent-blue">
                    {typeof response.socialMedia === 'object' && response.socialMedia.platform ? (
                      <div>
                        <span className="capitalize">{response.socialMedia.platform}:</span>{' '}
                        <span className="text-ink">@{response.socialMedia.handle}</span>
                      </div>
                    ) : (
                      <span className="text-ink">{response.socialMedia}</span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Vision Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Vision Information
              </h4>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">Uses Glasses</label>
                    <div className="font-medium text-gray-900">
                      {response.usesGlasses ? 'Yes' : 'No'}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Prescription Strength</label>
                    <div className="font-medium text-gray-900">
                      {response.prescriptionStrength ? 
                        `${response.prescriptionStrength > 0 ? '+' : ''}${response.prescriptionStrength}` : 
                        'Not specified'}
                    </div>
                  </div>
                </div>
                
                {response.glassesType && response.glassesType.length > 0 && (
                  <div>
                    <label className="text-sm text-gray-600">Types of Glasses</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {response.glassesType.map((type: string, index: number) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm capitalize">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {response.visionConditions && response.visionConditions.length > 0 && (
                  <div>
                    <label className="text-sm text-gray-600">Vision Conditions</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {response.visionConditions.map((condition: string, index: number) => (
                        <span key={index} className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm capitalize">
                          {condition}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Behavior & Preferences */}
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Behavior & Preferences
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-600">Stopped Using Glasses</label>
                  <div className="font-medium text-gray-900">
                    {response.stoppedUsingGlasses ? 'Yes' : 'No'}
                  </div>
                </div>

                {/* Glasses Usage Frequency */}
                {response.glassesUsageFrequency && (
                  <div>
                    <label className="text-sm text-gray-600">Glasses Usage Frequency</label>
                    <div className="font-medium text-gray-900 capitalize">
                      {(() => {
                        const frequency = Array.isArray(response.glassesUsageFrequency) 
                          ? response.glassesUsageFrequency[0] 
                          : response.glassesUsageFrequency;
                        
                        switch(frequency) {
                          case 'always': return 'Always';
                          case 'frequently': return 'Frequently';
                          case 'sometimes': return 'Sometimes';
                          case 'rarely': return 'Rarely';
                          case 'never': return 'Never';
                          default: return frequency;
                        }
                      })()}
                    </div>
                  </div>
                )}

                {/* Reasons for Stopping */}
                {response.reasonsForStopping && response.reasonsForStopping.length > 0 && (
                  <div>
                    <label className="text-sm text-gray-600">Reasons for Stopping Glasses Use</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {response.reasonsForStopping.map((reason: string, index: number) => (
                        <span key={index} className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm capitalize">
                          {reason.replace(/_/g, ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div>
                  <label className="text-sm text-gray-600">Interest in Innovation</label>
                  <div className="font-medium text-gray-900 capitalize">
                    {(() => {
                      const interest = Array.isArray(response.interestInRemovableGraduation) 
                        ? response.interestInRemovableGraduation[0] 
                        : response.interestInRemovableGraduation;
                      
                      switch(interest) {
                        case 'very_interested': return 'Very Interested';
                        case 'interested': return 'Interested';
                        case 'maybe': return 'Maybe';
                        case 'not_sure': return 'Not Sure';
                        case 'not_interested': return 'Not Interested';
                        default: return 'Not specified';
                      }
                    })()}
                  </div>
                </div>
                
                {response.interestInRemovableGraduation && Array.isArray(response.interestInRemovableGraduation) && response.interestInRemovableGraduation.length > 1 && (
                  <div>
                    <label className="text-sm text-gray-600">Interest in Removable Graduation</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {response.interestInRemovableGraduation.map((interest: string, index: number) => (
                        <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm capitalize">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Lifestyle Information */}
            {response.lifestyleFactors && response.lifestyleFactors.length > 0 && (
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  Lifestyle Factors
                </h4>
                <div className="flex flex-wrap gap-2">
                  {response.lifestyleFactors.map((factor: string, index: number) => (
                    <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm capitalize">
                      {factor.replace(/_/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Technical Data */}
            <div className="bg-gray-100 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <span className="w-2 h-2 bg-gray-500 rounded-full mr-2"></span>
                Technical Information
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="text-gray-600">Response ID</label>
                  <div className="font-mono text-gray-900 text-xs">{response._id}</div>
                </div>
                <div>
                  <label className="text-gray-600">Submitted At</label>
                  <div className="font-mono text-gray-900 text-xs">
                    {new Date(response.submittedAt).toISOString()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 rounded-b-2xl">
            <div className="flex justify-between">
              <button
                onClick={() => {
                  // Crear modal con TODAS las respuestas detalladas
                  const detailsWindow = window.open('', '_blank', 'width=800,height=600');
                  if (detailsWindow) {
                    detailsWindow.document.write(`
                      <html>
                        <head>
                          <title>Respuesta Completa - ${response.firstName || 'Usuario'}</title>
                          <style>
                            body { 
                              font-family: Arial, sans-serif; 
                              padding: 20px; 
                              line-height: 1.6;
                              background-color: #f8f9fa;
                            }
                            .container {
                              max-width: 800px;
                              margin: 0 auto;
                              background: white;
                              padding: 30px;
                              border-radius: 10px;
                              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                            }
                            h1 { color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 10px; }
                            h2 { color: #34495e; margin-top: 30px; border-left: 4px solid #3498db; padding-left: 15px; }
                            .field { margin: 10px 0; }
                            .label { font-weight: bold; color: #555; }
                            .value { margin-left: 10px; color: #333; }
                            .tags { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 5px; }
                            .tag { 
                              background: #e3f2fd; 
                              color: #1565c0; 
                              padding: 3px 8px; 
                              border-radius: 15px; 
                              font-size: 12px;
                              text-transform: capitalize;
                            }
                            .highlight { background-color: #fff3cd; padding: 10px; border-radius: 5px; margin: 10px 0; }
                          </style>
                        </head>
                        <body>
                          <div class="container">
                            <h1>📋 Respuesta Detallada de Encuesta WeLens</h1>
                            
                            <h2>👤 Información Personal</h2>
                            <div class="field">
                              <span class="label">Nombre:</span>
                              <span class="value">${response.firstName || 'No especificado'} ${response.lastName || ''}</span>
                            </div>
                            <div class="field">
                              <span class="label">Edad:</span>
                              <span class="value">${response.age || 'No especificada'} años</span>
                            </div>
                            ${response.socialMedia ? `
                            <div class="field">
                              <span class="label">Redes Sociales:</span>
                              <span class="value">${response.socialMedia.platform || 'N/A'} - @${response.socialMedia.handle || 'N/A'}</span>
                            </div>` : ''}
                            
                            <h2>👓 Uso de Lentes</h2>
                            <div class="field">
                              <span class="label">¿Usa lentes actualmente?:</span>
                              <span class="value">${response.usesGlasses ? 'Sí' : 'No'}</span>
                            </div>
                            ${response.glassesUsageFrequency ? `
                            <div class="field">
                              <span class="label">Frecuencia de uso:</span>
                              <span class="value">${(() => {
                                const freq = Array.isArray(response.glassesUsageFrequency) 
                                  ? response.glassesUsageFrequency[0] 
                                  : response.glassesUsageFrequency;
                                switch(freq) {
                                  case 'always': return 'Siempre';
                                  case 'frequently': return 'Frecuentemente';
                                  case 'sometimes': return 'A veces';
                                  case 'rarely': return 'Raramente';
                                  case 'never': return 'Nunca';
                                  default: return freq;
                                }
                              })()}</span>
                            </div>` : ''}
                            ${response.glassesType && response.glassesType.length > 0 ? `
                            <div class="field">
                              <span class="label">Tipos de lentes:</span>
                              <div class="tags">
                                ${response.glassesType.map((type: string) => 
                                  `<span class="tag">${type.replace(/_/g, ' ')}</span>`
                                ).join('')}
                              </div>
                            </div>` : ''}
                            
                            <h2>👁️ Condiciones de Visión</h2>
                            ${response.visionConditions && response.visionConditions.length > 0 ? `
                            <div class="field">
                              <span class="label">Condiciones:</span>
                              <div class="tags">
                                ${response.visionConditions.map((condition: string) => 
                                  `<span class="tag" style="background: #ffebee; color: #c62828;">${condition.replace(/_/g, ' ')}</span>`
                                ).join('')}
                              </div>
                            </div>` : ''}
                            <div class="field">
                              <span class="label">Graduación:</span>
                              <span class="value">${response.prescriptionStrength ? 
                                `${response.prescriptionStrength > 0 ? '+' : ''}${response.prescriptionStrength}` : 
                                'No especificada'}</span>
                            </div>
                            
                            <h2>🔄 Experiencia con Lentes</h2>
                            <div class="field">
                              <span class="label">¿Dejó de usar lentes?:</span>
                              <span class="value">${response.stoppedUsingGlasses ? 'Sí' : 'No'}</span>
                            </div>
                            ${response.reasonsForStopping && response.reasonsForStopping.length > 0 ? `
                            <div class="field">
                              <span class="label">Razones para dejar de usar lentes:</span>
                              <div class="tags">
                                ${response.reasonsForStopping.map((reason: string) => 
                                  `<span class="tag" style="background: #fff3e0; color: #ef6c00;">${reason.replace(/_/g, ' ')}</span>`
                                ).join('')}
                              </div>
                            </div>` : ''}
                            
                            <h2>💡 Interés en Innovación</h2>
                            <div class="field">
                              <span class="label">Interés en graduación removible:</span>
                              <span class="value">${(() => {
                                const interest = Array.isArray(response.interestInRemovableGraduation) 
                                  ? response.interestInRemovableGraduation[0] 
                                  : response.interestInRemovableGraduation;
                                switch(interest) {
                                  case 'very_interested': return 'Muy interesado';
                                  case 'interested': return 'Interesado';
                                  case 'maybe': return 'Tal vez';
                                  case 'not_sure': return 'No estoy seguro';
                                  case 'not_interested': return 'No interesado';
                                  default: return interest || 'No especificado';
                                }
                              })()}</span>
                            </div>
                            
                            ${response.lifestyleFactors && response.lifestyleFactors.length > 0 ? `
                            <h2>🏃‍♂️ Factores de Estilo de Vida</h2>
                            <div class="field">
                              <div class="tags">
                                ${response.lifestyleFactors.map((factor: string) => 
                                  `<span class="tag" style="background: #f3e5f5; color: #7b1fa2;">${factor.replace(/_/g, ' ')}</span>`
                                ).join('')}
                              </div>
                            </div>` : ''}
                            
                            <div class="highlight">
                              <h2>📊 Información Técnica</h2>
                              <div class="field">
                                <span class="label">ID de Respuesta:</span>
                                <span class="value" style="font-family: monospace; font-size: 12px;">${response._id}</span>
                              </div>
                              <div class="field">
                                <span class="label">Fecha de envío:</span>
                                <span class="value">${new Date(response.submittedAt).toLocaleDateString('es-ES', {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}</span>
                              </div>
                            </div>
                          </div>
                        </body>
                      </html>
                    `);
                    detailsWindow.document.close();
                  }
                }}
                className="px-4 py-2 bg-accent-blue text-white rounded-lg hover:bg-accent-blue/90 transition-colors"
              >
                Detallar más
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export function IndividualResponsesList({ analytics }: IndividualResponsesListProps) {
  const [responses, setResponses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedResponse, setSelectedResponse] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const responsesPerPage = 10;

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const response = await fetch('/api/typeform/responses');
        if (!response.ok) {
          console.error('Response not OK:', response.status);
          setResponses([]);
          return;
        }
        const data = await response.json();
        setResponses(data);
      } catch (error) {
        console.error('Error fetching responses:', error);
        setResponses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, []);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getInitials = (firstName?: string, lastName?: string) => {
    if (!firstName && !lastName) return 'AN';
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  const getStatusColor = (response: any) => {
    if (response.visionConditions?.includes('none')) return 'bg-green-500';
    if (response.usesGlasses) return 'bg-accent-blue';
    return 'bg-amber-500';
  };

  const getStatusText = (response: any) => {
    if (response.visionConditions?.includes('none')) return 'No conditions';
    if (response.usesGlasses) return 'Uses glasses';
    return 'Vision needs';
  };

  const totalPages = Math.ceil(responses.length / responsesPerPage);
  const startIndex = (currentPage - 1) * responsesPerPage;
  const currentResponses = responses.slice(startIndex, startIndex + responsesPerPage);

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 border border-gray-200/60 shadow-sm col-span-full">
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-2 border-gray-200 border-t-accent-blue rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 border border-gray-200/60 shadow-sm col-span-full"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-gray-900 text-xl font-semibold">Individual Survey Responses</h3>
            <p className="text-gray-600 text-sm mt-1">
              Complete list of all survey submissions with detailed view
            </p>
          </div>
          <div className="text-sm text-gray-500">
            {responses.length} total responses
          </div>
        </div>

        {responses.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-gray-900 font-medium mb-2">No responses yet</h3>
            <p className="text-gray-600 mb-4">No survey responses found. Responses will appear here once submitted.</p>
            <a 
              href="/typeform"
              className="bg-accent-blue text-white px-4 py-2 rounded-lg hover:bg-accent-blue/90 transition-colors"
            >
              Take Survey
            </a>
          </div>
        ) : (
          <>
            {/* Responses List */}
            <div className="space-y-3">
              <AnimatePresence>
                {currentResponses.map((response, index) => (
                  <motion.div
                    key={response._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    className="group flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-200 hover:border-accent-blue/30 hover:bg-accent-blue/5 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-accent-blue to-blue-600 rounded-xl flex items-center justify-center">
                          <span className="text-white text-sm font-semibold">
                            {getInitials(response.firstName, response.lastName)}
                          </span>
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(response)} rounded-full border-2 border-white`} />
                      </div>

                      {/* Info */}
                      <div>
                        <div className="font-semibold text-gray-900">
                          {response.firstName && response.lastName 
                            ? `${response.firstName} ${response.lastName}`
                            : 'Anonymous User'
                          }
                          {response.socialMedia && (
                            <span className="ml-2 text-xs text-accent-blue">📱</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-gray-600 text-sm">{getStatusText(response)}</span>
                          {response.age && (
                            <>
                              <div className="w-1 h-1 bg-gray-400 rounded-full" />
                              <span className="text-gray-600 text-sm">{response.age}y</span>
                            </>
                          )}
                          {response.visionConditions && response.visionConditions.length > 0 && (
                            <>
                              <div className="w-1 h-1 bg-gray-400 rounded-full" />
                              <span className="text-gray-600 text-sm capitalize">
                                {response.visionConditions[0]}
                                {response.visionConditions.length > 1 && ` +${response.visionConditions.length - 1}`}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                      <div className="text-gray-500 text-sm">
                        {formatDate(response.submittedAt)}
                      </div>
                      <button
                        onClick={() => setSelectedResponse(response)}
                        className="bg-accent-blue text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent-blue/90 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        View Details
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </motion.div>

      {/* Modal */}
      <ResponseDetailsModal
        response={selectedResponse}
        isOpen={!!selectedResponse}
        onClose={() => setSelectedResponse(null)}
      />
    </>
  );
}