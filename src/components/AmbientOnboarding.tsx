'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';

interface PreferenceQuestion {
  id: string;
  question: string;
  options: string[];
  multi?: boolean;
}

const questions: PreferenceQuestion[] = [
  {
    id: 'style',
    question: "What's your style?",
    options: ['Minimalist', 'Modern', 'Classic', 'Eclectic'],
    multi: true,
  },
  {
    id: 'interests',
    question: 'What are you interested in?',
    options: ['Tech', 'Fashion', 'Home & Living', 'Sports', 'Books', 'Art'],
    multi: true,
  },
  {
    id: 'budget',
    question: 'Your typical budget?',
    options: ['Budget-Friendly', 'Mid-Range', 'Premium', 'Luxury'],
  },
];

export function AmbientOnboarding() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, string[]>>({});
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Check if user has already completed onboarding
    const hasOnboarded = localStorage.getItem('onboarding_complete');
    if (!hasOnboarded) {
      // Show after a brief delay for ambient feel
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSelection = (option: string) => {
    const question = questions[currentStep];
    const currentSelections = selections[question.id] || [];

    let newSelections: string[];
    if (question.multi) {
      newSelections = currentSelections.includes(option)
        ? currentSelections.filter(s => s !== option)
        : [...currentSelections, option];
    } else {
      newSelections = [option];
    }

    setSelections({ ...selections, [question.id]: newSelections });
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save preferences
      localStorage.setItem('user_preferences', JSON.stringify(selections));
      localStorage.setItem('onboarding_complete', 'true');
      setIsComplete(true);
      setTimeout(() => setIsVisible(false), 1500);
    }
  };

  const handleSkip = () => {
    localStorage.setItem('onboarding_complete', 'true');
    setIsVisible(false);
  };

  const currentQuestion = questions[currentStep];
  const currentSelections = selections[currentQuestion?.id] || [];
  const canProceed = currentSelections.length > 0;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && handleSkip()}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-[var(--card-bg)] rounded-3xl shadow-2xl max-w-xl w-full p-10 relative overflow-hidden"
          >
            <button
              onClick={handleSkip}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-[var(--secondary)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              aria-label="Skip onboarding"
            >
              <X className="w-5 h-5" />
            </button>

            {isComplete ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-[var(--secondary)] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-10 h-10 text-[var(--foreground)]" />
                </div>
                <h3 className="text-3xl font-bold mb-3 tracking-tight">All set!</h3>
                <p className="text-[var(--muted-foreground)] text-lg">
                  We're curating your personal shopping universe...
                </p>
              </motion.div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-full bg-[var(--secondary)] flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-[var(--foreground)]" />
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight">
                    Personalize your feed
                  </h2>
                </div>

                <div className="mb-10">
                  <div className="flex gap-2 mb-8">
                    {questions.map((_, idx) => (
                      <div
                        key={idx}
                        className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                          idx <= currentStep
                            ? 'bg-[var(--foreground)]'
                            : 'bg-[var(--secondary)]'
                        }`}
                      />
                    ))}
                  </div>

                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-2xl font-semibold mb-2">
                      {currentQuestion.question}
                    </h3>
                    <p className="text-base text-[var(--muted-foreground)] mb-8">
                      {currentQuestion.multi
                        ? 'Select all that apply'
                        : 'Select one option'}
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                      {currentQuestion.options.map((option) => {
                        const isSelected = currentSelections.includes(option);
                        return (
                          <button
                            key={option}
                            onClick={() => handleSelection(option)}
                            className={`
                              p-5 rounded-xl border-2 transition-all text-left relative overflow-hidden group
                              ${
                                isSelected
                                  ? 'border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]'
                                  : 'border-[var(--card-border)] hover:border-[var(--muted)] bg-[var(--background)]'
                              }
                            `}
                          >
                            <span className="font-medium text-lg relative z-10">{option}</span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-[var(--card-border)]">
                  <button
                    onClick={handleSkip}
                    className="flex-1 py-4 px-6 rounded-full font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors"
                  >
                    Skip
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!canProceed}
                    className={`
                      flex-[2] py-4 px-6 rounded-full font-semibold text-lg transition-all shadow-lg
                      ${
                        canProceed
                          ? 'bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 hover:shadow-xl transform hover:-translate-y-0.5'
                          : 'bg-[var(--secondary)] text-[var(--muted-foreground)] cursor-not-allowed shadow-none'
                      }
                    `}
                  >
                    {currentStep === questions.length - 1 ? 'Complete Setup' : 'Continue'}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
