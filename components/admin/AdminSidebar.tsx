'use client';

import { Mail, Settings, Users, Package, BarChart, Shield } from 'lucide-react';

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function AdminSidebar({ activeTab, setActiveTab }: AdminSidebarProps) {
  const menuItems = [
    { id: 'email', label: 'Correos', icon: Mail, color: 'bg-gradient-to-br from-blue-500 to-blue-600' },
    { id: 'orders', label: 'Pedidos', icon: Package, color: 'bg-gradient-to-br from-green-500 to-green-600' },
    { id: 'users', label: 'Usuarios', icon: Users, color: 'bg-gradient-to-br from-purple-500 to-purple-600' },
    { id: 'analytics', label: 'Analíticas', icon: BarChart, color: 'bg-gradient-to-br from-orange-500 to-orange-600' },
    { id: 'settings', label: 'Configuración', icon: Settings, color: 'bg-gradient-to-br from-gray-500 to-gray-600' },
  ];

  return (
    <aside className="w-80 bg-white shadow-xl border-r border-gray-200 h-screen sticky top-0">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">WeLens Admin</h1>
            <p className="text-sm text-gray-500">Panel de administración</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 shadow-md'
                  : 'hover:bg-gray-50 hover:shadow-sm'
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shadow-sm transition-all duration-200 ${
                isActive ? item.color : 'bg-gray-100 group-hover:bg-gray-200'
              }`}>
                <IconComponent className={`w-5 h-5 ${
                  isActive ? 'text-white' : 'text-gray-600 group-hover:text-gray-700'
                }`} />
              </div>
              
              <div className="flex-1 text-left">
                <p className={`font-semibold transition-colors duration-200 ${
                  isActive ? 'text-indigo-700' : 'text-gray-700 group-hover:text-gray-900'
                }`}>
                  {item.label}
                </p>
                <p className={`text-sm transition-colors duration-200 ${
                  isActive ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500'
                }`}>
                  {item.id === 'email' && 'Enviar correos personalizados'}
                  {item.id === 'orders' && 'Gestionar pedidos'}
                  {item.id === 'users' && 'Administrar usuarios'}
                  {item.id === 'analytics' && 'Métricas del sistema'}
                  {item.id === 'settings' && 'Configuración general'}
                </p>
              </div>

              {/* Active indicator */}
              {isActive && (
                <div className="w-2 h-8 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full shadow-sm"></div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">A</span>
          </div>
          <div>
            <p className="font-medium text-gray-700">Administrador</p>
            <p className="text-xs">Sesión activa</p>
          </div>
        </div>
      </div>
    </aside>
  );
}