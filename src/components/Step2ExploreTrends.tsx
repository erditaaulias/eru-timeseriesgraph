import React, { useState } from 'react';
import { EXPLORE_SCENARIOS } from '../data/lessonData';
import { TrendingUp, TrendingDown, Activity, CheckCircle2, Sliders, ArrowRight } from 'lucide-react';

interface Step2ExploreTrendsProps {
  onComplete: () => void;
  isCompleted: boolean;
}

export const Step2ExploreTrends: React.FC<Step2ExploreTrendsProps> = ({
  onComplete,
  isCompleted,
}) => {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState<number>(0);
  const [activePointIndex, setActivePointIndex] = useState<number>(3);
  const [userSelectedOption, setUserSelectedOption] = useState<number | null>(null);
  const [answeredScenarios, setAnsweredScenarios] = useState<Set<string>>(new Set());

  const scenario = EXPLORE_SCENARIOS[selectedScenarioIndex];
  const activePoint = scenario.points[activePointIndex] || scenario.points[0];

  // Calculate SVG scales
  const values = scenario.points.map((p) => p.value);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const yRange = maxVal - minVal || 1;
  const paddingY = yRange * 0.15;
  const plotMinY = Math.max(0, Math.floor(minVal - paddingY));
  const plotMaxY = Math.ceil(maxVal + paddingY);

  const svgWidth = 520;
  const svgHeight = 260;
  const plotLeft = 65;
  const plotRight = svgWidth - 30;
  const plotTop = 35;
  const plotBottom = svgHeight - 45;

  const getX = (index: number) => {
    return plotLeft + (index / (scenario.points.length - 1)) * (plotRight - plotLeft);
  };

  const getY = (val: number) => {
    const ratio = (val - plotMinY) / (plotMaxY - plotMinY);
    return plotBottom - ratio * (plotBottom - plotTop);
  };

  const handleSelectScenario = (idx: number) => {
    setSelectedScenarioIndex(idx);
    setActivePointIndex(Math.floor(EXPLORE_SCENARIOS[idx].points.length / 2));
    setUserSelectedOption(null);
  };

  const handleSelectOption = (idx: number) => {
    setUserSelectedOption(idx);
    if (idx === scenario.correctOptionIndex) {
      const updated = new Set(answeredScenarios);
      updated.add(scenario.id);
      setAnsweredScenarios(updated);
      if (updated.size >= 1) {
        onComplete();
      }
    }
  };

  return (
    <section id="explore-trends" className="scroll-mt-32">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        {/* Step Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-6 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 mb-1">
              <span>Step 2 of 5</span>
              <span aria-hidden="true">·</span>
              <span>Describing Trends & Patterns</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
              Explore & Discover: Trends and Seasonal Variations
            </h2>
          </div>
          {isCompleted && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold rounded-lg border border-amber-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-700" />
              <span>Goal 2 Achieved</span>
            </div>
          )}
        </div>

        {/* Cambridge Concept Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          <div className="bg-amber-50/70 border border-amber-200/90 rounded-xl p-3.5 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-200 text-amber-900 flex items-center justify-center shrink-0 mt-0.5">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-900">Upward Trend ↗</h4>
              <p className="text-xs text-stone-600 mt-0.5">
                Values generally <strong>increase</strong> over time. The line moves from bottom-left up towards top-right.
              </p>
            </div>
          </div>

          <div className="bg-stone-50 border border-stone-200 rounded-xl p-3.5 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 mt-0.5">
              <TrendingDown className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-900">Downward Trend ↘</h4>
              <p className="text-xs text-stone-600 mt-0.5">
                Values generally <strong>decrease</strong> over time. The line slopes downwards from top-left to bottom-right.
              </p>
            </div>
          </div>

          <div className="bg-amber-50/70 border border-amber-200/90 rounded-xl p-3.5 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-yellow-200 text-amber-950 flex items-center justify-center shrink-0 mt-0.5">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-900">Seasonal Wave 〰</h4>
              <p className="text-xs text-stone-600 mt-0.5">
                Values rise and fall in a <strong>repeating cycle</strong> (e.g. cold winters vs hot summers every year).
              </p>
            </div>
          </div>
        </div>

        {/* Scenario Switcher Tabs */}
        <div className="mb-4">
          <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-2">
            Select a real-world dataset to investigate:
          </label>
          <div className="flex flex-wrap gap-2">
            {EXPLORE_SCENARIOS.map((sc, i) => {
              const isSelected = selectedScenarioIndex === i;
              const hasAnswered = answeredScenarios.has(sc.id);
              return (
                <button
                  key={sc.id}
                  onClick={() => handleSelectScenario(i)}
                  className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 ${
                    isSelected
                      ? 'bg-amber-400 text-amber-950 font-bold border border-amber-300 shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-amber-50'
                  }`}
                >
                  <span>{sc.title}</span>
                  {hasAnswered && <CheckCircle2 className="w-3.5 h-3.5 text-amber-800" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Two-Column Sandbox */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left: Dynamic Graph with interactive cursor */}
          <div className="lg:col-span-7 bg-amber-50/30 border border-amber-200/80 rounded-xl p-4 sm:p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-stone-800">{scenario.title}</span>
                <span className="text-xs font-medium text-stone-500">
                  {scenario.horizontalLabel} vs {scenario.verticalLabel} ({scenario.unit})
                </span>
              </div>
              <p className="text-xs text-stone-600 mb-3">{scenario.description}</p>
            </div>

            {/* Interactive SVG Canvas */}
            <div className="relative w-full aspect-[5/2.9] bg-white rounded-lg border border-stone-200 shadow-2xs overflow-hidden select-none">
              <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-full">
                {/* Horizontal reference lines */}
                {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
                  const y = plotBottom - ratio * (plotBottom - plotTop);
                  const val = Math.round(plotMinY + ratio * (plotMaxY - plotMinY));
                  return (
                    <g key={ratio}>
                      <line
                        x1={plotLeft}
                        y1={y}
                        x2={plotRight}
                        y2={y}
                        stroke="#fef3c7"
                        strokeWidth="1"
                      />
                      <text
                        x={plotLeft - 8}
                        y={y + 3}
                        textAnchor="end"
                        className="text-[10px] font-mono fill-stone-400"
                      >
                        {val}
                      </text>
                    </g>
                  );
                })}

                {/* Vertical ticks */}
                {scenario.points.map((p, i) => {
                  const x = getX(i);
                  return (
                    <g key={i}>
                      <line x1={x} y1={plotBottom} x2={x} y2={plotBottom + 4} stroke="#a8a29e" />
                      <text
                        x={x}
                        y={plotBottom + 16}
                        textAnchor="middle"
                        className={`text-[10px] font-mono ${
                          i === activePointIndex ? 'fill-amber-800 font-bold' : 'fill-stone-500'
                        }`}
                      >
                        {p.time}
                      </text>
                    </g>
                  );
                })}

                {/* Axes lines */}
                <line
                  x1={plotLeft}
                  y1={plotTop - 10}
                  x2={plotLeft}
                  y2={plotBottom}
                  stroke="#44403c"
                  strokeWidth="1.5"
                />
                <line
                  x1={plotLeft}
                  y1={plotBottom}
                  x2={plotRight + 15}
                  y2={plotBottom}
                  stroke="#44403c"
                  strokeWidth="1.5"
                />

                {/* Connecting Line Segments */}
                <polyline
                  points={scenario.points.map((p, i) => `${getX(i)},${getY(p.value)}`).join(' ')}
                  fill="none"
                  stroke="#d97706"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Active Ruler Guide Lines (Crosshairs) */}
                {activePoint && (
                  <g>
                    {/* Vertical guideline */}
                    <line
                      x1={getX(activePointIndex)}
                      y1={plotTop}
                      x2={getX(activePointIndex)}
                      y2={plotBottom}
                      stroke="#d97706"
                      strokeWidth="1.5"
                      strokeDasharray="3,3"
                    />
                    {/* Horizontal guideline */}
                    <line
                      x1={plotLeft}
                      y1={getY(activePoint.value)}
                      x2={getX(activePointIndex)}
                      y2={getY(activePoint.value)}
                      stroke="#d97706"
                      strokeWidth="1.5"
                      strokeDasharray="3,3"
                    />
                  </g>
                )}

                {/* Plotted Points */}
                {scenario.points.map((p, i) => {
                  const x = getX(i);
                  const y = getY(p.value);
                  const isActive = i === activePointIndex;
                  return (
                    <g
                      key={i}
                      onClick={() => setActivePointIndex(i)}
                      className="cursor-pointer group"
                    >
                      {isActive && (
                        <circle cx={x} cy={y} r="10" fill="#fde68a" opacity="0.8" />
                      )}
                      <circle
                        cx={x}
                        cy={y}
                        r={isActive ? "5.5" : "4"}
                        fill={isActive ? "#b45309" : "#d97706"}
                        stroke="#ffffff"
                        strokeWidth="1.5"
                      />
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Interactive Time Slider */}
            <div className="mt-4 bg-white border border-stone-200 rounded-lg p-3">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-stone-700 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-amber-600" />
                  Drag ruler along time axis:
                </span>
                <span className="font-mono text-xs font-bold text-amber-950 bg-amber-100 px-2.5 py-0.5 rounded border border-amber-300">
                  {activePoint.time} → {activePoint.value} {scenario.unit}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={scenario.points.length - 1}
                value={activePointIndex}
                onChange={(e) => setActivePointIndex(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Right: Trend Interpretation & Guided Check */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white border border-amber-200/80 rounded-xl p-5 sm:p-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-stone-400">Trend Analysis</span>
                <span className="text-xs font-bold capitalize px-2.5 py-0.5 rounded border bg-amber-50 text-amber-900 border-amber-300">
                  {scenario.trendType} trend
                </span>
              </div>

              <h3 className="text-lg font-bold text-stone-900 mb-2">
                What does this graph tell us?
              </h3>

              <div className="bg-amber-50/80 border border-amber-200/90 rounded-xl p-3.5 mb-4 text-xs text-stone-700 leading-relaxed">
                <p className="font-semibold text-stone-900 mb-1">Overall Trend:</p>
                <p>{scenario.trendExplanation}</p>
              </div>

              {/* Guided Observation Question */}
              <div className="mt-4">
                <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                  Check Your Interpretation:
                </h4>
                <p className="text-sm font-medium text-stone-800 mb-2.5">
                  {scenario.keyQuestion}
                </p>

                <div className="space-y-1.5">
                  {scenario.keyOptions.map((opt, optIdx) => {
                    const isSelected = userSelectedOption === optIdx;
                    const isCorrect = optIdx === scenario.correctOptionIndex;

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(optIdx)}
                        className={`w-full text-left p-2.5 rounded-lg text-xs font-medium border transition-colors flex items-center justify-between ${
                          isSelected
                            ? isCorrect
                              ? 'bg-amber-100 border-amber-400 text-amber-950 font-bold'
                              : 'bg-rose-50 border-rose-300 text-rose-900'
                            : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-amber-50/60'
                        }`}
                      >
                        <span>{opt}</span>
                        {isSelected && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {userSelectedOption !== null && (
                  <div
                    className={`mt-3 p-3 rounded-xl text-xs leading-relaxed ${
                      userSelectedOption === scenario.correctOptionIndex
                        ? 'bg-amber-50 text-amber-950 border border-amber-300'
                        : 'bg-rose-50 text-rose-800 border border-rose-200'
                    }`}
                  >
                    {userSelectedOption === scenario.correctOptionIndex ? (
                      <div>
                        <strong className="font-bold">Correct!</strong> {scenario.explanation}
                      </div>
                    ) : (
                      <div>
                        <strong className="font-bold">Not quite.</strong> Look at the height of the line segments at each point. Try another option!
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-stone-100 text-xs text-stone-500 flex items-center justify-between">
              <span>Try other scenarios above to see all trend types!</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
