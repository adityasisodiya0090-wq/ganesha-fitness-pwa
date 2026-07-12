import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Calculator, Sparkles, Scale, Heart, Apple } from 'lucide-react';

type UnitSystem = 'metric' | 'imperial';
type Gender = 'male' | 'female';
type FitnessGoal = 'loss' | 'maintain' | 'gain';

export default function BmiCalorieCalculator() {
  const [unit, setUnit] = useState<UnitSystem>('metric');
  const [gender, setGender] = useState<Gender>('male');
  const [age, setAge] = useState<number>(25);
  const [goal, setGoal] = useState<FitnessGoal>('maintain');

  // Metric states
  const [weightKg, setWeightKg] = useState<number>(75);
  const [heightCm, setHeightCm] = useState<number>(175);

  // Imperial states (calculated dynamically or linked to keep inputs synchronized)
  const [weightLbs, setWeightLbs] = useState<number>(165);
  const [heightFt, setHeightFt] = useState<number>(5);
  const [heightIn, setHeightIn] = useState<number>(9);

  // Activity levels (Harris-Benedict multipliers)
  const activityLevels = [
    { value: 1.2, label: 'Sedentary', desc: 'Minimal exercise, office workspace' },
    { value: 1.375, label: 'Lightly Active', desc: 'Light workout 1-3 times/week' },
    { value: 1.55, label: 'Moderately Active', desc: 'Heavy strength training 3-5 times/week' },
    { value: 1.725, label: 'Very Active', desc: 'Elite compound lifting 6-7 times/week' },
    { value: 1.9, label: 'Athletic/Professional', desc: 'Twice-daily heavy training or hard labor' },
  ];
  const [activity, setActivity] = useState<number>(1.55);

  // Synchronize metric & imperial values on system toggle to avoid disjointed user states
  useEffect(() => {
    if (unit === 'metric') {
      // Imperial to Metric conversion
      const totalInches = heightFt * 12 + heightIn;
      const calculatedCm = Math.round(totalInches * 2.54);
      const calculatedKg = Math.round(weightLbs * 0.453592);
      setHeightCm(calculatedCm);
      setWeightKg(calculatedKg);
    } else {
      // Metric to Imperial conversion
      const calculatedLbs = Math.round(weightKg / 0.453592);
      const totalInches = heightCm / 2.54;
      const calculatedFt = Math.floor(totalInches / 12);
      const calculatedIn = Math.round(totalInches % 12);
      setWeightLbs(calculatedLbs);
      setHeightFt(calculatedFt);
      setHeightIn(calculatedIn);
    }
  }, [unit]);

  // Calculations
  const calculateBmi = (): { bmi: number; category: string; color: string; percent: number } => {
    let w = weightKg;
    let h = heightCm / 100;

    if (unit === 'imperial') {
      const totalInches = heightFt * 12 + heightIn;
      w = weightLbs * 0.453592;
      h = (totalInches * 2.54) / 100;
    }

    if (!w || !h) return { bmi: 0, category: 'Unknown', color: 'text-gray-400', percent: 0 };
    const bmiVal = parseFloat((w / (h * h)).toFixed(1));

    let cat = 'Normal Weight';
    let col = 'text-gold-500';
    let percent = 50; // default for bar centering

    if (bmiVal < 18.5) {
      cat = 'Underweight';
      col = 'text-sky-400';
      percent = Math.max(10, (bmiVal / 18.5) * 40);
    } else if (bmiVal >= 18.5 && bmiVal < 25) {
      cat = 'Optimal Athletic Range';
      col = 'text-gold-500';
      percent = 40 + ((bmiVal - 18.5) / 6.5) * 25;
    } else if (bmiVal >= 25 && bmiVal < 30) {
      cat = 'Overweight';
      col = 'text-amber-500';
      percent = 65 + ((bmiVal - 25) / 5) * 20;
    } else {
      cat = 'Obese Range';
      col = 'text-red-500';
      percent = Math.min(100, 85 + ((bmiVal - 30) / 10) * 15);
    }

    return { bmi: bmiVal, category: cat, color: col, percent };
  };

  const calculateCalories = (): { bmr: number; tdee: number; target: number; macros: { protein: number; carbs: number; fats: number } } => {
    let w = weightKg;
    let h = heightCm;

    if (unit === 'imperial') {
      w = weightLbs * 0.453592;
      h = (heightFt * 12 + heightIn) * 2.54;
    }

    // Mifflin-St Jeor Equation (highly accurate for active/gym populations)
    let bmr = 0;
    if (gender === 'male') {
      bmr = 10 * w + 6.25 * h - 5 * age + 5;
    } else {
      bmr = 10 * w + 6.25 * h - 5 * age - 161;
    }

    const tdee = Math.round(bmr * activity);

    // Goal adjustments
    let target = tdee;
    if (goal === 'loss') target = tdee - 500;
    if (goal === 'gain') target = tdee + 350;

    // Premium Sports Nutrition Macro Splitting
    // Hypertrophy/Strength focus: Protein 2.2g per kg, Fats 25% of calories, rest Carbs
    const bodyWeightForMacros = unit === 'imperial' ? weightLbs * 0.453592 : weightKg;
    
    // Ensure protein target is substantial but safe
    let proteinGrams = Math.round(bodyWeightForMacros * 2.1);
    if (goal === 'gain') proteinGrams = Math.round(bodyWeightForMacros * 2.3);
    if (goal === 'loss') proteinGrams = Math.round(bodyWeightForMacros * 2.4); // higher retention during deficit

    const proteinCalories = proteinGrams * 4;
    const fatCalories = Math.round(target * 0.25);
    const fatGrams = Math.round(fatCalories / 9);

    const remainingCalories = target - (proteinCalories + fatCalories);
    const carbGrams = Math.max(20, Math.round(remainingCalories / 4));

    return {
      bmr: Math.round(bmr),
      tdee,
      target,
      macros: {
        protein: proteinGrams,
        carbs: carbGrams,
        fats: fatGrams,
      },
    };
  };

  const bmiResult = useMemo(() => calculateBmi(), [unit, weightKg, heightCm, weightLbs, heightFt, heightIn]);
  const calorieResult = useMemo(() => calculateCalories(), [unit, gender, age, goal, weightKg, heightCm, weightLbs, heightFt, heightIn, activity]);

  return (
    <div id="calculator-section" className="w-full max-w-6xl mx-auto bg-charcoal/30 border border-gold-500/10 rounded-sm p-6 sm:p-8 lg:p-10 backdrop-blur-md">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
        
        {/* INPUT COLUMN */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between border-b border-gold-500/10 pb-4">
            <div className="flex items-center gap-3">
              <Calculator className="w-5 h-5 text-gold-500" />
              <h3 className="font-display font-bold text-lg text-white uppercase tracking-wider">
                Biometric Analyzer
              </h3>
            </div>
            {/* Unit Toggle */}
            <div className="flex border border-gold-500/15 rounded-full p-0.5 bg-matte">
              <button
                type="button"
                id="toggle-unit-metric"
                onClick={() => setUnit('metric')}
                className={`px-3 py-1 text-[10px] font-mono rounded-full uppercase tracking-wider transition-all duration-300 ${
                  unit === 'metric'
                    ? 'bg-gold-500 text-black font-bold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Metric (kg/cm)
              </button>
              <button
                type="button"
                id="toggle-unit-imperial"
                onClick={() => setUnit('imperial')}
                className={`px-3 py-1 text-[10px] font-mono rounded-full uppercase tracking-wider transition-all duration-300 ${
                  unit === 'imperial'
                    ? 'bg-gold-500 text-black font-bold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Imperial (lbs/ft)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Gender Input */}
            <div className="space-y-2">
              <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest font-semibold">
                Gender Assignment
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  id="gender-male"
                  onClick={() => setGender('male')}
                  className={`py-3 text-xs font-mono rounded-sm border uppercase tracking-wider transition-all duration-300 ${
                    gender === 'male'
                      ? 'border-gold-500 bg-gold-500/10 text-gold-500'
                      : 'border-white/5 bg-matte/40 text-gray-400 hover:text-white'
                  }`}
                >
                  Male
                </button>
                <button
                  type="button"
                  id="gender-female"
                  onClick={() => setGender('female')}
                  className={`py-3 text-xs font-mono rounded-sm border uppercase tracking-wider transition-all duration-300 ${
                    gender === 'female'
                      ? 'border-gold-500 bg-gold-500/10 text-gold-500'
                      : 'border-white/5 bg-matte/40 text-gray-400 hover:text-white'
                  }`}
                >
                  Female
                </button>
              </div>
            </div>

            {/* Age Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest font-semibold">
                  Biological Age
                </label>
                <span className="font-mono text-xs text-gold-500 font-bold">{age} yrs</span>
              </div>
              <input
                type="range"
                id="age-slider"
                min="14"
                max="85"
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value))}
                className="w-full accent-gold-500 h-1 bg-matte rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* Weight Input */}
          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest font-semibold">
                Body Mass / Weight
              </label>
              <span className="font-mono text-sm text-gold-500 font-bold">
                {unit === 'metric' ? `${weightKg} kg` : `${weightLbs} lbs`}
              </span>
            </div>
            {unit === 'metric' ? (
              <input
                type="range"
                id="weight-kg-slider"
                min="40"
                max="160"
                value={weightKg}
                onChange={(e) => setWeightKg(parseInt(e.target.value))}
                className="w-full accent-gold-500 h-1 bg-matte rounded-lg appearance-none cursor-pointer"
              />
            ) : (
              <input
                type="range"
                id="weight-lbs-slider"
                min="88"
                max="350"
                value={weightLbs}
                onChange={(e) => setWeightLbs(parseInt(e.target.value))}
                className="w-full accent-gold-500 h-1 bg-matte rounded-lg appearance-none cursor-pointer"
              />
            )}
          </div>

          {/* Height Input */}
          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest font-semibold">
                Stature / Height
              </label>
              <span className="font-mono text-sm text-gold-500 font-bold">
                {unit === 'metric'
                  ? `${heightCm} cm`
                  : `${heightFt} ft ${heightIn} in`}
              </span>
            </div>
            {unit === 'metric' ? (
              <input
                type="range"
                id="height-cm-slider"
                min="130"
                max="220"
                value={heightCm}
                onChange={(e) => setHeightCm(parseInt(e.target.value))}
                className="w-full accent-gold-500 h-1 bg-matte rounded-lg appearance-none cursor-pointer"
              />
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-gray-500 uppercase">Feet</span>
                  <input
                    type="range"
                    id="height-ft-slider"
                    min="4"
                    max="7"
                    value={heightFt}
                    onChange={(e) => setHeightFt(parseInt(e.target.value))}
                    className="w-full accent-gold-500 h-1 bg-matte rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-gray-500 uppercase">Inches</span>
                  <input
                    type="range"
                    id="height-in-slider"
                    min="0"
                    max="11"
                    value={heightIn}
                    onChange={(e) => setHeightIn(parseInt(e.target.value))}
                    className="w-full accent-gold-500 h-1 bg-matte rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Activity Level Selector */}
          <div className="space-y-2">
            <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest font-semibold mb-1">
              METABOLIC & ACTIVITY COEFFICIENT
            </label>
            <div className="space-y-2">
              {activityLevels.map((act) => (
                <button
                  key={act.value}
                  type="button"
                  id={`activity-level-${act.label.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => setActivity(act.value)}
                  className={`w-full flex justify-between items-center p-3 rounded-sm border text-left transition-all duration-300 ${
                    activity === act.value
                      ? 'border-gold-500 bg-gold-500/[0.04] text-white'
                      : 'border-white/5 bg-matte/30 text-gray-400 hover:text-white hover:border-gold-500/10'
                  }`}
                >
                  <div>
                    <span className="block text-xs font-mono font-bold tracking-wider">{act.label}</span>
                    <span className="block text-[10px] text-gray-500 font-sans mt-0.5">{act.desc}</span>
                  </div>
                  <span className="font-mono text-[10px] text-gold-500 bg-gold-500/10 px-2 py-0.5 rounded-sm font-semibold">
                    x{act.value.toFixed(3)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Goal Selector */}
          <div className="space-y-2">
            <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest font-semibold mb-1">
              PRIMARY PHARMACEUTICAL/TRAINING GOAL
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                id="goal-loss"
                onClick={() => setGoal('loss')}
                className={`py-3 px-1 text-[10px] font-mono rounded-sm border uppercase tracking-wider text-center transition-all duration-300 ${
                  goal === 'loss'
                    ? 'border-gold-500 bg-gold-500/10 text-gold-500 font-bold'
                    : 'border-white/5 bg-matte/40 text-gray-400 hover:text-white'
                }`}
              >
                Fat Deficit (-500)
              </button>
              <button
                type="button"
                id="goal-maintain"
                onClick={() => setGoal('maintain')}
                className={`py-3 px-1 text-[10px] font-mono rounded-sm border uppercase tracking-wider text-center transition-all duration-300 ${
                  goal === 'maintain'
                    ? 'border-gold-500 bg-gold-500/10 text-gold-500 font-bold'
                    : 'border-white/5 bg-matte/40 text-gray-400 hover:text-white'
                }`}
              >
                Maintenance (TDEE)
              </button>
              <button
                type="button"
                id="goal-gain"
                onClick={() => setGoal('gain')}
                className={`py-3 px-1 text-[10px] font-mono rounded-sm border uppercase tracking-wider text-center transition-all duration-300 ${
                  goal === 'gain'
                    ? 'border-gold-500 bg-gold-500/10 text-gold-500 font-bold'
                    : 'border-white/5 bg-matte/40 text-gray-400 hover:text-white'
                }`}
              >
                Muscle Surplus (+350)
              </button>
            </div>
          </div>
        </div>

        {/* OUTPUT COLUMN (THE RESULTS CARD) */}
        <div className="flex-1 flex flex-col justify-between space-y-8 bg-matte/50 p-6 sm:p-8 rounded-sm border border-gold-500/5 relative overflow-hidden">
          {/* Subtle Ambient Background Flare */}
          <div className="absolute -top-16 -right-16 w-32 h-32 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* BMI Analysis Card */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gold-500">
              <Scale className="w-4 h-4" />
              <span className="font-mono text-[10px] uppercase tracking-widest font-bold">
                Body Composition Quotient
              </span>
            </div>
            
            <div className="flex justify-between items-end border-b border-white/5 pb-4">
              <div>
                <span className="block text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                  Calculated BMI
                </span>
                <span className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight mt-1 inline-block">
                  {bmiResult.bmi}
                </span>
              </div>
              <div className="text-right">
                <span className="block text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                  Classification
                </span>
                <span className={`block font-mono text-xs uppercase tracking-wider font-bold mt-1.5 ${bmiResult.color}`}>
                  {bmiResult.category}
                </span>
              </div>
            </div>

            {/* Gauge slider */}
            <div className="space-y-1">
              <div className="relative w-full h-1.5 bg-matte rounded-full overflow-hidden">
                <motion.div
                  className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-gold-500/50 to-gold-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${bmiResult.percent}%` }}
                  transition={{ type: 'spring', stiffness: 80, damping: 15 }}
                />
              </div>
              <div className="flex justify-between text-[8px] font-mono text-gray-500">
                <span>&lt; 18.5 (LEAN)</span>
                <span>18.5 - 24.9 (ATHLETIC)</span>
                <span>25 - 29.9 (MODERATE)</span>
                <span>30+ (HEAVY)</span>
              </div>
            </div>
          </div>

          {/* Caloric Intake Metrics */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gold-500">
              <Flame className="w-4 h-4" />
              <span className="font-mono text-[10px] uppercase tracking-widest font-bold">
                Metabolic Energy Profile
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-charcoal/50 border border-white/5 rounded-sm">
                <span className="block text-[8px] font-mono text-gray-500 uppercase tracking-widest">
                  Basal Metabolic (BMR)
                </span>
                <span className="block font-display font-bold text-lg sm:text-xl text-white mt-1">
                  {calorieResult.bmr} <span className="font-mono text-[10px] text-gray-400 font-normal">kcal</span>
                </span>
                <span className="block text-[9px] text-gray-400 mt-1 font-sans">
                  Daily basic survival cost.
                </span>
              </div>

              <div className="p-4 bg-charcoal/50 border border-white/5 rounded-sm">
                <span className="block text-[8px] font-mono text-gray-500 uppercase tracking-widest">
                  Total Expenditure (TDEE)
                </span>
                <span className="block font-display font-bold text-lg sm:text-xl text-white mt-1">
                  {calorieResult.tdee} <span className="font-mono text-[10px] text-gray-400 font-normal">kcal</span>
                </span>
                <span className="block text-[9px] text-gray-400 mt-1 font-sans">
                  Includes active motion state.
                </span>
              </div>
            </div>

            {/* Target Daily Calorie Intake Box */}
            <div className="p-5 bg-gold-500/[0.03] border border-gold-500/20 rounded-sm text-center">
              <span className="block text-[10px] font-mono text-gold-500 uppercase tracking-widest font-semibold">
                RECOMMENDED DAILY TARGET CALORIES
              </span>
              <span className="block font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight mt-2">
                {calorieResult.target} <span className="font-mono text-sm text-gold-500 font-medium">KCAL / DAY</span>
              </span>
              <p className="text-[10px] text-gray-400 font-sans mt-2 leading-relaxed">
                Consume this targeted energy limit to systematically reach your designated weight target.
              </p>
            </div>
          </div>

          {/* Sports Science Macronutrient Splits */}
          <div className="space-y-4 pt-4 border-t border-white/5">
            <div className="flex items-center gap-2 text-gold-500">
              <Apple className="w-4 h-4" />
              <span className="font-mono text-[10px] uppercase tracking-widest font-bold">
                Engineered Performance Macro Split
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-3 bg-charcoal/30 border border-white/5 rounded-sm">
                <span className="block text-[8px] font-mono text-gold-500 font-bold uppercase tracking-wider">
                  PROTEIN (HIGH)
                </span>
                <span className="block font-display font-bold text-base text-white mt-1">
                  {calorieResult.macros.protein}g
                </span>
                <span className="block text-[8px] text-gray-500 mt-0.5 font-mono">
                  {calorieResult.macros.protein * 4} kcal
                </span>
              </div>

              <div className="p-3 bg-charcoal/30 border border-white/5 rounded-sm">
                <span className="block text-[8px] font-mono text-gray-300 font-bold uppercase tracking-wider">
                  CARBS (MODERATE)
                </span>
                <span className="block font-display font-bold text-base text-white mt-1">
                  {calorieResult.macros.carbs}g
                </span>
                <span className="block text-[8px] text-gray-500 mt-0.5 font-mono">
                  {calorieResult.macros.carbs * 4} kcal
                </span>
              </div>

              <div className="p-3 bg-charcoal/30 border border-white/5 rounded-sm">
                <span className="block text-[8px] font-mono text-amber-500 font-bold uppercase tracking-wider">
                  FAT (ESSENTIAL)
                </span>
                <span className="block font-display font-bold text-base text-white mt-1">
                  {calorieResult.macros.fats}g
                </span>
                <span className="block text-[8px] text-gray-500 mt-0.5 font-mono">
                  {calorieResult.macros.fats * 9} kcal
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-gold-500/5 rounded-sm border border-gold-500/10">
              <Sparkles className="w-3.5 h-3.5 text-gold-500 shrink-0" />
              <span className="text-[9px] text-gray-400 font-sans leading-tight">
                <strong>Macro Methodology:</strong> Tailored for strength retention and athletic muscle development. For fully individualized nutrition plans, connect with our Head Coach Amit Shinde.
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
