'use client';

import { useState, useEffect } from 'react';

export function SimpleTestDashboard() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        console.log('🔄 Fetching analytics...');
        const response = await fetch('/api/typeform/analytics');
        console.log('📡 Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        console.log('✅ Data received:', data);
        setAnalytics(data);
        setError(null);
      } catch (err) {
        console.error('❌ Error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gallery-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gray-200 border-t-accent-blue rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gallery-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-lg font-semibold mb-4">Error: {error}</div>
          <button 
            onClick={() => window.location.reload()}
            className="bg-accent-blue text-white px-4 py-2 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gallery-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Analytics Test</h1>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Raw Data</h2>
          <pre className="text-sm bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(analytics, null, 2)}
          </pre>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-accent-blue">
              {analytics?.totalResponses || 0}
            </div>
            <div className="text-sm text-gray-600">Total Responses</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-green-600">
              {analytics?.keyMetrics?.glassesUserRate || 0}%
            </div>
            <div className="text-sm text-gray-600">Glasses Users</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-purple-600">
              {analytics?.keyMetrics?.averageAge || 0}
            </div>
            <div className="text-sm text-gray-600">Average Age</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-orange-600 capitalize">
              {analytics?.keyMetrics?.mostCommonCondition || 'N/A'}
            </div>
            <div className="text-sm text-gray-600">Common Condition</div>
          </div>
        </div>
      </div>
    </div>
  );
}