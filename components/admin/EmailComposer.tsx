'use client';

import { useState } from 'react';
import { Send, Mail, User, FileText, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { EMAIL_ALIASES } from '@/lib/resend';

export default function EmailComposer() {
  const [formData, setFormData] = useState({
    to: '',
    from: 'shipping@welens.org',
    subject: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const emailAliases = [
    { value: 'shipping@welens.org', label: '📦 Envíos (shipping@welens.org)', description: 'Para notificaciones de pedidos y envíos' },
    { value: 'soporte@welens.org', label: '🛟 Soporte (soporte@welens.org)', description: 'Para atención al cliente' },
    { value: 'support@welens.org', label: '💬 Support (support@welens.org)', description: 'Para soporte técnico en inglés' },
    { value: 'hola@welens.org', label: '👋 Hola (hola@welens.org)', description: 'Para mensajes generales y bienvenida' },
    { value: 'data@welens.org', label: '📊 Data (data@welens.org)', description: 'Para notificaciones del sistema' },
    { value: 'legal@welens.org', label: '⚖️ Legal (legal@welens.org)', description: 'Para asuntos legales' },
    { value: 'privacy@welens.org', label: '🔒 Privacy (privacy@welens.org)', description: 'Para temas de privacidad' },
    { value: 'careers@welens.org', label: '💼 Careers (careers@welens.org)', description: 'Para recursos humanos' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('idle');

    try {
      const response = await fetch('/api/admin/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setStatusMessage('¡Correo enviado exitosamente! 🎉');
        setFormData({
          to: '',
          from: 'shipping@welens.org',
          subject: '',
          message: '',
        });
      } else {
        const error = await response.text();
        setStatus('error');
        setStatusMessage(`Error al enviar: ${error}`);
      }
    } catch (error) {
      setStatus('error');
      setStatusMessage('Error de conexión. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Composer de Correos</h1>
            <p className="text-gray-600">Envía correos personalizados desde cualquier alias de WeLens</p>
          </div>
        </div>

        {/* Status Messages */}
        {status !== 'idle' && (
          <div className={`p-4 rounded-xl flex items-center gap-3 ${
            status === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-700' 
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}>
            {status === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <p className="font-medium">{statusMessage}</p>
          </div>
        )}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Recipient */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <label className="flex items-center gap-3 text-lg font-semibold text-gray-900 mb-4">
            <User className="w-5 h-5 text-blue-600" />
            Destinatario
          </label>
          <input
            type="email"
            name="to"
            value={formData.to}
            onChange={handleInputChange}
            placeholder="correo@ejemplo.com"
            required
            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
          />
          <p className="mt-2 text-sm text-gray-500">Ingresa el correo electrónico del destinatario</p>
        </div>

        {/* From Alias */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <label className="flex items-center gap-3 text-lg font-semibold text-gray-900 mb-4">
            <Mail className="w-5 h-5 text-purple-600" />
            Enviar desde (Alias)
          </label>
          <select
            name="from"
            value={formData.from}
            onChange={handleInputChange}
            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-lg bg-white"
          >
            {emailAliases.map((alias) => (
              <option key={alias.value} value={alias.value}>
                {alias.label}
              </option>
            ))}
          </select>
          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              {emailAliases.find(a => a.value === formData.from)?.description}
            </p>
          </div>
        </div>

        {/* Subject */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <label className="flex items-center gap-3 text-lg font-semibold text-gray-900 mb-4">
            <FileText className="w-5 h-5 text-green-600" />
            Asunto
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            placeholder="Asunto del correo..."
            required
            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-lg"
          />
          <p className="mt-2 text-sm text-gray-500">Un asunto claro ayuda al destinatario a entender el propósito</p>
        </div>

        {/* Message */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <label className="flex items-center gap-3 text-lg font-semibold text-gray-900 mb-4">
            <FileText className="w-5 h-5 text-orange-600" />
            Mensaje
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Escribe tu mensaje aquí...&#10;&#10;Este correo se enviará con el diseño premium de WeLens, incluyendo gradientes, iconos y el estilo de clase mundial que caracteriza a nuestra marca."
            required
            rows={12}
            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-lg resize-y min-h-[300px]"
          />
          <div className="mt-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-700">
              <strong>✨ Diseño automático:</strong> Tu mensaje se enviará con la plantilla premium de WeLens, 
              incluyendo nuestro logo, gradientes elegantes, iconos y el diseño de clase mundial.
            </p>
          </div>
        </div>

        {/* Send Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-300 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
            {isLoading ? 'Enviando...' : 'Enviar Correo'}
          </button>
        </div>
      </form>

      {/* Info Cards */}
      <div className="mt-12 grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
            🎨 Diseño Premium
          </h3>
          <p className="text-blue-700 text-sm leading-relaxed">
            Todos los correos enviados desde aquí utilizan automáticamente el diseño premium de WeLens 
            con gradientes, iconos, animaciones y la estética de clase mundial.
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
          <h3 className="text-lg font-semibold text-green-900 mb-3 flex items-center gap-2">
            📧 Aliases Verificados
          </h3>
          <p className="text-green-700 text-sm leading-relaxed">
            Todos los aliases están configurados y verificados. Elige el más apropiado según 
            el tipo de comunicación que vayas a enviar.
          </p>
        </div>
      </div>
    </div>
  );
}