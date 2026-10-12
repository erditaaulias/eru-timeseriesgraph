import React from 'react';
import { CheckCircle2, Circle, Target, Sparkles, ArrowRight } from 'lucide-react';
import { SuccessCheck } from '../types';

interface LearningGoalsCardProps {
  checks: SuccessCheck[];
  onJumpToStep: (step: number) => void;
}

export const LearningGoalsCard: React.FC<LearningGoalsCardProps> = ({
  checks,
  onJumpToStep,
}) => {
  const completedCount = checks.filter((c) => c.completed).length;
  const totalCount = checks.length;
  const percent = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="w-full">
      {/* Main Goal Hero Card */}
      <div className="bg-white border border-amber-200/80 rounded-2xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20 opacity-70" />

        <div className="relative z-10">
          {/* Metadata kicker */}
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 mb-2">
            <span className="text-amber-800 font-bold uppercase tracking-wider">Cambridge Stage 8</span>
            <span aria-hidden="true">·</span>
            <span>Unit 16: Statistical Graphs</span>
            <span aria-hidden="true">·</span>
            <span>Subtopic 16.2</span>
          </div>

          {/* Explicit Learning Goal specified in prompt */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 border border-amber-200">
                  <Target className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">Learning Goal</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight max-w-3xl">
                Draw and interpret time series graphs
              </h1>
              <p className="mt-2 text-sm sm:text-base text-stone-600 max-w-2xl leading-relaxed">
                Learn how to show data that changes over time, describe upward and downward trends, read values accurately, and plot your own graphs like a Cambridge mathematician.
              </p>
            </div>

            {/* Quick Completion Metric Card */}
            <div className="shrink-0 bg-amber-50/60 border border-amber-200/90 rounded-xl p-4 min-w-[200px]">
              <div className="flex items-center justify-between text-xs text-stone-600 mb-1">
                <span className="font-semibold">Mastery Progress</span>
                <span className="font-mono font-bold text-amber-950">{percent}%</span>
              </div>
              <div className="w-full bg-amber-200/60 h-2.5 rounded-full overflow-hidden mb-2">
                <div
                  className="bg-amber-500 h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <p className="text-xs text-stone-700">
                <strong className="text-stone-900 font-bold">{completedCount}</strong> of <strong className="text-stone-900 font-bold">{totalCount}</strong> success checks finished
              </p>
            </div>
          </div>

          {/* Success Checks Checklist */}
          <div className="border-t border-amber-100 pt-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Success Criteria ("I can..." statements)</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {checks.map((check) => {
                return (
                  <div
                    key={check.id}
                    onClick={() => onJumpToStep(check.stepNumber)}
                    className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      check.completed
                        ? 'bg-amber-50/80 border-amber-300 text-stone-900 hover:bg-amber-100/60'
                        : 'bg-white border-stone-200 text-stone-700 hover:border-amber-400 hover:bg-amber-50/30'
                    }`}
                  >
                    <div className="shrink-0 mt-0.5">
                      {check.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-amber-700 fill-amber-200" />
                      ) : (
                        <Circle className="w-5 h-5 text-stone-300" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs sm:text-sm font-medium leading-snug ${check.completed ? 'text-amber-950 font-bold' : 'text-stone-700'}`}>
                        {check.text}
                      </p>
                      <span className="inline-flex items-center gap-1 text-[11px] text-amber-700 mt-1 font-semibold hover:underline">
                        Step {check.stepNumber} Activity
                        <ArrowRight className="w-2.5 h-2.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
