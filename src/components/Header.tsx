import React from 'react';
import { BookOpen, RefreshCw, Sparkles, Award } from 'lucide-react';

interface HeaderProps {
  onOpenGlossary: () => void;
  onOpenSummary: () => void;
  onResetProgress: () => void;
  completedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenGlossary,
  onOpenSummary,
  onResetProgress,
  completedCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/70 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#top"
            className="text-lg font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0 flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <span className="w-8 h-8 rounded-lg bg-amber-400 text-amber-950 flex items-center justify-center font-black text-sm shadow-xs border border-amber-300">
              16.2
            </span>
            <span className="font-extrabold text-stone-900">Cambridge Maths</span>
            <span className="text-stone-300 font-normal hidden sm:inline">|</span>
            <span className="text-xs font-semibold text-amber-900 bg-amber-100/90 border border-amber-300/80 px-2 py-0.5 rounded-md hidden md:inline">
              Stage 8 · Age 13–14
            </span>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-600">
            <a href="#meet-concept" className="hover:text-amber-600 transition-colors whitespace-nowrap shrink-0">
              1. Meet Concept
            </a>
            <a href="#explore-trends" className="hover:text-amber-600 transition-colors whitespace-nowrap shrink-0">
              2. Explore Trends
            </a>
            <a href="#guided-practice" className="hover:text-amber-600 transition-colors whitespace-nowrap shrink-0">
              3. Worked Example
            </a>
            <a href="#draw-plot" className="hover:text-amber-600 transition-colors whitespace-nowrap shrink-0">
              4. Plot Your Graph
            </a>
            <a href="#exam-challenge" className="hover:text-amber-600 transition-colors whitespace-nowrap shrink-0">
              5. Exam Challenge
            </a>
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenGlossary}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-700 bg-amber-50 hover:bg-amber-100/80 border border-amber-200/80 rounded-lg transition-colors whitespace-nowrap shrink-0"
              title="Open Key Terms Glossary"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-700" />
              <span>Glossary</span>
            </button>

            <button
              onClick={onOpenSummary}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-amber-950 bg-amber-400 hover:bg-amber-500 rounded-lg transition-colors shadow-xs border border-amber-300 whitespace-nowrap shrink-0"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Revision Card</span>
            </button>

            <button
              onClick={onResetProgress}
              className="p-1.5 text-stone-400 hover:text-stone-600 hover:bg-amber-50 rounded-md transition-colors"
              title="Reset All Progress"
              aria-label="Reset Progress"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
