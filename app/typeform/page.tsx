'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { 
  Question0, Question1, Question2, Question3, Question4, 
  Question5, Question6, Question7, Question8, Question9, Question10 
} from '@/components/typeform/Questions';

// Social Media Capture Component
function SocialMediaCapture({ onSocialSubmitted }: { onSocialSubmitted?: () => void }) {
  const [showSocialCapture, setShowSocialCapture] = useState(false);
  const [socialHandle, setSocialHandle] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('instagram');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const socialPlatforms = [
    { id: 'instagram', name: 'Instagram', logo: (
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center">
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5a4.25 4.25 0 004.25 4.25h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm5.25-2.5a1 1 0 110 2 1 1 0 010-2z"/>
        </svg>
      </div>
    )},
    { id: 'facebook', name: 'Facebook', logo: (
      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 3.667h-3.533v7.98H9.101z"/>
        </svg>
      </div>
    )},
    { id: 'twitter', name: 'Twitter/X', logo: (
      <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center">
        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </div>
    )},
    { id: 'tiktok', name: 'TikTok', logo: (
      <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
          <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" fill="#ff0050"/>
        </svg>
      </div>
    )},
    { id: 'linkedin', name: 'LinkedIn', logo: (
      <div className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center">
        <span className="text-white font-bold text-sm">in</span>
      </div>
    )},
    { id: 'youtube', name: 'YouTube', logo: (
      <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center">
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      </div>
    )},
  ];

  const handleSocialSubmit = async () => {
    if (!socialHandle.trim()) return;
    
    setIsSubmitting(true);
    try {
      // Add social media info to the existing survey response
      const surveyId = localStorage.getItem('welens_survey_id'); // We'll need to store this when submitting
      
      const response = await fetch('/api/typeform/add-social', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          surveyId,
          socialMedia: {
            platform: selectedPlatform,
            handle: socialHandle.replace('@', ''),
            submittedAt: new Date().toISOString()
          }
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        // Notificar al componente padre que se completó
        setTimeout(() => {
          onSocialSubmitted?.();
        }, 2000); // Espera 2 segundos para mostrar el mensaje de confirmación
      }
    } catch (error) {
      console.error('Error submitting social media:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-8 p-4 bg-green-50 border border-green-200 rounded-xl"
      >
        <div className="text-green-700 font-semibold text-sm text-center">
          Perfecto. Hemos guardado tu información de {socialPlatforms.find(p => p.id === selectedPlatform)?.name}.
        </div>
      </motion.div>
    );
  }

  return (
    <div className="mb-8">
      <AnimatePresence>
        {!showSocialCapture ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="space-y-4"
          >
            <div className="text-slate mb-3">
              <p className="text-lg">¿Nos proporcionarías una de tus redes sociales?</p>
              <p className="text-sm text-ink font-medium">Te puede convenir, créeme 😉</p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowSocialCapture(true)}
              className="bg-white text-ink px-8 py-3 rounded-xl font-medium hover:shadow-lg transition-all border border-hairline-silver"
            >
              Claro, por qué no
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4"
          >
            {/* Username Input */}
            <motion.div
              initial={{ width: 200 }}
              animate={{ width: 280 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mx-auto"
            >
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate text-lg">@</span>
                <input
                  type="text"
                  value={socialHandle}
                  onChange={(e) => setSocialHandle(e.target.value)}
                  placeholder="tu_usuario"
                  className="w-full pl-8 pr-4 py-3 border-2 border-studio-mist rounded-xl focus:border-accent-blue focus:outline-none transition-colors text-center"
                />
              </div>
            </motion.div>

            {/* Platform Slider */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="overflow-x-auto pb-4 px-2"
            >
              <div className="flex space-x-4 justify-center min-w-max px-8 py-3">
                {socialPlatforms.map((platform, index) => (
                  <motion.button
                    key={platform.id}
                    animate={{ 
                      opacity: selectedPlatform === platform.id ? 1 : 0.7,
                      y: selectedPlatform === platform.id ? -1 : 0
                    }}
                    whileHover={{ 
                      opacity: 1,
                      y: -0.5
                    }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setSelectedPlatform(platform.id)}
                    className={`p-1 rounded-xl relative transition-all duration-200 ${
                      selectedPlatform === platform.id 
                        ? 'bg-white/40 backdrop-blur-sm border border-accent-blue/30 shadow-sm' 
                        : 'bg-transparent hover:bg-white/10'
                    }`}
                  >
                    {platform.logo}
                    
                    {/* Indicador de selección removido */}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: socialHandle.trim() ? 1.05 : 1 }}
              whileTap={{ scale: socialHandle.trim() ? 0.95 : 1 }}
              onClick={handleSocialSubmit}
              disabled={!socialHandle.trim() || isSubmitting}
              className={`px-6 py-2 rounded-xl font-medium transition-all ${
                socialHandle.trim() 
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg' 
                  : 'bg-studio-mist text-slate/50 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block mr-2" />
                  Guardando...
                </>
              ) : (
                `Enviar mi ${socialPlatforms.find(p => p.id === selectedPlatform)?.name}`
              )}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Types for form data
interface FormData {
  // Demographics
  age: number | null;
  firstName: string;
  lastName: string;
  
  // Vision and glasses usage
  usesGlasses: boolean | null;
  glassesType: string[];
  visionConditions: string[];
  prescriptionStrength: number | null;
  
  // Behavioral insights
  stoppedUsingGlasses: boolean | null;
  reasonsForStopping: string[];
  interestInRemovableGraduation: string | null;
  
  // Lifestyle and preferences
  lifestyleFactors: string[];
  purchaseInfluencers: string[];
  
  // Additional insights
  glassesUsageFrequency: string | null;
}

const initialFormData: FormData = {
  age: null,
  firstName: '',
  lastName: '',
  usesGlasses: null,
  glassesType: [],
  visionConditions: [],
  prescriptionStrength: null,
  stoppedUsingGlasses: null,
  reasonsForStopping: [],
  interestInRemovableGraduation: null,
  lifestyleFactors: [],
  purchaseInfluencers: [],
  glassesUsageFrequency: null,
};

export default function TypeformPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [socialCaptureCompleted, setSocialCaptureCompleted] = useState(false);

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('welens_survey_data');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
      } catch (error) {
        console.error('Error loading saved survey data:', error);
      }
    }
  }, []);

  // Update form data and auto-advance
  const updateFormDataAndAdvance = (updates: Partial<FormData>, shouldAdvance: boolean = true) => {
    const newFormData = { ...formData, ...updates };
    setFormData(newFormData);
    
    // Auto-save to localStorage
    localStorage.setItem('welens_survey_data', JSON.stringify(newFormData));
    
    // Auto-advance to next question after a short delay (only for single-select questions)
    if (shouldAdvance && currentQuestion < totalQuestions - 1) {
      let nextQuestion = currentQuestion + 1;
      
      // Skip logic: If user selects "none" (no vision conditions), skip prescription question
      if (currentQuestion === 2 && updates.visionConditions?.includes('none')) {
        // Auto-fill prescription as 0 (No sé) and skip to question 4 (age)
        const updatedFormData = { ...newFormData, prescriptionStrength: 0 };
        setFormData(updatedFormData);
        localStorage.setItem('welens_survey_data', JSON.stringify(updatedFormData));
        nextQuestion = currentQuestion + 2; // Skip question 3 (prescription)
      }
      
      setTimeout(() => {
        setCurrentQuestion(nextQuestion);
      }, 300);
    }
  };

  // Regular update without auto-advance (for backward compatibility)
  const updateFormData = (updates: Partial<FormData>) => {
    const newFormData = { ...formData, ...updates };
    setFormData(newFormData);
    
    // Auto-save to localStorage
    localStorage.setItem('welens_survey_data', JSON.stringify(newFormData));
  };

  // Validation function to check if current question is answered
  const isCurrentQuestionAnswered = () => {
    const hasQuestion6 = formData.stoppedUsingGlasses === true;
    
    switch (currentQuestion) {
      case 0: // Uses glasses
        return formData.usesGlasses !== null;
      case 1: // Glasses type
        return formData.glassesType && formData.glassesType.length > 0;
      case 2: // Vision conditions
        return formData.visionConditions && formData.visionConditions.length > 0;
      case 3: // Prescription strength
        return formData.prescriptionStrength !== null;
      case 4: // Age
        return formData.age !== null;
      case 5: // Stopped using glasses
        return formData.stoppedUsingGlasses !== null;
      case 6: 
        if (hasQuestion6) {
          // Question6: Reasons for stopping
          return formData.reasonsForStopping && formData.reasonsForStopping.length > 0;
        } else {
          // Question7: Interest in removable graduation (shifted up)
          return formData.interestInRemovableGraduation !== null && formData.interestInRemovableGraduation !== undefined;
        }
      case 7:
        if (hasQuestion6) {
          // Question7: Interest in removable graduation
          return formData.interestInRemovableGraduation !== null && formData.interestInRemovableGraduation !== undefined;
        } else {
          // Question8: Usage frequency (shifted up)
          return formData.glassesUsageFrequency !== null;
        }
      case 8:
        if (hasQuestion6) {
          // Question8: Usage frequency
          return formData.glassesUsageFrequency !== null;
        } else {
          // Question9: Lifestyle factors (shifted up)
          return formData.lifestyleFactors && formData.lifestyleFactors.length > 0;
        }
      case 9:
        if (hasQuestion6) {
          // Question9: Lifestyle factors
          return formData.lifestyleFactors && formData.lifestyleFactors.length > 0;
        } else {
          // Question10: Name and lastname (shifted up)
          return (formData.firstName && formData.firstName.trim().length > 0) && 
                 (formData.lastName && formData.lastName.trim().length > 0);
        }
      case 10: // Question10: Name and lastname
        return (formData.firstName && formData.firstName.trim().length > 0) && 
               (formData.lastName && formData.lastName.trim().length > 0);
      default:
        return false;
    }
  };

  // Get the actual current question type for validation and button logic
  const getCurrentQuestionType = () => {
    // Handle dynamic indices based on whether Question6 is shown
    const hasQuestion6 = formData.stoppedUsingGlasses === true;
    
    switch (currentQuestion) {
      case 0: return 'single'; // Uses glasses
      case 1: return 'multi'; // Glasses type
      case 2: return 'multi'; // Vision conditions  
      case 3: return 'slider'; // Prescription strength
      case 4: return 'single'; // Age
      case 5: return 'single'; // Stopped using glasses
      case 6: 
        if (hasQuestion6) {
          return 'multi'; // Question6: Reasons for stopping
        } else {
          return 'single'; // Question7: Interest in removable graduation (shifted up)
        }
      case 7:
        if (hasQuestion6) {
          return 'multi'; // Question7: Interest in removable graduation  
        } else {
          return 'single'; // Question8: Usage frequency (shifted up)
        }
      case 8:
        if (hasQuestion6) {
          return 'single'; // Question8: Usage frequency
        } else {
          return 'multi'; // Question9: Lifestyle factors (shifted up)
        }
      case 9:
        if (hasQuestion6) {
          return 'multi'; // Question9: Lifestyle factors
        } else {
          return 'text'; // Question10: Name and lastname (shifted up)
        }
      case 10: return 'text'; // Question10: Name and lastname (only when Question6 exists)
      default: return 'single';
    }
  };

  // Check if current question needs manual advance button
  const isMultiSelectQuestion = () => {
    const type = getCurrentQuestionType();
    return type === 'multi' || type === 'slider' || type === 'text';
  };

  // Calculate total questions dynamically based on answers
  const getTotalQuestions = () => {
    // Base questions: 0,1,2,3,4,5,7,8,9,10 (10 questions)
    // Plus Question6 if they stopped using glasses (1 additional question)
    return formData.stoppedUsingGlasses === true ? 11 : 10;
  };

  const totalQuestions = getTotalQuestions();
  const progressPercentage = ((currentQuestion + 1) / totalQuestions) * 100;

  // Import question components
  const questionComponents = [
    <Question0 key={0} formData={formData} updateFormData={updateFormData} updateFormDataAndAdvance={updateFormDataAndAdvance} />,
    <Question1 key={1} formData={formData} updateFormData={updateFormData} updateFormDataAndAdvance={updateFormDataAndAdvance} />,
    <Question2 key={2} formData={formData} updateFormData={updateFormData} updateFormDataAndAdvance={updateFormDataAndAdvance} />,
    <Question3 key={3} formData={formData} updateFormData={updateFormData} updateFormDataAndAdvance={updateFormDataAndAdvance} />,
    <Question4 key={4} formData={formData} updateFormData={updateFormData} updateFormDataAndAdvance={updateFormDataAndAdvance} />,
    <Question5 key={5} formData={formData} updateFormData={updateFormData} updateFormDataAndAdvance={updateFormDataAndAdvance} />,
    ...(formData.stoppedUsingGlasses === true ? 
      [<Question6 key={6} formData={formData} updateFormData={updateFormData} updateFormDataAndAdvance={updateFormDataAndAdvance} />] : 
      []
    ),
    <Question7 key={7} formData={formData} updateFormData={updateFormData} updateFormDataAndAdvance={updateFormDataAndAdvance} />,
    <Question8 key={8} formData={formData} updateFormData={updateFormData} updateFormDataAndAdvance={updateFormDataAndAdvance} />,
    <Question9 key={9} formData={formData} updateFormData={updateFormData} updateFormDataAndAdvance={updateFormDataAndAdvance} />,
    <Question10 key={10} formData={formData} updateFormData={updateFormData} updateFormDataAndAdvance={updateFormDataAndAdvance} />,
  ];

  const nextQuestion = () => {
    if (!isCurrentQuestionAnswered()) {
      alert('Por favor selecciona al menos una opción antes de continuar.');
      return;
    }
    
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      let prevQuestion = currentQuestion - 1;
      
      // Skip logic for going back: If current is 4 (age) and user has "none" in vision conditions, skip back to question 2
      if (currentQuestion === 4 && formData.visionConditions?.includes('none')) {
        prevQuestion = currentQuestion - 2; // Skip question 3 (prescription) going back too
      }
      
      setCurrentQuestion(prevQuestion);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/typeform/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
          userAgent: navigator.userAgent,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        // Store survey ID for potential social media addition
        if (result.id) {
          localStorage.setItem('welens_survey_id', result.id);
        }
        
        // Clear saved data from localStorage on successful submission
        localStorage.removeItem('welens_survey_data');
        setIsCompleted(true);
      } else {
        throw new Error('Failed to submit survey');
      }
    } catch (error) {
      console.error('Error submitting survey:', error);
      alert('Error al enviar la encuesta. Por favor, intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (currentQuestion < totalQuestions - 1) {
          nextQuestion();
        } else if (currentQuestion === totalQuestions - 1) {
          handleSubmit();
        }
      } else if (e.key === 'ArrowLeft') {
        previousQuestion();
      } else if (e.key === 'ArrowRight') {
        nextQuestion();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentQuestion]);

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-studio-mist via-white to-accent-blue/5">
        <Navbar />
        <div className="pt-32 min-h-screen flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto"
          >
            {/* Logo */}
            <div className="mb-8">
              <img src="/logo2.PNG" alt="WeLens" className="w-32 h-32 mx-auto" />
            </div>
            
            <h1 className="text-4xl font-bold text-ink mb-6">¡Gracias por participar!</h1>
            <p className="text-lg text-slate mb-8">
              Tu respuesta nos ayuda a crear mejores productos para la comunidad.
            </p>
            
            {/* Social Media Section - solo mostrar si no se ha completado */}
            {!socialCaptureCompleted && (
              <SocialMediaCapture onSocialSubmitted={() => setSocialCaptureCompleted(true)} />
            )}
            
            {/* Mensaje de confirmación cuando se completa la captura social */}
            {socialCaptureCompleted && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-8 p-6 bg-green-50 border border-green-200 rounded-xl"
              >
                <div className="text-green-700 font-semibold text-lg text-center">
                  ¡Perfecto! Hemos guardado toda tu información.
                </div>
              </motion.div>
            )}
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/'}
              className="bg-ink text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-lg transition-all mt-8"
            >
              Volver al inicio
            </motion.button>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-studio-mist via-white to-accent-blue/5">
      <Navbar />
      
      {/* Progress Bar - Solo visual */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-studio-mist pt-20">
        <div className="max-w-4xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-base text-ink font-bold">
              Pregunta {currentQuestion + 1} de {totalQuestions}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
            <motion.div
              className="bg-gradient-to-r from-accent-blue via-blue-500 to-pricing-blue h-4 rounded-full shadow-lg relative overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: [-100, 300] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Contenido principal del formulario */}

      {/* Main Content */}
      <div className="pt-40 pb-20 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-studio-mist/30"
            >
              {questionComponents[currentQuestion]}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8 px-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={previousQuestion}
              disabled={currentQuestion === 0}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all text-sm ${
                currentQuestion === 0
                  ? 'text-slate/50 cursor-not-allowed'
                  : 'text-ink hover:bg-studio-mist/50'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Anterior</span>
            </motion.button>

            <div className="text-xs text-slate text-center">
              Pregunta {currentQuestion + 1} - {isMultiSelectQuestion() ? "Selecciona las opciones y presiona Siguiente" : "Las respuestas avanzan automáticamente"}
            </div>

            {(isMultiSelectQuestion() || currentQuestion === totalQuestions - 1) && (
              <motion.button
                whileHover={{ scale: isCurrentQuestionAnswered() ? 1.05 : 1 }}
                whileTap={{ scale: isCurrentQuestionAnswered() ? 0.95 : 1 }}
                onClick={currentQuestion === totalQuestions - 1 ? handleSubmit : nextQuestion}
                disabled={isSubmitting || !isCurrentQuestionAnswered()}
                className={`flex items-center space-x-2 px-6 py-2 rounded-xl font-medium transition-all text-sm ${
                  !isCurrentQuestionAnswered()
                    ? 'bg-studio-mist text-slate/50 cursor-not-allowed'
                    : 'bg-white text-ink'
                } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-ink/30 border-t-ink rounded-full animate-spin" />
                    <span>Enviando...</span>
                  </>
                ) : currentQuestion === totalQuestions - 1 ? (
                  <>
                    <span>Enviar encuesta</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </>
                ) : (
                  <>
                    <span>Siguiente</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </motion.button>
            )}

            {!isMultiSelectQuestion() && currentQuestion !== totalQuestions - 1 && (
              <div className="w-20"></div> // Spacer to center the middle text
            )}
          </div>
        </div>
      </div>
    </div>
  );
}