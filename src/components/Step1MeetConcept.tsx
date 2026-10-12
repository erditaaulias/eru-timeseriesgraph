import React, { useState } from 'react';
import { GRAPH_PARTS } from '../data/lessonData';
import { GraphPart } from '../types';
import { MousePointerClick, Info, CheckCircle2, HelpCircle, Lightbulb } from 'lucide-react';

interface Step1MeetConceptProps {
  onComplete: () => void;
  isCompleted: boolean;
}

export const Step1MeetConcept: React.FC<Step1MeetConceptProps> = ({
  onComplete,
  isCompleted,
}) => {
  const [selectedPartId, setSelectedPartId] = useState<string>('horizontal-axis');
  const [visitedParts, setVisitedParts] = useState<Set<string>>(new Set(['horizontal-axis']));
  const [quiz1Answer, setQuiz1Answer] = useState<string | null>(null);
  const [quiz2Answer, setQuiz2Answer] = useState<string | null>(null);

  const selectedPart = GRAPH_PARTS.find((p) => p.id === selectedPartId) || GRAPH_PARTS[0];

  const handleSelectPart = (part: GraphPart) => {
    setSelectedPartId(part.id);
    const newSet = new Set(visitedParts);
    newSet.add(part.id);
    setVisitedParts(newSet);
    checkAllDone(newSet, quiz1Answer, quiz2Answer);
  };

  const handleAnswer1 = (val: string) => {
    setQuiz1Answer(val);
    checkAllDone(visitedParts, val, quiz2Answer);
  };

  const handleAnswer2 = (val: string) => {
    setQuiz2Answer(val);
    checkAllDone(visitedParts, quiz1Answer, val);
  };

  const checkAllDone = (
    visited: Set<string>,
    q1: string | null,
    q2: string | null
  ) => {
    if (
      visited.size >= 4 &&
      q1 === 'horizontal' &&
      q2 === 'ruler'
    ) {
      onComplete();
    }
  };

  // Mock data for the demonstration graph: Daily Temperature in London
  const demoPoints = [
    { x: 100, y: 220, label: '08:00', val: '12°C' },
    { x: 170, y: 180, label: '10:00', val: '16°C' },
    { x: 240, y: 130, label: '12:00', val: '21°C' },
    { x: 310, y: 100, label: '14:00', val: '24°C' },
    { x: 380, y: 140, label: '16:00', val: '20°C' },
    { x: 450, y: 200, label: '18:00', val: '14°C' },
  ];

  return (
    <section id="meet-concept" className="scroll-mt-32">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        {/* Step Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-6 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 mb-1">
              <span>Step 1 of 5</span>
              <span aria-hidden="true">·</span>
              <span>Anatomy of a Time Series Graph</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
              Meet the Concept: What is a Time Series Graph?
            </h2>
          </div>
          {isCompleted && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold rounded-lg border border-amber-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-700" />
              <span>Goal 1 Achieved</span>
            </div>
          )}
        </div>

        {/* Cambridge Plain English Intro */}
        <div className="bg-amber-50/80 border border-amber-200/90 rounded-xl p-4 sm:p-5 mb-6 text-sm text-stone-700 leading-relaxed">
          <p className="font-semibold text-stone-900 mb-1">
            <strong>Key Definition:</strong> A <strong>time series graph</strong> is a line graph that shows how a quantity changes over a continuous period of time.
          </p>
          <p className="text-stone-600 text-xs sm:text-sm">
            In Cambridge Stage 8, you will see time series graphs for weather, sports, science experiments, and sales. Tap each highlighted part of the graph below to discover why it is there and the exam rules for drawing it.
          </p>
        </div>

        {/* Two-Zone Interactive Sandbox Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left/Main Zone: Interactive SVG Graph */}
          <div className="lg:col-span-7 bg-amber-50/30 border border-amber-200/80 rounded-xl p-4 sm:p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3 text-xs text-stone-500">
              <span className="font-semibold text-stone-700 flex items-center gap-1.5">
                <MousePointerClick className="w-3.5 h-3.5 text-amber-600" />
                Tap any highlighted part or tag to inspect:
              </span>
              <span className="font-mono text-stone-500">
                {visitedParts.size} of {GRAPH_PARTS.length} explored
              </span>
            </div>

            {/* Interactive SVG */}
            <div className="relative w-full aspect-[5/3.5] bg-white rounded-lg border border-stone-200 shadow-2xs overflow-hidden select-none">
              <svg viewBox="0 0 520 340" className="w-full h-full">
                {/* Background Grid */}
                <defs>
                  <pattern id="grid-pattern" width="35" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 35 0 L 0 0 0 30" fill="none" stroke="#fef3c7" strokeWidth="0.8" />
                  </pattern>
                </defs>
                <rect x="70" y="45" width="410" height="235" fill="url(#grid-pattern)" />

                {/* Horizontal reference lines */}
                {[70, 115, 160, 205, 250].map((yVal, i) => (
                  <line
                    key={i}
                    x1="70"
                    y1={yVal}
                    x2="480"
                    y2={yVal}
                    stroke="#fde68a"
                    strokeWidth="0.8"
                    strokeDasharray={i === 4 ? 'none' : '2,2'}
                  />
                ))}

                {/* Vertical reference lines */}
                {demoPoints.map((pt, i) => (
                  <line
                    key={i}
                    x1={pt.x}
                    y1="45"
                    x2={pt.x}
                    y2="280"
                    stroke="#fef3c7"
                    strokeWidth="1"
                  />
                ))}

                {/* Title */}
                <g
                  onClick={() => handleSelectPart(GRAPH_PARTS.find((p) => p.id === 'title')!)}
                  className="cursor-pointer group"
                >
                  <rect
                    x="110"
                    y="10"
                    width="300"
                    height="28"
                    rx="6"
                    fill={selectedPartId === 'title' ? '#fef3c7' : 'transparent'}
                    stroke={selectedPartId === 'title' ? '#d97706' : 'transparent'}
                    strokeWidth="1.5"
                  />
                  <text
                    x="260"
                    y="28"
                    textAnchor="middle"
                    className="font-bold text-sm fill-stone-800"
                  >
                    Temperature in Cambridge (°C) over One Day
                  </text>
                </g>

                {/* Vertical Axis (y-axis) */}
                <g
                  onClick={() => handleSelectPart(GRAPH_PARTS.find((p) => p.id === 'vertical-axis')!)}
                  className="cursor-pointer group"
                >
                  {/* Axis line */}
                  <line
                    x1="70"
                    y1="45"
                    x2="70"
                    y2="280"
                    stroke={selectedPartId === 'vertical-axis' ? '#d97706' : '#44403c'}
                    strokeWidth={selectedPartId === 'vertical-axis' ? '3' : '2'}
                  />
                  {/* Axis arrow */}
                  <polygon
                    points="67,45 73,45 70,37"
                    fill={selectedPartId === 'vertical-axis' ? '#d97706' : '#44403c'}
                  />
                  {/* Ticks and scale labels */}
                  {[
                    { y: 70, label: '25' },
                    { y: 115, label: '20' },
                    { y: 160, label: '15' },
                    { y: 205, label: '10' },
                    { y: 250, label: '5' },
                    { y: 280, label: '0' },
                  ].map((tick) => (
                    <g key={tick.y}>
                      <line x1="65" y1={tick.y} x2="70" y2={tick.y} stroke="#44403c" strokeWidth="1.5" />
                      <text x="60" y={tick.y + 4} textAnchor="end" className="text-[11px] font-mono fill-stone-500">
                        {tick.label}
                      </text>
                    </g>
                  ))}
                  {/* Vertical axis label rotated */}
                  <text
                    x="-162"
                    y="22"
                    transform="rotate(-90)"
                    textAnchor="middle"
                    className={`text-[12px] font-bold ${
                      selectedPartId === 'vertical-axis' ? 'fill-amber-800' : 'fill-stone-600'
                    }`}
                  >
                    Temperature (°C)
                  </text>
                </g>

                {/* Horizontal Axis (x-axis) */}
                <g
                  onClick={() => handleSelectPart(GRAPH_PARTS.find((p) => p.id === 'horizontal-axis')!)}
                  className="cursor-pointer group"
                >
                  {/* Axis line */}
                  <line
                    x1="70"
                    y1="280"
                    x2="480"
                    y2="280"
                    stroke={selectedPartId === 'horizontal-axis' ? '#d97706' : '#44403c'}
                    strokeWidth={selectedPartId === 'horizontal-axis' ? '3' : '2'}
                  />
                  {/* Arrow */}
                  <polygon
                    points="480,277 480,283 488,280"
                    fill={selectedPartId === 'horizontal-axis' ? '#d97706' : '#44403c'}
                  />
                  {/* Ticks & Time labels */}
                  {demoPoints.map((pt) => (
                    <g key={pt.x}>
                      <line x1={pt.x} y1="280" x2={pt.x} y2="285" stroke="#44403c" strokeWidth="1.5" />
                      <text
                        x={pt.x}
                        y="298"
                        textAnchor="middle"
                        className="text-[11px] font-mono fill-stone-600 font-medium"
                      >
                        {pt.label}
                      </text>
                    </g>
                  ))}
                  {/* Horizontal Axis title */}
                  <text
                    x="275"
                    y="322"
                    textAnchor="middle"
                    className={`text-[12px] font-bold ${
                      selectedPartId === 'horizontal-axis' ? 'fill-amber-800' : 'fill-stone-700'
                    }`}
                  >
                    Time of Day (hours)
                  </text>
                </g>

                {/* Connecting Straight Line Segments */}
                <g
                  onClick={() => handleSelectPart(GRAPH_PARTS.find((p) => p.id === 'line-segments')!)}
                  className="cursor-pointer group"
                >
                  <polyline
                    points={demoPoints.map((p) => `${p.x},${p.y}`).join(' ')}
                    fill="none"
                    stroke={selectedPartId === 'line-segments' ? '#b45309' : '#d97706'}
                    strokeWidth={selectedPartId === 'line-segments' ? '4' : '2.8'}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>

                {/* Plotted Points (Cambridge Stage 8 uses neat 'x' or dots) */}
                <g
                  onClick={() => handleSelectPart(GRAPH_PARTS.find((p) => p.id === 'plotted-points')!)}
                  className="cursor-pointer group"
                >
                  {demoPoints.map((pt, i) => (
                    <g key={i}>
                      {/* Pulse halo if selected */}
                      {selectedPartId === 'plotted-points' && (
                        <circle cx={pt.x} cy={pt.y} r="11" fill="#fde68a" opacity="0.8" />
                      )}
                      {/* Small Cambridge cross mark 'x' */}
                      <line
                        x1={pt.x - 4}
                        y1={pt.y - 4}
                        x2={pt.x + 4}
                        y2={pt.y + 4}
                        stroke={selectedPartId === 'plotted-points' ? '#78350f' : '#b45309'}
                        strokeWidth="2.2"
                      />
                      <line
                        x1={pt.x - 4}
                        y1={pt.y + 4}
                        x2={pt.x + 4}
                        y2={pt.y - 4}
                        stroke={selectedPartId === 'plotted-points' ? '#78350f' : '#b45309'}
                        strokeWidth="2.2"
                      />
                      {/* Dot in center */}
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r="2.5"
                        fill="#b45309"
                      />
                      {/* Small value preview */}
                      <text
                        x={pt.x}
                        y={pt.y - 10}
                        textAnchor="middle"
                        className="text-[10px] font-mono fill-stone-700 font-bold"
                      >
                        {pt.val}
                      </text>
                    </g>
                  ))}
                </g>
              </svg>
            </div>

            {/* Quick interactive parts selector buttons */}
            <div className="flex flex-wrap gap-1.5 mt-4">
              {GRAPH_PARTS.map((part) => {
                const isSelected = selectedPartId === part.id;
                const isVisited = visitedParts.has(part.id);
                return (
                  <button
                    key={part.id}
                    onClick={() => handleSelectPart(part)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-amber-500 text-stone-950 font-bold border border-amber-400 shadow-2xs'
                        : isVisited
                        ? 'bg-white text-stone-700 border border-amber-200 hover:border-amber-300'
                        : 'bg-white text-stone-500 border border-dashed border-stone-300 hover:border-stone-400'
                    }`}
                  >
                    <span>{part.name}</span>
                    {isVisited && <CheckCircle2 className="w-3 h-3 text-amber-700" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Zone: Concept Details & Stage 8 Course Book Note */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white border border-amber-200/80 rounded-xl p-5 sm:p-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-200">
                  {selectedPart.role}
                </span>
                <span className="text-xs text-stone-400">Part Anatomy</span>
              </div>

              <h3 className="text-xl font-bold text-stone-900 mb-2">
                {selectedPart.name}
              </h3>

              <p className="text-sm text-stone-700 leading-relaxed mb-4">
                {selectedPart.explanation}
              </p>

              {/* Cambridge Course Book Note */}
              <div className="bg-amber-50/90 border border-amber-300/80 rounded-xl p-3.5 mb-5 text-xs text-amber-950">
                <div className="flex items-center gap-1.5 font-bold mb-1 text-amber-900">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-700" />
                  <span>Cambridge Stage 8 Exam Rule:</span>
                </div>
                <p className="leading-relaxed">
                  {selectedPart.cambridgeNote}
                </p>
              </div>
            </div>

            {/* Quick Check to lock in Goal 1 */}
            <div className="border-t border-amber-100 pt-4">
              <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
                <span>Quick Check (2 Questions):</span>
              </h4>

              {/* Q1 */}
              <div className="mb-3">
                <p className="text-xs font-medium text-stone-700 mb-1.5">
                  1. Which axis <strong>must always</strong> represent time?
                </p>
                <div className="grid grid-cols-2 gap-1.5 text-xs">
                  <button
                    onClick={() => handleAnswer1('horizontal')}
                    className={`py-1.5 px-2 rounded-lg font-medium border text-left transition-colors ${
                      quiz1Answer === 'horizontal'
                        ? 'bg-amber-100 border-amber-400 text-amber-950 font-bold'
                        : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-amber-50/60'
                    }`}
                  >
                    Horizontal axis (bottom)
                  </button>
                  <button
                    onClick={() => handleAnswer1('vertical')}
                    className={`py-1.5 px-2 rounded-lg font-medium border text-left transition-colors ${
                      quiz1Answer === 'vertical'
                        ? 'bg-rose-50 border-rose-300 text-rose-800'
                        : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    Vertical axis (left)
                  </button>
                </div>
                {quiz1Answer === 'horizontal' && (
                  <p className="text-[11px] text-amber-800 font-bold mt-1">
                    ✓ Correct! Time always flows along the bottom axis.
                  </p>
                )}
                {quiz1Answer === 'vertical' && (
                  <p className="text-[11px] text-rose-600 mt-1">
                    ✗ Try again: Time is independent and goes along the horizontal axis.
                  </p>
                )}
              </div>

              {/* Q2 */}
              <div>
                <p className="text-xs font-medium text-stone-700 mb-1.5">
                  2. How do you join consecutive points in Stage 8?
                </p>
                <div className="grid grid-cols-2 gap-1.5 text-xs">
                  <button
                    onClick={() => handleAnswer2('ruler')}
                    className={`py-1.5 px-2 rounded-lg font-medium border text-left transition-colors ${
                      quiz2Answer === 'ruler'
                        ? 'bg-amber-100 border-amber-400 text-amber-950 font-bold'
                        : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-amber-50/60'
                    }`}
                  >
                    Straight line segments (ruler)
                  </button>
                  <button
                    onClick={() => handleAnswer2('curve')}
                    className={`py-1.5 px-2 rounded-lg font-medium border text-left transition-colors ${
                      quiz2Answer === 'curve'
                        ? 'bg-rose-50 border-rose-300 text-rose-800'
                        : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    Curvy freehand sketch
                  </button>
                </div>
                {quiz2Answer === 'ruler' && (
                  <p className="text-[11px] text-amber-800 font-bold mt-1">
                    ✓ Exactly right! Always use a ruler to join point to point.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
