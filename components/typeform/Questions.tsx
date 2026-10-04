'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Eyeglasses, 
  Prohibit, 
  Eye,
  Sunglasses,
  BookOpen,
  Monitor,
  ShieldCheck,
  Sparkle,
  MagnifyingGlass,
  Waves,
  UserCircle,
  Question,
  CheckCircle,
  XCircle,
  Smiley,
  Target,
  TrendUp,
  Wrench,
  ThumbsDown,
  ArrowsClockwise,
  Heart,
  Briefcase,
  GraduationCap,
  Desktop,
  Palette,
  Users,
  Star,
  Person,
  Airplane,
  Clock,
  Timer,
  Money,
  Handshake,
  Gear,
  Tag,
  FloppyDisk,
  Rocket,
  Repeat
} from 'phosphor-react';

// Types
interface FormData {
  age: number | null;
  usesGlasses: boolean | null;
  glassesType: string[];
  visionConditions: string[];
  prescriptionStrength: number | null;
  stoppedUsingGlasses: boolean | null;
  reasonsForStopping: string[];
  interestInRemovableGraduation: string | null;
  lifestyleFactors: string[];
  firstName: string;
  lastName: string;
  glassesUsageFrequency: string | null;
}

interface QuestionProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  updateFormDataAndAdvance?: (updates: Partial<FormData>, shouldAdvance?: boolean) => void;
}

