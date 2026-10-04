'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface ExportFilters {
  dateFrom: string;
  dateTo: string;
  ageGroup: string;
  marketSegment: string;
  visionProfile: string;
  usesGlasses: string;
  interestLevel: string;
}

const initialFilters: ExportFilters = {
  dateFrom: '',
  dateTo: '',
  ageGroup: 'all',
  marketSegment: 'all',
  visionProfile: 'all',
  usesGlasses: 'all',
  interestLevel: 'all'
};

export default function ExportSystem() {
  const [filters, setFilters] = useState<ExportFilters>(initialFilters);
  const [loading, setLoading] = useState(false);
  const [exportFormat, setExportFormat] = useState<'json' | 'csv'>('csv');
  const [showFilters, setShowFilters] = useState(false);

  // Handle filter changes
  const updateFilter = (key: keyof ExportFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Handle export
  const handleExport = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/typeform/responses', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'authorization': 'admin' // Basic auth for now
        },
        body: JSON.stringify({
          format: exportFormat,
          filters: filters
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to export data');
      }

      if (exportFormat === 'csv') {
        // Handle CSV download
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `welens_survey_export_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } else {
        // Handle JSON download
        const data = await response.json();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `welens_survey_export_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }

    } catch (error) {
      console.error('Export error:', error);
      alert('Error al exportar datos. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters(initialFilters);
  };

  // Get active filter count
  const activeFilterCount = Object.entries(filters).filter(([key, value]) => 
    value && value !== 'all' && value !== ''
  ).length;

  return (
    <div className="bg-white rounded-2xl p-6 border border-hairline-silver">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-semibold text-ink mb-2">Exportar Datos</h3>
          <p className="text-slate">Descarga los datos de las encuestas con filtros personalizados</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors ${
              showFilters 
                ? 'bg-accent-blue text-white' 
                : 'bg-studio-mist text-ink hover:bg-control-gray'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filtros {activeFilterCount > 0 && <span className="bg-white text-accent-blue rounded-full px-2 py-0.5 text-xs font-bold">{activeFilterCount}</span>}
          </button>
        </div>
      </div>

      {/* Format Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-ink mb-2">Formato de exportación</label>
        <div className="flex gap-3">
          <button
            onClick={() => setExportFormat('csv')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors ${
              exportFormat === 'csv' 
                ? 'bg-green-500 text-white' 
                : 'bg-studio-mist text-ink hover:bg-control-gray'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            CSV (Excel)
          </button>
          <button
            onClick={() => setExportFormat('json')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors ${
              exportFormat === 'json' 
                ? 'bg-blue-500 text-white' 
                : 'bg-studio-mist text-ink hover:bg-control-gray'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            JSON (Desarrolladores)
          </button>
        </div>
        <p className="text-xs text-slate mt-2">
          {exportFormat === 'csv' 
            ? 'Perfecto para análisis en Excel o Google Sheets' 
            : 'Formato estructurado para desarrolladores e integraciones'
          }
        </p>
      </div>

      {/* Filters Section */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: showFilters ? 'auto' : 0, 
          opacity: showFilters ? 1 : 0 
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="border-t border-hairline-silver pt-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-semibold text-ink">Filtros Avanzados</h4>
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Limpiar filtros
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-ink mb-2">Fecha desde</label>
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => updateFilter('dateFrom', e.target.value)}
                className="w-full px-3 py-2 border border-hairline-silver rounded-xl focus:border-accent-blue focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-ink mb-2">Fecha hasta</label>
              <input
                type="date"
                value={filters.dateTo}
                onChange={(e) => updateFilter('dateTo', e.target.value)}
                className="w-full px-3 py-2 border border-hairline-silver rounded-xl focus:border-accent-blue focus:outline-none"
              />
            </div>

            {/* Age Group */}
            <div>
              <label className="block text-sm font-medium text-ink mb-2">Grupo etario</label>
              <select
                value={filters.ageGroup}
                onChange={(e) => updateFilter('ageGroup', e.target.value)}
                className="w-full px-3 py-2 border border-hairline-silver rounded-xl focus:border-accent-blue focus:outline-none"
              >
                <option value="all">Todos los grupos</option>
                <option value="18-25">18-25 años</option>
                <option value="26-35">26-35 años</option>
                <option value="36-45">36-45 años</option>
                <option value="46-55">46-55 años</option>
                <option value="56+">56+ años</option>
              </select>
            </div>

            {/* Market Segment */}
            <div>
              <label className="block text-sm font-medium text-ink mb-2">Segmento de mercado</label>
              <select
                value={filters.marketSegment}
                onChange={(e) => updateFilter('marketSegment', e.target.value)}
                className="w-full px-3 py-2 border border-hairline-silver rounded-xl focus:border-accent-blue focus:outline-none"
              >
                <option value="all">Todos los segmentos</option>
                <option value="tech_professional">Profesional Tech</option>
                <option value="student">Estudiante</option>
                <option value="fashion_conscious">Fashion-Conscious</option>
                <option value="vision_focused">Enfocado en visión</option>
                <option value="price_sensitive">Sensible al precio</option>
                <option value="lifestyle_active">Estilo de vida activo</option>
              </select>
            </div>

            {/* Vision Profile */}
            <div>
              <label className="block text-sm font-medium text-ink mb-2">Perfil visual</label>
              <select
                value={filters.visionProfile}
                onChange={(e) => updateFilter('visionProfile', e.target.value)}
                className="w-full px-3 py-2 border border-hairline-silver rounded-xl focus:border-accent-blue focus:outline-none"
              >
                <option value="all">Todos los perfiles</option>
                <option value="no_glasses">Sin lentes</option>
                <option value="light_prescription">Graduación ligera</option>
                <option value="moderate_prescription">Graduación moderada</option>
                <option value="strong_prescription">Graduación fuerte</option>
                <option value="multiple_conditions">Múltiples condiciones</option>
              </select>
            </div>

            {/* Uses Glasses */}
            <div>
              <label className="block text-sm font-medium text-ink mb-2">Uso de lentes</label>
              <select
                value={filters.usesGlasses}
                onChange={(e) => updateFilter('usesGlasses', e.target.value)}
                className="w-full px-3 py-2 border border-hairline-silver rounded-xl focus:border-accent-blue focus:outline-none"
              >
                <option value="all">Todos</option>
                <option value="true">Usa lentes</option>
                <option value="false">No usa lentes</option>
              </select>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Export Button */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate">
          {activeFilterCount > 0 ? `${activeFilterCount} filtros aplicados` : 'Sin filtros - exportará todos los datos'}
        </div>
        
        <button
          onClick={handleExport}
          disabled={loading}
          className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-accent-blue to-pricing-blue text-white font-semibold rounded-2xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Exportando...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Exportar {exportFormat.toUpperCase()}
            </>
          )}
        </button>
      </div>

      {/* Export Info */}
      <div className="mt-4 p-4 bg-studio-mist rounded-xl">
        <p className="text-sm text-slate">
          <strong>Incluye:</strong> Todas las respuestas, metadatos analíticos, timestamps, segmentación automática y análisis de comportamiento.
          {exportFormat === 'csv' && ' Los arrays se separan con punto y coma.'}
        </p>
      </div>
    </div>
  );
}