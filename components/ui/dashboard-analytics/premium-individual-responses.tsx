'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PremiumIndividualResponsesProps {
  analytics?: any;
}

export function PremiumIndividualResponses({ analytics }: PremiumIndividualResponsesProps) {
  const [responses, setResponses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedResponse, setSelectedResponse] = useState<any>(null);

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
        setResponses(data.slice(0, 8));
      } catch (error) {
        console.error('Error fetching responses:', error);
        setResponses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, []);

  const generateDemoResponses = () => {
    const names = ['María González', 'Carlos Rivera', 'Ana López', 'Diego Martín', 'Sofia Chen', 'Luis Torres', 'Emma Wilson', 'Alex Kumar'];
    const conditions = ['Myopia', 'Hyperopia', 'Astigmatism', 'No conditions'];
    const ages = [24, 28, 32, 29, 35, 26, 31, 27];
    
    return names.map((name, i) => ({
      _id: `demo_${i}`,
      firstName: name.split(' ')[0],
      lastName: name.split(' ')[1],
      age: ages[i],
      usesGlasses: Math.random() > 0.4,
      visionConditions: [conditions[Math.floor(Math.random() * conditions.length)]],
      submittedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      interestInRemovableGraduation: Math.random() > 0.5 ? ['interested'] : ['maybe']
    }));
  };

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
    if (response.visionConditions?.includes('none')) return 'bg-emerald-500';
    if (response.usesGlasses) return 'bg-blue-500';
    return 'bg-amber-500';
  };

  const getStatusText = (response: any) => {
    if (response.visionConditions?.includes('none')) return 'No conditions';
    if (response.usesGlasses) return 'Uses glasses';
    return 'Vision needs';
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-xl p-6 border border-gray-200/60 shadow-sm col-span-1 lg:col-span-2"
      >
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-2 border-gray-200 border-t-accent-blue rounded-full animate-spin"></div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4 }}
      className="bg-[#0A0A0A] rounded-2xl p-6 border border-[#1A1A1A] col-span-1 lg:col-span-2"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white text-lg font-semibold">Recent responses</h3>
          <p className="text-[#888888] text-sm">Latest survey submissions</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-[#888888] text-xs">Live</span>
        </div>
      </div>

      {/* Responses List */}
      <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar">
        <AnimatePresence>
          {responses.map((response, index) => (
            <motion.div
              key={response._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.05 }}
              className="group flex items-center justify-between p-4 rounded-xl bg-[#0F0F0F] border border-[#1A1A1A] hover:border-[#2A2A2A] transition-all cursor-pointer"
              onClick={() => setSelectedResponse(response)}
            >
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {getInitials(response.firstName, response.lastName)}
                    </span>
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(response)} rounded-full border-2 border-[#0A0A0A]`} />
                </div>

                {/* Info */}
                <div>
                  <div className="text-white font-medium">
                    {response.firstName && response.lastName 
                      ? `${response.firstName} ${response.lastName}`
                      : 'Anonymous User'
                    }
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[#888888] text-sm">{getStatusText(response)}</span>
                    {response.age && (
                      <>
                        <div className="w-1 h-1 bg-[#444444] rounded-full" />
                        <span className="text-[#888888] text-sm">{response.age}y</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Time and Arrow */}
              <div className="flex items-center gap-3">
                <div className="text-[#666666] text-sm">
                  {formatDate(response.submittedAt)}
                </div>
                <div className="w-5 h-5 text-[#666666] group-hover:text-white transition-colors">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* View All Button */}
      <div className="mt-6 pt-4 border-t border-[#1A1A1A]">
        <button className="w-full py-3 text-[#CCCCCC] text-sm font-medium hover:text-white transition-colors">
          View all responses ({analytics?.totalResponses || responses.length})
        </button>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1A1A1A;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #333333;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #444444;
        }
      `}</style>
    </motion.div>
  );
}