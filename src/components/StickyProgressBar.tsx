import React from 'react';
import { SuccessCheck } from '../types';
import { Check, Sparkles } from 'lucide-react';

interface StickyProgressBarProps {
  checks: SuccessCheck[];
  activeStep: number;
  onSelectStep: (stepNumber: number) => void;
}

export const StickyProgressBar: React.FC<StickyProgressBarProps> = ({
  checks,
  activeStep,
  onSelectStep,
}) => {
  const completedCount = checks.filter((c) => c.completed).length;
  const totalCount = checks.length;
  const percent = Math.round((completedCount / totalCount) * 100);

  const stepTitles = [
    '1. Meet Concept',
    '2. Explore Trends',
    '3. Worked Example',
    '4. Plot Graph',
    '5. Exam Challenge',
  ];

  return (
    <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-amber-200/70 py-2.5 px-4 sm:px-6 shadow-2xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left summary */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-stone-700 whitespace-nowrap">
              Goal Progress:
            </span>
            <span className="text-xs font-bold text-amber-950 bg-amber-100 px-2.5 py-0.5 rounded border border-amber-300 tabular-nums">
              {completedCount} / {totalCount} Done ({percent}%)
            </span>
          </div>

          <div className="w-28 sm:w-36 bg-amber-100/60 h-2 rounded-full overflow-hidden border border-amber-200">
            <div
              className="bg-amber-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {/* Step quick jumps */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {[1, 2, 3, 4, 5].map((step) => {
            const isCompleted = checks.find((c) => c.stepNumber === step)?.completed;
            const isCurrent = activeStep === step;

            return (
              <button
                key={step}
                onClick={() => onSelectStep(step)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                  isCurrent
                    ? 'bg-amber-500 text-stone-950 font-bold border border-amber-400 shadow-2xs'
                    : isCompleted
                    ? 'bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100/80'
                    : 'bg-stone-50 text-stone-600 border border-stone-200 hover:bg-amber-50/60'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-3 h-3 text-amber-700 stroke-[3]" />
                ) : (
                  <span className="w-3.5 h-3.5 rounded-full bg-amber-100 text-amber-900 text-[10px] flex items-center justify-center font-bold">
                    {step}
                  </span>
                )}
                <span>{stepTitles[step - 1]}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
