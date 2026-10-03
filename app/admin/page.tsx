'use client';

import { useState } from 'react';
import { Mail, Settings, Users, Package, BarChart } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import EmailComposer from '@/components/admin/EmailComposer';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('email');

  const renderContent = () => {
    switch (activeTab) {
      case 'email':
        return <EmailComposer />;
      case 'orders':
        return <div className="p-8">
          <h2 className="text-2xl font-bold mb-4">Gestión de Pedidos</h2>
          <p className="text-gray-600">Panel de gestión de pedidos próximamente...</p>
        </div>;
      case 'users':
        return <div className="p-8">
          <h2 className="text-2xl font-bold mb-4">Gestión de Usuarios</h2>
          <p className="text-gray-600">Panel de gestión de usuarios próximamente...</p>
        </div>;
      case 'analytics':
        return <div className="p-8">
          <h2 className="text-2xl font-bold mb-4">Analíticas</h2>
          <p className="text-gray-600">Panel de analíticas próximamente...</p>
        </div>;
      case 'settings':
        return <div className="p-8">
          <h2 className="text-2xl font-bold mb-4">Configuración</h2>
          <p className="text-gray-600">Configuración del sistema próximamente...</p>
        </div>;
      default:
        return <EmailComposer />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}