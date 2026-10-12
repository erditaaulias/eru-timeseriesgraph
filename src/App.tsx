/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LearningGoalsCard } from './components/LearningGoalsCard';
import { StickyProgressBar } from './components/StickyProgressBar';
import { Step1MeetConcept } from './components/Step1MeetConcept';
import { Step2ExploreTrends } from './components/Step2ExploreTrends';
import { Step3GuidedPractice } from './components/Step3GuidedPractice';
import { Step4InteractivePlotter } from './components/Step4InteractivePlotter';
import { Step5ExamChallenge } from './components/Step5ExamChallenge';
import { GlossaryModal } from './components/GlossaryModal';
import { RevisionSummaryModal } from './components/RevisionSummaryModal';
import { INITIAL_SUCCESS_CHECKS } from './data/lessonData';
import { SuccessCheck } from './types';
import weatherImg from './assets/images/weather_station_recorder_1791812766329.jpg';
import { LineChart, Sparkles, BookOpen, Clock, Compass } from 'lucide-react';

export default function App() {
  const [successChecks, setSuccessChecks] = useState<SuccessCheck[]>(() => {
    const saved = localStorage.getItem('cambridge_stage8_checks');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_SUCCESS_CHECKS;
      }
    }
    return INITIAL_SUCCESS_CHECKS;
  });

  const [activeStep, setActiveStep] = useState<number>(1);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState<boolean>(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState<boolean>(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('cambridge_stage8_checks', JSON.stringify(successChecks));
  }, [successChecks]);

  // Mark a specific step's success check as completed
  const handleCompleteStep = (stepNumber: number) => {
    setSuccessChecks((prev) =>
      prev.map((c) => (c.stepNumber === stepNumber ? { ...c, completed: true } : c))
    );
  };

  const handleResetProgress = () => {
    if (window.confirm('Reset all progress and clear success checks?')) {
      setSuccessChecks(INITIAL_SUCCESS_CHECKS);
      localStorage.removeItem('cambridge_stage8_checks');
    }
  };

  const scrollToStep = (stepNumber: number) => {
    setActiveStep(stepNumber);
    const stepIds = [
      'meet-concept',
      'explore-trends',
      'guided-practice',
      'draw-plot',
      'exam-challenge',
    ];
    const targetId = stepIds[stepNumber - 1];
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const completedCount = successChecks.filter((c) => c.completed).length;

  return (
    <div className="min-h-screen bg-amber-50/20 text-stone-800 flex flex-col font-sans">
      {/* 1. Header (Top Bar Contract) */}
      <Header
        onOpenGlossary={() => setIsGlossaryOpen(true)}
        onOpenSummary={() => setIsSummaryOpen(true)}
        onResetProgress={handleResetProgress}
        completedCount={completedCount}
      />

      {/* 2. Sticky Progress Bar */}
      <StickyProgressBar
        checks={successChecks}
        activeStep={activeStep}
        onSelectStep={scrollToStep}
      />

      {/* 3. Main Educational Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Top Learning Goal Banner & "I can..." checklist */}
        <section id="top">
          <LearningGoalsCard
            checks={successChecks}
            onJumpToStep={scrollToStep}
          />
        </section>

        {/* Real-World Context Hero Spotlight */}
        <div className="bg-white border border-amber-200/80 rounded-2xl p-6 sm:p-8 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-500">
              <span className="text-amber-800 font-bold uppercase tracking-wider">Real-World Maths</span>
              <span aria-hidden="true">·</span>
              <span>Why We Use Time Series Graphs</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight leading-snug">
              Tracking Daily Weather and Temperature Over Time
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              When scientists monitor air temperature, heart rate, or rainfall, they record numbers at regular intervals of time. Instead of looking at a long list of numbers, a <strong>time series graph</strong> lets you see immediate patterns: when did the temperature peak? Is there an upward trend? Did it stay constant?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-amber-50/50 border border-amber-200/70 rounded-xl p-3">
                <span className="block text-[11px] font-bold text-amber-900 uppercase">Independent Variable</span>
                <span className="text-sm font-bold text-stone-900">Time (Hours/Days)</span>
              </div>
              <div className="bg-amber-50/50 border border-amber-200/70 rounded-xl p-3">
                <span className="block text-[11px] font-bold text-amber-900 uppercase">Dependent Variable</span>
                <span className="text-sm font-bold text-stone-900">Measured Value (°C, mm)</span>
              </div>
              <div className="bg-amber-50/50 border border-amber-200/70 rounded-xl p-3">
                <span className="block text-[11px] font-bold text-amber-900 uppercase">How Points Connect</span>
                <span className="text-sm font-bold text-stone-900">Ruled Line Segments</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-xl overflow-hidden border border-amber-200 shadow-xs group aspect-[4/3] bg-amber-50/40">
              <img
                src={weatherImg}
                alt="School meteorological weather station recording daily temperature line graph over time"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-300"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-stone-950/85 via-stone-950/45 to-transparent p-3.5 text-white">
                <p className="text-xs font-semibold leading-tight text-amber-100">
                  Meteorological Station · Continuous Temperature & Rainfall Recording
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Step 1: Meet the Concept */}
        <Step1MeetConcept
          onComplete={() => handleCompleteStep(1)}
          isCompleted={successChecks[0]?.completed}
        />

        {/* Step 2: Explore Trends */}
        <Step2ExploreTrends
          onComplete={() => handleCompleteStep(2)}
          isCompleted={successChecks[1]?.completed}
        />

        {/* Step 3: Worked Example */}
        <Step3GuidedPractice
          onComplete={() => handleCompleteStep(3)}
          isCompleted={successChecks[2]?.completed}
        />

        {/* Step 4: Plot Your Own Graph */}
        <Step4InteractivePlotter
          onComplete={() => handleCompleteStep(4)}
          isCompleted={successChecks[3]?.completed}
        />

        {/* Step 5: Exam Challenge */}
        <Step5ExamChallenge
          onComplete={() => handleCompleteStep(5)}
          isCompleted={successChecks[4]?.completed}
          onOpenSummary={() => setIsSummaryOpen(true)}
        />
      </main>

      {/* Educational Footer */}
      <footer className="mt-16 bg-white border-t border-amber-200/70 py-8 px-4 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-stone-800">Cambridge Lower Secondary Mathematics</span>
            <span>·</span>
            <span>Stage 8 (Grade 8) Subtopic 16.2</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsGlossaryOpen(true)}
              className="text-amber-800 hover:text-amber-950 hover:underline font-semibold"
            >
              Key Terms Glossary
            </button>
            <button
              onClick={() => setIsSummaryOpen(true)}
              className="text-amber-800 hover:text-amber-950 hover:underline font-semibold"
            >
              Revision Summary Card
            </button>
            <a
              href="#top"
              className="hover:text-stone-800 transition-colors"
            >
              Back to Top ↑
            </a>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />

      <RevisionSummaryModal
        isOpen={isSummaryOpen}
        onClose={() => setIsSummaryOpen(false)}
      />
    </div>
  );
}