// Question 0: Uses Glasses
export function Question0({ formData, updateFormData, updateFormDataAndAdvance }: QuestionProps) {
  const handleSelection = (value: boolean) => {
    if (updateFormDataAndAdvance) {
      updateFormDataAndAdvance({ usesGlasses: value });
    } else {
      updateFormData({ usesGlasses: value });
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">
          ¿Usas lentes o gafas?
        </h2>
        <p className="text-lg text-slate max-w-2xl mx-auto">
          Queremos conocer tu experiencia con lentes para crear mejores productos
        </p>
      </div>
      
      <div className="space-y-4 max-w-2xl mx-auto">
        {[
          { value: true, label: "Sí, uso lentes", icon: "glasses", desc: "Uso lentes regularmente" },
          { value: false, label: "No, no uso lentes", icon: "no-glasses", desc: "No uso lentes" },
        ].map((option) => (
          <motion.button
            key={option.label}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelection(option.value)}
            className={`w-full text-left p-6 rounded-2xl border-2 transition-all ${
              formData.usesGlasses === option.value
                ? 'border-accent-blue bg-accent-blue/5 shadow-md'
                : 'border-studio-mist hover:border-accent-blue/50 hover:bg-studio-mist/30'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-studio-mist rounded-full flex items-center justify-center relative">
                {option.icon === 'glasses' ? (
                  <Eyeglasses size={24} className="text-slate" />
                ) : (
                  <div className="relative">
                    <Eyeglasses size={24} className="text-slate opacity-50" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-0.5 bg-red-500 transform rotate-45"></div>
                    </div>
                  </div>
                )}
              </div>
              <div>
                <div className="text-lg font-semibold text-ink">{option.label}</div>
                <div className="text-sm text-slate">{option.desc}</div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// Question 1: Glasses Type (only if uses glasses)
export function Question1({ formData, updateFormData, updateFormDataAndAdvance }: QuestionProps) {
  const toggleGlassesType = (type: string) => {
    const current = formData.glassesType || [];
    const updated = current.includes(type)
      ? current.filter(t => t !== type)
      : [...current, type];
    
    if (updateFormDataAndAdvance) {
      updateFormDataAndAdvance({ glassesType: updated }, false); // Don't auto-advance for multi-select
    } else {
      updateFormData({ glassesType: updated });
    }
  };

  // Texto dinámico basado en si usa lentes o no
  const usesGlasses = formData.usesGlasses;
  const questionTitle = usesGlasses === true ? "¿Qué tipo de lentes usas?" : "¿Qué tipo de lentes usarías?";
  const questionDesc = usesGlasses === true ? "Puedes seleccionar múltiples opciones" : "Selecciona los tipos que te interesarían";

  const glassesTypes = [
    { value: "prescription", label: "Lentes recetados", icon: Eyeglasses, desc: "Para corregir problemas de visión" },
    { value: "sunglasses", label: "Gafas de sol", icon: Sunglasses, desc: "Para protección solar" },
    { value: "reading", label: "Lentes de lectura", icon: BookOpen, desc: "Para leer o trabajo cercano" },
    { value: "computer", label: "Lentes para computadora", icon: Monitor, desc: "Para pantallas y luz azul" },
    { value: "safety", label: "Lentes de seguridad", icon: ShieldCheck, desc: "Para trabajo o deportes" },
    { value: "fashion", label: "Lentes de moda", icon: Star, desc: "Sin graduación, solo estética" },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">
          {questionTitle}
        </h2>
        <p className="text-lg text-slate max-w-2xl mx-auto">
          {questionDesc}
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {glassesTypes.map((type) => (
          <motion.button
            key={type.value}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => toggleGlassesType(type.value)}
            className={`text-left p-5 rounded-2xl border-2 transition-all ${
              formData.glassesType?.includes(type.value)
                ? 'border-accent-blue bg-accent-blue/5 shadow-md'
                : 'border-studio-mist hover:border-accent-blue/50 hover:bg-studio-mist/30'
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-studio-mist rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <type.icon size={16} className="text-slate" />
              </div>
              <div>
                <div className="text-base font-semibold text-ink">{type.label}</div>
                <div className="text-sm text-slate mt-1">{type.desc}</div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// Question 2: Vision Conditions
export function Question2({ formData, updateFormData, updateFormDataAndAdvance }: QuestionProps) {
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  const toggleVisionCondition = (condition: string) => {
    const current = formData.visionConditions || [];
    
    // Si selecciona "none", mostrar popup de confirmación
    if (condition === 'none' && !current.includes('none')) {
      setShowConfirmPopup(true);
      return;
    }
    
    let updated: string[];
    
    if (condition === 'none') {
      // Si deselecciona "none"
      updated = [];
    } else {
      // Si selecciona cualquier otra condición, remover "none" si está seleccionado
      const withoutNone = current.filter(c => c !== 'none');
      updated = withoutNone.includes(condition)
        ? withoutNone.filter(c => c !== condition)
        : [...withoutNone, condition];
    }
    
    if (updateFormDataAndAdvance) {
      updateFormDataAndAdvance({ visionConditions: updated }, false);
    } else {
      updateFormData({ visionConditions: updated });
    }
  };

  const confirmNoConditions = () => {
    const updated = ['none'];
    
    if (updateFormDataAndAdvance) {
      // Auto-advance cuando confirma que no tiene condiciones
      updateFormDataAndAdvance({ visionConditions: updated }, true);
    } else {
      updateFormData({ visionConditions: updated });
    }
    
    setShowConfirmPopup(false);
  };

  const cancelNoConditions = () => {
    setShowConfirmPopup(false);
  };

  const visionConditions = [
    { value: "myopia", label: "Miopía", desc: "Dificultad para ver de lejos", icon: MagnifyingGlass },
    { value: "hyperopia", label: "Hipermetropía", desc: "Dificultad para ver de cerca", icon: Eye },
    { value: "astigmatism", label: "Astigmatismo", desc: "Visión borrosa o distorsionada", icon: Waves },
    { value: "presbyopia", label: "Presbicia", desc: "Dificultad para enfocar de cerca (vista cansada)", icon: BookOpen },
    { value: "other", label: "Otra condición", desc: "Otra condición visual específica", icon: Question },
    { value: "none", label: "No tengo condiciones", desc: "Mi visión es normal", icon: CheckCircle },
  ];

  return (
    <>
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">
            ¿Tienes alguna condición visual?
          </h2>
          <p className="text-lg text-slate max-w-2xl mx-auto">
            Selecciona todas las que apliquen a tu situación
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {visionConditions.map((condition) => (
            <motion.button
              key={condition.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleVisionCondition(condition.value)}
              className={`text-left p-5 rounded-2xl border-2 transition-all ${
                formData.visionConditions?.includes(condition.value)
                  ? 'border-accent-blue bg-accent-blue/5 shadow-md'
                  : 'border-studio-mist hover:border-accent-blue/50 hover:bg-studio-mist/30'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <condition.icon size={16} className="text-orange-600" />
                </div>
                <div>
                  <div className="text-base font-semibold text-ink">{condition.label}</div>
                  <div className="text-sm text-slate mt-1">{condition.desc}</div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Popup de confirmación minimalista */}
      {showConfirmPopup && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 mx-4 max-w-sm shadow-2xl border border-studio-mist"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye size={20} className="text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-ink mb-2">
                ¿Estás seguro?
              </h3>
              <p className="text-sm text-slate mb-6">
                ¿Confirmas que no tienes ninguna condición visual?
              </p>
              
              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={cancelNoConditions}
                  className="flex-1 px-4 py-2 border border-studio-mist rounded-xl text-slate hover:bg-studio-mist/30 transition-all text-sm"
                >
                  Revisar
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={confirmNoConditions}
                  className="flex-1 px-4 py-2 bg-accent-blue text-white rounded-xl hover:bg-accent-blue/90 transition-all text-sm"
                >
                  Confirmar
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}

// Question 3: Prescription Strength
export function Question3({ formData, updateFormData, updateFormDataAndAdvance }: QuestionProps) {
  const [sliderValue, setSliderValue] = useState(formData.prescriptionStrength || 0);

  const handleSliderChange = (value: number) => {
    setSliderValue(value);
    if (updateFormDataAndAdvance) {
      updateFormDataAndAdvance({ prescriptionStrength: value }, false); // Don't auto-advance for slider
    } else {
      updateFormData({ prescriptionStrength: value });
    }
  };

  const handleQuickSelect = (value: number) => {
    setSliderValue(value);
    if (updateFormDataAndAdvance) {
      updateFormDataAndAdvance({ prescriptionStrength: value }, false);
    } else {
      updateFormData({ prescriptionStrength: value });
    }
  };

  const getStrengthLabel = (value: number) => {
    if (value === 0) return "No sé / No tengo graduación";
    if (value <= 2) return "Graduación ligera";
    if (value <= 4) return "Graduación moderada";
    if (value <= 6) return "Graduación alta";
    return "Graduación muy alta";
  };

  const getStrengthColor = (value: number) => {
    if (value === 0) return "text-slate";
    if (value <= 2) return "text-green-600";
    if (value <= 4) return "text-yellow-600";
    if (value <= 6) return "text-orange-600";
    return "text-red-600";
  };

  // Generate exact diopter values: 0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, etc.
  const getDiopterValue = (step: number) => {
    if (step === 0) return 0;
    return (step * 0.25);
  };

  const getDisplayValue = (value: number) => {
    if (value === 0) return "0";
    return value.toFixed(2).replace(/\.?0+$/, ''); // Remove trailing zeros
  };

  // Common diopter values for quick selection
  const commonValues = [0, 0.5, 1, 1.25, 1.5, 2, 2.5, 3, 4, 5, 6];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">
          ¿Conoces tu graduación?
        </h2>
        <p className="text-lg text-slate max-w-2xl mx-auto">
          Mueve el control o haz clic en un valor común
        </p>
      </div>
      
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="bg-white/50 p-8 rounded-2xl border border-studio-mist">
          <div className="text-center mb-8">
            <div className={`text-2xl font-bold ${getStrengthColor(sliderValue)} mb-2`}>
              {getStrengthLabel(sliderValue)}
            </div>
            <div className="text-lg font-mono text-ink mb-1">
              {sliderValue === 0 ? "Sin graduación" : `±${getDisplayValue(sliderValue)} dioptrías`}
            </div>
            <div className="text-sm text-slate">
              Graduación aproximada
            </div>
          </div>
          
          <div className="relative">
            <input
              type="range"
              min="0"
              max="32"
              step="1"
              value={sliderValue / 0.25}
              onChange={(e) => handleSliderChange(getDiopterValue(parseFloat(e.target.value)))}
              className="w-full h-3 bg-gradient-to-r from-green-200 via-yellow-200 via-orange-200 to-red-200 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, 
                  #dcfce7 0%, 
                  #fef3c7 25%, 
                  #fed7aa 50%, 
                  #fecaca 75%, 
                  #fca5a5 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-slate mt-2">
              <span>0</span>
              <span>2</span>
              <span>4</span>
              <span>6</span>
              <span>8+</span>
            </div>
            
            {/* Quick selection buttons */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {commonValues.map((value) => (
                <motion.button
                  key={value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleQuickSelect(value)}
                  className={`px-3 py-1 text-xs rounded-full border transition-all ${
                    sliderValue === value
                      ? 'bg-accent-blue text-white border-accent-blue'
                      : 'bg-white text-slate border-studio-mist hover:border-accent-blue/50 hover:bg-accent-blue/5'
                  }`}
                >
                  {value === 0 ? "No sé" : getDisplayValue(value)}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// Question 4: Age
export function Question4({ formData, updateFormData, updateFormDataAndAdvance }: QuestionProps) {
  const [ageInput, setAgeInput] = useState(formData.age?.toString() || '');

  const handleAgeChange = (value: string) => {
    setAgeInput(value);
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue > 0 && numValue < 120) {
      if (updateFormDataAndAdvance) {
        updateFormDataAndAdvance({ age: numValue }, false); // Don't auto-advance for input
      } else {
        updateFormData({ age: numValue });
      }
    } else {
      updateFormData({ age: null });
    }
  };

  const ageRanges = [
    { range: "18-25", label: "18 - 25 años", icon: Person, desc: "Joven adulto" },
    { range: "26-35", label: "26 - 35 años", icon: Person, desc: "Adulto joven" },
    { range: "36-45", label: "36 - 45 años", icon: Person, desc: "Adulto" },
    { range: "46-55", label: "46 - 55 años", icon: Person, desc: "Adulto maduro" },
    { range: "56+", label: "56+ años", icon: Person, desc: "Adulto mayor" },
  ];

  const selectAgeRange = (range: string) => {
    const [min, max] = range.split('-').map(n => n === '+' ? 65 : parseInt(n.replace('+', '')));
    const midPoint = max ? Math.floor((min + max) / 2) : min + 5;
    setAgeInput(midPoint.toString());
    
    if (updateFormDataAndAdvance) {
      updateFormDataAndAdvance({ age: midPoint });
    } else {
      updateFormData({ age: midPoint });
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">
          ¿Cuál es tu edad?
        </h2>
        <p className="text-lg text-slate max-w-2xl mx-auto">
          Esto nos ayuda a entender las necesidades por grupo demográfico
        </p>
      </div>
      
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center text-slate">
          <span className="text-sm">Selecciona tu rango de edad</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {ageRanges.map((range) => (
            <motion.button
              key={range.range}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => selectAgeRange(range.range)}
              className="text-left p-4 rounded-xl border-2 border-studio-mist hover:border-accent-blue/50 hover:bg-studio-mist/30 transition-all"
            >
              <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-studio-mist rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <range.icon size={16} className="text-slate" />
              </div>
                <div>
                  <div className="text-sm font-semibold text-ink">{range.label}</div>
                  <div className="text-xs text-slate">{range.desc}</div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="bg-white/30 p-4 rounded-xl border border-studio-mist/50">
          <label className="block text-xs font-medium text-slate mb-2">
            Edad exacta (opcional)
          </label>
          <input
            type="number"
            min="15"
            max="100"
            value={ageInput}
            onChange={(e) => handleAgeChange(e.target.value)}
            placeholder="Ej: 28"
            className="w-full p-3 text-lg text-center border border-studio-mist rounded-lg focus:border-accent-blue focus:outline-none transition-colors bg-white/50"
          />
        </div>
      </div>
    </div>
  );
}

// Question 5: Stopped Using Glasses
export function Question5({ formData, updateFormData, updateFormDataAndAdvance }: QuestionProps) {
  const handleSelection = (value: boolean) => {
    if (updateFormDataAndAdvance) {
      updateFormDataAndAdvance({ stoppedUsingGlasses: value });
    } else {
      updateFormData({ stoppedUsingGlasses: value });
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">
          ¿Alguna vez has dejado de usar unos lentes que te gustaban porque no veías bien con ellos?
        </h2>
        <p className="text-lg text-slate max-w-2xl mx-auto">
          Nos interesa saber si has tenido esta experiencia
        </p>
      </div>
      
      <div className="space-y-4 max-w-2xl mx-auto">
        {[
          { 
            value: true, 
            label: "Sí, me ha pasado", 
            icon: XCircle, 
            desc: "He tenido que dejar lentes que me gustaban por problemas de visión" 
          },
          { 
            value: false, 
            label: "No, nunca me ha pasado", 
            icon: Smiley, 
            desc: "Siempre he podido usar los lentes que me gustan" 
          },
        ].map((option) => (
          <motion.button
            key={option.label}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelection(option.value)}
            className={`w-full text-left p-6 rounded-2xl border-2 transition-all ${
              formData.stoppedUsingGlasses === option.value
                ? 'border-accent-blue bg-accent-blue/5 shadow-md'
                : 'border-studio-mist hover:border-accent-blue/50 hover:bg-studio-mist/30'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-studio-mist rounded-full flex items-center justify-center">
                <option.icon size={24} className="text-slate" />
              </div>
              <div>
                <div className="text-lg font-semibold text-ink">{option.label}</div>
                <div className="text-sm text-slate">{option.desc}</div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// Question 6: Reasons for Stopping (conditional)
export function Question6({ formData, updateFormData, updateFormDataAndAdvance }: QuestionProps) {
  const toggleReason = (reason: string) => {
    const current = formData.reasonsForStopping || [];
    const updated = current.includes(reason)
      ? current.filter(r => r !== reason)
      : [...current, reason];
    
    if (updateFormDataAndAdvance) {
      updateFormDataAndAdvance({ reasonsForStopping: updated }, false); // Don't auto-advance for multi-select
    } else {
      updateFormData({ reasonsForStopping: updated });
    }
  };

  const reasons = [
    { value: "prescription_wrong", label: "Graduación incorrecta", icon: Target, desc: "No tenían la graduación adecuada" },
    { value: "prescription_changed", label: "Mi graduación cambió", icon: TrendUp, desc: "Mi vista empeoró o mejoró" },
    { value: "uncomfortable", label: "Eran incómodos", icon: XCircle, desc: "No se sentían bien al usarlos" },
    { value: "broke", label: "Se rompieron", icon: Wrench, desc: "Se dañaron y no los pude reparar" },
    { value: "style_outdated", label: "Pasaron de moda", icon: ThumbsDown, desc: "Ya no me gustaba cómo se veían" },
    { value: "lifestyle_change", label: "Cambió mi estilo de vida", icon: ArrowsClockwise, desc: "Ya no encajaban con mis actividades" },
  ];

  // Skip this question if user never stopped using glasses
  if (formData.stoppedUsingGlasses === false) {
    return null;
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">
          ¿Por qué dejaste de usarlos?
        </h2>
        <p className="text-lg text-slate max-w-2xl mx-auto">
          Selecciona todas las razones que apliquen
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {reasons.map((reason) => (
          <motion.button
            key={reason.value}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => toggleReason(reason.value)}
            className={`text-left p-5 rounded-2xl border-2 transition-all ${
              formData.reasonsForStopping?.includes(reason.value)
                ? 'border-accent-blue bg-accent-blue/5 shadow-md'
                : 'border-studio-mist hover:border-accent-blue/50 hover:bg-studio-mist/30'
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <reason.icon size={16} className="text-orange-600" />
              </div>
              <div>
                <div className="text-base font-semibold text-ink">{reason.label}</div>
                <div className="text-sm text-slate mt-1">{reason.desc}</div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// Question 7: Interest in Removable Graduation
export function Question7({ formData, updateFormData, updateFormDataAndAdvance }: QuestionProps) {
  const handleSelection = (interest: string) => {
    if (updateFormDataAndAdvance) {
      updateFormDataAndAdvance({ interestInRemovableGraduation: interest });
    } else {
      updateFormData({ interestInRemovableGraduation: interest });
    }
  };

  const interests = [
    { 
      value: "very_interested", 
      label: "¡Me encantaría!", 
      icon: Heart, 
      desc: "Definitivamente los volvería a usar" 
    },
    { 
      value: "interested", 
      label: "Me interesa mucho", 
      icon: Heart, 
      desc: "Sería muy útil tener esa opción" 
    },
    { 
      value: "maybe", 
      label: "Tal vez", 
      icon: Question, 
      desc: "Dependería de otros factores" 
    },
    { 
      value: "not_sure", 
      label: "No estoy seguro/a", 
      icon: Question, 
      desc: "Necesitaría más información" 
    },
    { 
      value: "not_interested", 
      label: "No me interesa", 
      icon: XCircle, 
      desc: "Prefiero lentes tradicionales" 
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">
          Si pudieras agregar y quitar tu graduación a cualquier lente cuando quisieras...
        </h2>
        <p className="text-lg text-slate max-w-2xl mx-auto">
          ¿Cómo te sentirías? ¿Volverías a usar esos lentes que te gustaban?
        </p>
      </div>
      
      <div className="space-y-3 max-w-2xl mx-auto">
        {interests.map((interest) => (
          <motion.button
            key={interest.value}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelection(interest.value)}
            className={`w-full text-left p-5 rounded-2xl border-2 transition-all ${
              formData.interestInRemovableGraduation === interest.value
                ? 'border-accent-blue bg-accent-blue/5 shadow-md'
                : 'border-studio-mist hover:border-accent-blue/50 hover:bg-studio-mist/30'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-studio-mist rounded-full flex items-center justify-center">
                <interest.icon size={20} className="text-slate" />
              </div>
              <div>
                <div className="text-base font-semibold text-ink">{interest.label}</div>
                <div className="text-sm text-slate mt-1">{interest.desc}</div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
// Question 8: Glasses Usage Frequency
export function Question8({ formData, updateFormData, updateFormDataAndAdvance }: QuestionProps) {
  const handleSelection = (value: string) => {
    if (updateFormDataAndAdvance) {
      updateFormDataAndAdvance({ glassesUsageFrequency: value });
    } else {
      updateFormData({ glassesUsageFrequency: value });
    }
  };

  const frequencies = [
    { 
      value: "always", 
      label: "Todo el tiempo", 
      icon: Eyeglasses, 
      desc: "Los uso desde que me levanto hasta que me acuesto" 
    },
    { 
      value: "most_day", 
      label: "La mayor parte del día", 
      icon: Sunglasses, 
      desc: "Los uso para trabajo y actividades principales" 
    },
    { 
      value: "specific_activities", 
      label: "Para actividades específicas", 
      icon: BookOpen, 
      desc: "Solo para leer, computadora, conducir, etc." 
    },
    { 
      value: "occasionally", 
      label: "Ocasionalmente", 
      icon: Clock, 
      desc: "Dependiendo de la situación o mi estado de ánimo" 
    },
    { 
      value: "rarely", 
      label: "Casi nunca", 
      icon: Timer, 
      desc: "Solo en situaciones muy específicas" 
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">
          ¿Con qué frecuencia usas lentes?
        </h2>
        <p className="text-lg text-slate max-w-2xl mx-auto">
          Esto nos ayuda a entender tus patrones de uso
        </p>
      </div>
      
      <div className="space-y-3 max-w-2xl mx-auto">
        {frequencies.map((freq) => (
          <motion.button
            key={freq.value}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelection(freq.value)}
            className={`w-full text-left p-5 rounded-2xl border-2 transition-all ${
              formData.glassesUsageFrequency === freq.value
                ? 'border-accent-blue bg-accent-blue/5 shadow-md'
                : 'border-studio-mist hover:border-accent-blue/50 hover:bg-studio-mist/30'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-studio-mist rounded-full flex items-center justify-center">
                <freq.icon size={20} className="text-slate" />
              </div>
              <div>
                <div className="text-base font-semibold text-ink">{freq.label}</div>
                <div className="text-sm text-slate mt-1">{freq.desc}</div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// Question 9: Lifestyle Factors
export function Question9({ formData, updateFormData, updateFormDataAndAdvance }: QuestionProps) {
  const toggleLifestyleFactor = (factor: string) => {
    const current = formData.lifestyleFactors || [];
    const updated = current.includes(factor)
      ? current.filter(f => f !== factor)
      : [...current, factor];
    
    if (updateFormDataAndAdvance) {
      updateFormDataAndAdvance({ lifestyleFactors: updated }, false); // Don't auto-advance for multi-select
    } else {
      updateFormData({ lifestyleFactors: updated });
    }
  };

  const lifestyleFactors = [
    { value: "professional_work", label: "Trabajo profesional", icon: Briefcase, desc: "Oficina, reuniones, presentaciones" },
    { value: "student", label: "Estudiante", icon: GraduationCap, desc: "Universidad, clases, biblioteca" },
    { value: "screen_intensive", label: "Trabajo con pantallas", icon: Desktop, desc: "Programación, diseño, análisis" },
    { value: "social_active", label: "Muy social", icon: Users, desc: "Eventos y reuniones frecuentes" },
    { value: "fashion_conscious", label: "Consciente de la moda", icon: Star, desc: "La apariencia es importante para mí" },
    { value: "sports_active", label: "Deportista activo", icon: Person, desc: "Ejercicio o deportes regulares" },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">
          ¿Cuál describe mejor tu estilo de vida?
        </h2>
        <p className="text-lg text-slate max-w-2xl mx-auto">
          Selecciona todos los que se aplican a tu situación
        </p>
      </div>
      
      <div className="space-y-3 max-w-2xl mx-auto">
        {lifestyleFactors.map((factor) => (
          <motion.button
            key={factor.value}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => toggleLifestyleFactor(factor.value)}
            className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${
              formData.lifestyleFactors?.includes(factor.value)
                ? 'border-accent-blue bg-accent-blue/5 shadow-md'
                : 'border-studio-mist hover:border-accent-blue/50 hover:bg-studio-mist/30'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-studio-mist rounded-full flex items-center justify-center flex-shrink-0">
                <factor.icon size={20} className="text-slate" />
              </div>
              <div>
                <div className="text-base font-semibold text-ink">{factor.label}</div>
                <div className="text-sm text-slate mt-1">{factor.desc}</div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// Question 10: Purchase Influencers (Final Question)
export function Question10({ formData, updateFormData, updateFormDataAndAdvance }: QuestionProps) {
  const [firstName, setFirstName] = useState(formData.firstName || '');
  const [lastName, setLastName] = useState(formData.lastName || '');

  const handleFirstNameChange = (value: string) => {
    setFirstName(value);
    const updates = { firstName: value };
    if (updateFormDataAndAdvance) {
      updateFormDataAndAdvance(updates, false); // Don't auto-advance for text input
    } else {
      updateFormData(updates);
    }
  };

  const handleLastNameChange = (value: string) => {
    setLastName(value);
    const updates = { lastName: value };
    if (updateFormDataAndAdvance) {
      updateFormDataAndAdvance(updates, false); // Don't auto-advance for text input
    } else {
      updateFormData(updates);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">
          ¿Cuál es tu primer nombre y apellido?
        </h2>
        <p className="text-lg text-slate max-w-2xl mx-auto">
          Esta información nos ayuda a personalizar tu experiencia
        </p>
      </div>
      
      <div className="max-w-md mx-auto space-y-4">
        <div>
          <label className="block text-sm font-medium text-ink mb-2">
            Primer nombre
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => handleFirstNameChange(e.target.value)}
            placeholder="Ej: María"
            className="w-full px-4 py-3 border-2 border-studio-mist rounded-xl focus:border-accent-blue focus:outline-none transition-colors"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-ink mb-2">
            Apellido
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => handleLastNameChange(e.target.value)}
            placeholder="Ej: González"
            className="w-full px-4 py-3 border-2 border-studio-mist rounded-xl focus:border-accent-blue focus:outline-none transition-colors"
          />
        </div>
      </div>
    </div>
  );
}