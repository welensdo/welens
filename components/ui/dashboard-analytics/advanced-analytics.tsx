'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface AdvancedAnalyticsProps {
  analytics?: any;
}

export function AdvancedAnalytics({ analytics }: AdvancedAnalyticsProps) {
  const [selectedTab, setSelectedTab] = useState('correlations');

  if (!analytics?.advancedAnalytics) {
    return (
      <div className="bg-white rounded-xl p-6 border border-gray-200/60 shadow-sm">
        <h3 className="text-gray-900 text-lg font-semibold mb-4">Advanced Analytics</h3>
        <p className="text-gray-600">No advanced analytics data available</p>
      </div>
    );
  }

  const tabs = [
    { 
      id: 'correlations', 
      label: 'Correlations', 
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 256 256">
          <path d="M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V48a8,8,0,0,1,16,0V156.69L90.34,106.34a8,8,0,0,1,11.32,0L128,132.69,180.69,80H160a8,8,0,0,1,0-16h32a8,8,0,0,1,8,8v32a8,8,0,0,1-16,0V83.31L133.66,133.66a8,8,0,0,1-11.32,0L96,107.31,48,155.31V200H224A8,8,0,0,1,232,208Z"/>
        </svg>
      )
    },
    { 
      id: 'segmentation', 
      label: 'Segmentation', 
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 256 256">
          <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.68,152A15.89,15.89,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM51.31,160,136,75.31,152.69,92,68,176.68ZM48,179.31,76.69,208H48Zm48,25.38L79.31,188,164,103.31,180.69,120Zm96-96L147.31,64l16-16L208,92.69Z"/>
        </svg>
      )
    },
    { 
      id: 'behavior', 
      label: 'Behavior', 
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 256 256">
          <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"/>
        </svg>
      )
    },
    { 
      id: 'insights', 
      label: 'Insights', 
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 256 256">
          <path d="M176,232a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,232Zm40-128a87.55,87.55,0,0,1-33.64,69.21A16.24,16.24,0,0,0,176,186v6a16,16,0,0,1-16,16H96a16,16,0,0,1-16-16v-6a16,16,0,0,0-6.23-12.66A87.59,87.59,0,0,1,40,104.49C39.74,56.83,78.26,17.14,125.88,16A88,88,0,0,1,216,104Z"/>
        </svg>
      )
    }
  ];

  const renderCorrelations = () => (
    <div className="space-y-6">
      {/* Edad vs Condiciones */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-3">Age vs Vision Conditions</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h5 className="text-sm font-medium text-gray-700 mb-2">Myopia by Age</h5>
            <div className="space-y-1">
              {Object.entries(analytics.keyMetrics.ageMyopiaCorrelation || {}).map(([age, rate]: any) => (
                <div key={age} className="flex justify-between text-sm">
                  <span className="text-gray-600">{age}</span>
                  <span className="font-medium text-accent-blue">{rate}%</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h5 className="text-sm font-medium text-gray-700 mb-2">Presbyopia by Age</h5>
            <div className="space-y-1">
              {Object.entries(analytics.keyMetrics.agePresbyopiaCorrelation || {}).map(([age, rate]: any) => (
                <div key={age} className="flex justify-between text-sm">
                  <span className="text-gray-600">{age}</span>
                  <span className="font-medium text-accent-blue">{rate}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Innovation Interest Correlations */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-3">Innovation Interest Correlations</h4>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <h5 className="text-sm font-medium text-gray-700 mb-2">By Age Group</h5>
            <div className="space-y-1">
              {Object.entries(analytics.keyMetrics.innovationInterestByAge || {}).map(([age, rate]: any) => (
                <div key={age} className="flex justify-between text-sm">
                  <span className="text-gray-600">{age}</span>
                  <span className="font-medium text-green-600">{rate}%</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h5 className="text-sm font-medium text-gray-700 mb-2">By Condition</h5>
            <div className="space-y-1">
              {Object.entries(analytics.keyMetrics.innovationInterestByCondition || {}).map(([condition, rate]: any) => (
                <div key={condition} className="flex justify-between text-sm">
                  <span className="text-gray-600 capitalize">{condition}</span>
                  <span className="font-medium text-green-600">{rate}%</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h5 className="text-sm font-medium text-gray-700 mb-2">By Graduation</h5>
            <div className="space-y-1">
              {Object.entries(analytics.keyMetrics.innovationInterestByGraduation || {}).map(([grad, rate]: any) => (
                <div key={grad} className="flex justify-between text-sm">
                  <span className="text-gray-600">{grad}</span>
                  <span className="font-medium text-green-600">{rate}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSegmentation = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-accent-blue/10 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-accent-blue">
            {analytics.advancedAnalytics.segmentation.targetMarket}
          </div>
          <div className="text-sm text-gray-600 mt-1">Target Market Size</div>
          <div className="text-xs text-gray-500 mt-1">
            Users who wear glasses + interested in innovation
          </div>
        </div>
        <div className="bg-purple-100 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">
            {analytics.advancedAnalytics.segmentation.premiumSegment}
          </div>
          <div className="text-sm text-gray-600 mt-1">Premium Segment</div>
          <div className="text-xs text-gray-500 mt-1">
            High graduation + definitely interested
          </div>
        </div>
        <div className="bg-red-100 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-red-600">
            {analytics.advancedAnalytics.segmentation.dissatisfiedUsers}
          </div>
          <div className="text-sm text-gray-600 mt-1">Dissatisfied Users</div>
          <div className="text-xs text-gray-500 mt-1">
            Stopped using glasses they liked
          </div>
        </div>
      </div>
    </div>
  );

  const renderBehavior = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">Behavioral Patterns</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-gray-700">Stopped using glasses rate</span>
              <span className="font-semibold text-red-600">
                {analytics.keyMetrics.stoppedUsingGlassesRate?.toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-gray-700">Satisfaction score</span>
              <span className="font-semibold text-green-600">
                {analytics.keyMetrics.averageSatisfactionWithCurrentGlasses}%
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-gray-700">Innovation readiness</span>
              <span className="font-semibold text-accent-blue">
                {analytics.keyMetrics.willingToTryInnovation?.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">Usage Patterns</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-gray-700">Prescription glasses</span>
              <span className="font-semibold">{analytics.keyMetrics.prescriptionGlassesRate}%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-gray-700">Sunglasses</span>
              <span className="font-semibold">{analytics.keyMetrics.sunglassesRate}%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-gray-700">Computer glasses</span>
              <span className="font-semibold">{analytics.keyMetrics.computerGlassesRate}%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-gray-700">Reading glasses</span>
              <span className="font-semibold">{analytics.keyMetrics.readingGlassesRate}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderInsights = () => (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-accent-blue/10 to-purple-100 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-accent-blue" fill="currentColor" viewBox="0 0 256 256">
            <path d="M225.86,102.82c-3.77-3.94-7.67-8-9.14-11.57-1.36-3.27-1.44-8.69-1.52-13.94-.15-9.76-.31-20.82-8-28.51s-18.75-7.85-28.51-8c-5.25-.08-10.67-.16-13.94-1.52-3.56-1.47-7.63-5.37-11.57-9.14C146.28,23.51,138.44,16,128,16s-18.27,7.51-25.18,14.14c-3.94,3.77-8,7.67-11.57,9.14C88,40.64,82.56,40.72,77.31,40.8c-9.76.15-20.82.31-28.51,8S41,67.55,40.8,77.31c-.08,5.25-.16,10.67-1.52,13.94-1.47,3.56-5.37,7.63-9.14,11.57C23.51,109.72,16,117.56,16,128s7.51,18.27,14.14,25.18c3.77,3.94,7.67,8,9.14,11.57,1.36,3.27,1.44,8.69,1.52,13.94.15,9.76.31,20.82,8,28.51s18.75,7.85,28.51,8c5.25.08,10.67.16,13.94,1.52,3.56,1.47,7.63,5.37,11.57,9.14C109.72,232.49,117.56,240,128,240s18.27-7.51,25.18-14.14c3.94-3.77,8-7.67,11.57-9.14,3.27-1.36,8.69-1.44,13.94-1.52,9.76-.15,20.82-.31,28.51-8s7.85-18.75,8-28.51c.08-5.25.16-10.67,1.52-13.94,1.47-3.56,5.37-7.63,9.14-11.57C232.49,146.28,240,138.44,240,128S232.49,109.72,225.86,102.82Zm-52.2,6.84-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z"/>
          </svg>
          Key Market Insights
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h5 className="font-medium text-gray-800 mb-2">Primary Opportunities</h5>
            <ul className="text-sm space-y-1 text-gray-600">
              <li>• {analytics.keyMetrics.glassesUserRate}% already use glasses</li>
              <li>• {analytics.keyMetrics.myopiaRate}% have myopia (growing market)</li>
              <li>• {analytics.keyMetrics.willingToTryInnovation?.toFixed(1)}% interested in innovation</li>
              <li>• Average age: {analytics.keyMetrics.averageAge} years</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-gray-800 mb-2">Market Challenges</h5>
            <ul className="text-sm space-y-1 text-gray-600">
              <li>• {analytics.keyMetrics.stoppedUsingGlassesRate?.toFixed(1)}% stopped using glasses</li>
              <li>• Multiple conditions: {analytics.keyMetrics.multipleConditionsRate?.toFixed(1)}%</li>
              <li>• High graduation users: {analytics.keyMetrics.highGraduation}</li>
              <li>• Satisfaction gap exists</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h5 className="font-semibold text-green-800 mb-2">Strong Segments</h5>
          <div className="text-sm text-green-700">
            <div>26-35 age group shows highest innovation interest</div>
            <div className="mt-2 font-medium">Myopia correlation with younger users</div>
          </div>
        </div>
        
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h5 className="font-semibold text-amber-800 mb-2">Growth Areas</h5>
          <div className="text-sm text-amber-700">
            <div>Computer glasses market</div>
            <div className="mt-2 font-medium">Fashion glasses adoption</div>
          </div>
        </div>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h5 className="font-semibold text-red-800 mb-2">Pain Points</h5>
          <div className="text-sm text-red-700">
            <div>Vision changes over time</div>
            <div className="mt-2 font-medium">Prescription update needs</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 border border-gray-200/60 shadow-sm col-span-full"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-gray-900 text-xl font-semibold">Advanced Analytics</h3>
          <p className="text-gray-600 text-sm mt-1">
            30+ metrics, correlations and behavioral insights
          </p>
        </div>
        <div className="text-sm text-gray-500">
          Based on {analytics.totalResponses} responses
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
              selectedTab === tab.id
                ? 'bg-white text-accent-blue shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="min-h-[400px]">
        {selectedTab === 'correlations' && renderCorrelations()}
        {selectedTab === 'segmentation' && renderSegmentation()}
        {selectedTab === 'behavior' && renderBehavior()}
        {selectedTab === 'insights' && renderInsights()}
      </div>
    </motion.div>
  );
}