import mongoose, { Document, Schema } from 'mongoose';

// Interface for Survey Response
export interface ISurveyResponse extends Document {
  // Response ID and metadata
  responseId: string;
  submittedAt: Date;
  userAgent?: string;
  ipAddress?: string;
  
  // Demographics
  age: number | null;
  
  // Vision and glasses usage
  usesGlasses: boolean | null;
  glassesType: string[];
  visionConditions: string[];
  prescriptionStrength: number | null;
  
  // Behavioral insights
  stoppedUsingGlasses: boolean | null;
  reasonsForStopping: string[];
  interestInRemovableGraduation: string[];
  
  // Lifestyle and preferences
  lifestyleFactors: string[];
  purchaseInfluencers: string[];
  
  // Additional insights
  glassesUsageFrequency: string | null;
  
  // Analytics metadata (calculated on save)
  ageGroup: string;
  marketSegment: string;
  visionProfile: string;
  customerPersona: string;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

// Interface for Survey Response Model (with statics)
interface ISurveyResponseModel extends mongoose.Model<ISurveyResponse> {
  getAnalytics(): Promise<any>;
}

// Survey Response Schema
const SurveyResponseSchema = new Schema<ISurveyResponse>(
  {
    responseId: {
      type: String,
      required: true,
      unique: true,
      default: () => `survey_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    },
    submittedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    userAgent: {
      type: String,
      default: null,
    },
    ipAddress: {
      type: String,
      default: null,
    },
    
    // Demographics
    age: {
      type: Number,
      min: 15,
      max: 100,
      default: null,
    },
    
    // Vision and glasses usage
    usesGlasses: {
      type: Boolean,
      default: null,
    },
    glassesType: {
      type: [String],
      enum: ['prescription', 'sunglasses', 'reading', 'computer', 'safety', 'fashion'],
      default: [],
    },
    visionConditions: {
      type: [String],
      enum: ['myopia', 'hyperopia', 'astigmatism', 'presbyopia', 'other', 'none'],
      default: [],
    },
    prescriptionStrength: {
      type: Number,
      min: 0,
      max: 8,
      default: null,
    },
    
    // Behavioral insights
    stoppedUsingGlasses: {
      type: Boolean,
      default: null,
    },
    reasonsForStopping: {
      type: [String],
      enum: [
        'prescription_wrong', 
        'prescription_changed', 
        'uncomfortable', 
        'broke', 
        'style_outdated', 
        'lifestyle_change'
      ],
      default: [],
    },
    interestInRemovableGraduation: {
      type: [String],
      enum: ['very_interested', 'interested', 'maybe', 'not_sure', 'not_interested'],
      default: [],
    },
    
    // Lifestyle and preferences
    lifestyleFactors: {
      type: [String],
      enum: [
        'professional_work',
        'student',
        'screen_intensive',
        'creative_work',
        'physical_work',
        'social_active',
        'fashion_conscious',
        'sports_active',
        'travel_frequent'
      ],
      default: [],
    },
    purchaseInfluencers: {
      type: [String],
      enum: [
        'price',
        'style',
        'comfort',
        'functionality',
        'brand',
        'durability',
        'innovation',
        'recommendations',
        'versatility'
      ],
      default: [],
    },
    
    // Additional insights
    glassesUsageFrequency: {
      type: String,
      enum: ['always', 'most_day', 'specific_activities', 'occasionally', 'rarely'],
      default: null,
    },
    
    // Analytics metadata (auto-calculated)
    ageGroup: {
      type: String,
      enum: ['18-25', '26-35', '36-45', '46-55', '56+', 'unknown'],
      default: 'unknown',
    },
    marketSegment: {
      type: String,
      enum: ['tech_professional', 'student', 'fashion_conscious', 'vision_focused', 'price_sensitive', 'lifestyle_active', 'mixed'],
      default: 'mixed',
    },
    visionProfile: {
      type: String,
      enum: ['no_glasses', 'light_prescription', 'moderate_prescription', 'strong_prescription', 'multiple_conditions', 'unknown'],
      default: 'unknown',
    },
    customerPersona: {
      type: String,
      enum: [
        'young_professional', 
        'tech_worker', 
        'fashion_enthusiast', 
        'practical_user', 
        'vision_dependent', 
        'lifestyle_switcher',
        'price_conscious',
        'innovation_seeker',
        'unknown'
      ],
      default: 'unknown',
    },
  },
  {
    timestamps: true,
    collection: 'survey_responses',
  }
);

// Indexes for efficient querying
SurveyResponseSchema.index({ submittedAt: -1 });
SurveyResponseSchema.index({ ageGroup: 1 });
SurveyResponseSchema.index({ marketSegment: 1 });
SurveyResponseSchema.index({ visionProfile: 1 });
SurveyResponseSchema.index({ customerPersona: 1 });
SurveyResponseSchema.index({ usesGlasses: 1 });
SurveyResponseSchema.index({ visionConditions: 1 });
SurveyResponseSchema.index({ prescriptionStrength: 1 });
SurveyResponseSchema.index({ lifestyleFactors: 1 });
SurveyResponseSchema.index({ purchaseInfluencers: 1 });

// Pre-save middleware to calculate analytics metadata
SurveyResponseSchema.pre('save', function() {
  // Calculate age group
  if (this.age) {
    if (this.age >= 18 && this.age <= 25) this.ageGroup = '18-25';
    else if (this.age >= 26 && this.age <= 35) this.ageGroup = '26-35';
    else if (this.age >= 36 && this.age <= 45) this.ageGroup = '36-45';
    else if (this.age >= 46 && this.age <= 55) this.ageGroup = '46-55';
    else if (this.age >= 56) this.ageGroup = '56+';
  }
  
  // Calculate vision profile
  if (this.usesGlasses === false) {
    this.visionProfile = 'no_glasses';
  } else if (this.prescriptionStrength !== null) {
    if (this.prescriptionStrength === 0) this.visionProfile = 'no_glasses';
    else if (this.prescriptionStrength <= 2) this.visionProfile = 'light_prescription';
    else if (this.prescriptionStrength <= 4) this.visionProfile = 'moderate_prescription';
    else this.visionProfile = 'strong_prescription';
    
    // Check for multiple conditions
    if (this.visionConditions.length > 1 && !this.visionConditions.includes('none')) {
      this.visionProfile = 'multiple_conditions';
    }
  }
  
  // Calculate market segment based on lifestyle and purchase factors
  const segments = [];
  
  if (this.lifestyleFactors.includes('screen_intensive') || this.lifestyleFactors.includes('professional_work')) {
    segments.push('tech_professional');
  }
  
  if (this.lifestyleFactors.includes('student')) {
    segments.push('student');
  }
  
  if (this.lifestyleFactors.includes('fashion_conscious') || this.purchaseInfluencers.includes('style')) {
    segments.push('fashion_conscious');
  }
  
  if (this.purchaseInfluencers.includes('functionality') || this.visionConditions.length > 0) {
    segments.push('vision_focused');
  }
  
  if (this.purchaseInfluencers.includes('price')) {
    segments.push('price_sensitive');
  }
  
  if (this.lifestyleFactors.includes('sports_active') || this.lifestyleFactors.includes('travel_frequent')) {
    segments.push('lifestyle_active');
  }
  
  this.marketSegment = segments.length > 0 ? segments[0] : 'mixed';
  
  // Calculate customer persona (more detailed)
  if (this.ageGroup === '18-25' && this.lifestyleFactors.includes('student')) {
    this.customerPersona = 'young_professional';
  } else if (this.lifestyleFactors.includes('screen_intensive')) {
    this.customerPersona = 'tech_worker';
  } else if (this.lifestyleFactors.includes('fashion_conscious')) {
    this.customerPersona = 'fashion_enthusiast';
  } else if (this.purchaseInfluencers.includes('functionality') && this.usesGlasses) {
    this.customerPersona = 'practical_user';
  } else if (this.prescriptionStrength && this.prescriptionStrength > 2) {
    this.customerPersona = 'vision_dependent';
  } else if (this.stoppedUsingGlasses === true) {
    this.customerPersona = 'lifestyle_switcher';
  } else if (this.purchaseInfluencers.includes('price')) {
    this.customerPersona = 'price_conscious';
  } else if (this.purchaseInfluencers.includes('innovation') || this.interestInRemovableGraduation.includes('very_interested')) {
    this.customerPersona = 'innovation_seeker';
  }
});

// Static methods for analytics
SurveyResponseSchema.statics.getAnalytics = async function() {
  const totalResponses = await this.countDocuments();
  
  if (totalResponses === 0) {
    return {
      totalResponses: 0,
      ageDistribution: [],
      visionConditionsAnalysis: [],
      glassesUsage: [],
      marketSegments: [],
      purchaseInfluencers: [],
      innovationInterest: [],
      prescriptionDistribution: [],
      lifestyleAnalysis: [],
      generatedAt: new Date(),
    };
  }
  
  // Age distribution
  const ageDistribution = await this.aggregate([
    { $group: { _id: '$ageGroup', count: { $sum: 1 } } },
    { $sort: { _id: 1 } }
  ]);
  
  // Vision conditions analysis
  const visionConditionsAnalysis = await this.aggregate([
    { $unwind: '$visionConditions' },
    { $group: { _id: '$visionConditions', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
  
  // Glasses usage patterns
  const glassesUsage = await this.aggregate([
    { $group: { _id: '$usesGlasses', count: { $sum: 1 } } }
  ]);
  
  // Market segments
  const marketSegments = await this.aggregate([
    { $group: { _id: '$marketSegment', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
  
  // Purchase influencers
  const purchaseInfluencers = await this.aggregate([
    { $unwind: '$purchaseInfluencers' },
    { $group: { _id: '$purchaseInfluencers', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
  
  // Interest in removable graduation
  const innovationInterest = await this.aggregate([
    { $unwind: '$interestInRemovableGraduation' },
    { $group: { _id: '$interestInRemovableGraduation', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
  
  // Prescription strength distribution
  const prescriptionDistribution = await this.aggregate([
    { $match: { prescriptionStrength: { $ne: null } } },
    { $group: { _id: '$visionProfile', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
  
  // Lifestyle factors analysis
  const lifestyleAnalysis = await this.aggregate([
    { $unwind: '$lifestyleFactors' },
    { $group: { _id: '$lifestyleFactors', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
  
  return {
    totalResponses,
    ageDistribution,
    visionConditionsAnalysis,
    glassesUsage,
    marketSegments,
    purchaseInfluencers,
    innovationInterest,
    prescriptionDistribution,
    lifestyleAnalysis,
    generatedAt: new Date(),
  };
};

// Export the model
const SurveyResponse = (mongoose.models.SurveyResponse || mongoose.model<ISurveyResponse, ISurveyResponseModel>('SurveyResponse', SurveyResponseSchema)) as ISurveyResponseModel;

export default SurveyResponse;