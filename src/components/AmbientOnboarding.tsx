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
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && handleSkip()}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[var(--card-bg)] rounded-2xl shadow-2xl max-w-lg w-full p-8 relative"
          >
            <button
              onClick={handleSkip}
              className="absolute top-4 right-4 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              aria-label="Skip onboarding"
            >
              <X className="w-5 h-5" />
            </button>

            {isComplete ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <Sparkles className="w-12 h-12 mx-auto mb-4 text-[var(--primary)]" />
                <h3 className="text-2xl font-semibold mb-2">All set!</h3>
                <p className="text-[var(--muted-foreground)]">
                  We're personalizing your experience...
                </p>
              </motion.div>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="w-6 h-6 text-[var(--primary)]" />
                  <h2 className="text-2xl font-semibold">
                    Let's personalize your feed
                  </h2>
                </div>

                <div className="mb-8">
                  <div className="flex gap-2 mb-6">
                    {questions.map((_, idx) => (
                      <div
                        key={idx}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          idx <= currentStep
                            ? 'bg-[var(--primary)]'
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
                  >
                    <h3 className="text-xl font-medium mb-4">
                      {currentQuestion.question}
                    </h3>
                    <p className="text-sm text-[var(--muted-foreground)] mb-6">
                      {currentQuestion.multi
                        ? 'Choose all that apply'
                        : 'Choose one'}
                    </p>

                    <div className="grid grid-cols-2 gap-3">
                      {currentQuestion.options.map((option) => {
                        const isSelected = currentSelections.includes(option);
                        return (
                          <button
                            key={option}
                            onClick={() => handleSelection(option)}
                            className={`
                              p-4 rounded-lg border-2 transition-all text-left
                              ${
                                isSelected
                                  ? 'border-[var(--primary)] bg-[var(--primary)]/10'
                                  : 'border-[var(--card-border)] hover:border-[var(--muted)]'
                              }
                            `}
                          >
                            <span className="font-medium">{option}</span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleSkip}
                    className="flex-1 py-3 px-4 rounded-lg border border-[var(--card-border)] hover:bg-[var(--secondary)] transition-colors"
                  >
                    Skip for now
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!canProceed}
                    className={`
                      flex-1 py-3 px-4 rounded-lg font-medium transition-all
                      ${
                        canProceed
                          ? 'bg-[var(--primary)] text-white hover:opacity-90'
                          : 'bg-[var(--secondary)] text-[var(--muted-foreground)] cursor-not-allowed'
                      }
                    `}
                  >
                    {currentStep === questions.length - 1 ? 'Complete' : 'Next'}
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
