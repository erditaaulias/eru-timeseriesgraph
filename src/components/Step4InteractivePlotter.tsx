import React, { useState } from 'react';
import { PLOTTING_EXERCISE } from '../data/lessonData';
import { CheckCircle2, RotateCcw, PenTool, Table, Info, Sparkles, Check, AlertCircle } from 'lucide-react';

interface Step4InteractivePlotterProps {
  onComplete: () => void;
  isCompleted: boolean;
}

export const Step4InteractivePlotter: React.FC<Step4InteractivePlotterProps> = ({
  onComplete,
  isCompleted,
}) => {
  // Student's plotted points: index -> value (or null if not yet plotted)
  const [plottedValues, setPlottedValues] = useState<(number | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ]);
  const [activeDayIndex, setActiveDayIndex] = useState<number>(0);
  const [linesJoined, setLinesJoined] = useState<boolean>(true);
  const [evaluationResult, setEvaluationResult] = useState<{
    tested: boolean;
    allCorrect: boolean;
    details: { day: string; userVal: number | null; targetVal: number; isCorrect: boolean }[];
  } | null>(null);

  const days = PLOTTING_EXERCISE.xLabels;
  const targets = PLOTTING_EXERCISE.targetPoints;

  // Grid coordinates math
  const svgWidth = 520;
  const svgHeight = 280;
  const plotLeft = 65;
  const plotRight = svgWidth - 30;
  const plotTop = 30;
  const plotBottom = svgHeight - 45;

  const yMin = PLOTTING_EXERCISE.yMin;
  const yMax = PLOTTING_EXERCISE.yMax;

  const getX = (index: number) => {
    return plotLeft + (index / (days.length - 1)) * (plotRight - plotLeft);
  };

  const getY = (val: number) => {
    const ratio = (val - yMin) / (yMax - yMin);
    return plotBottom - ratio * (plotBottom - plotTop);
  };

  const getValueFromY = (yCoord: number) => {
    const ratio = (plotBottom - yCoord) / (plotBottom - plotTop);
    const rawVal = yMin + ratio * (yMax - yMin);
    // Snap to nearest 5 for student usability
    const snapped = Math.round(rawVal / 5) * 5;
    return Math.max(yMin, Math.min(yMax, snapped));
  };

  // Handle direct clicking on the SVG column
  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Convert click to SVG coordinate space
    const scaleX = svgWidth / rect.width;
    const scaleY = svgHeight / rect.height;
    const svgX = clickX * scaleX;
    const svgY = clickY * scaleY;

    // Find closest day column
    let closestIndex = 0;
    let minDistance = 9999;
    days.forEach((_, i) => {
      const dist = Math.abs(getX(i) - svgX);
      if (dist < minDistance) {
        minDistance = dist;
        closestIndex = i;
      }
    });

    if (minDistance < 40 && svgY >= plotTop - 10 && svgY <= plotBottom + 10) {
      const val = getValueFromY(svgY);
      setPointValue(closestIndex, val);
      setActiveDayIndex(closestIndex);
    }
  };

  const setPointValue = (index: number, val: number) => {
    const updated = [...plottedValues];
    updated[index] = val;
    setPlottedValues(updated);
    setEvaluationResult(null); // Clear previous check until they click Check again
  };

  const handleCheckPlotting = () => {
    const details = days.map((day, i) => {
      const userVal = plottedValues[i];
      const targetVal = targets[i].value;
      const isCorrect = userVal !== null && Math.abs(userVal - targetVal) === 0;
      return { day, userVal, targetVal, isCorrect };
    });

    const allCorrect = details.every((d) => d.isCorrect);
    setEvaluationResult({ tested: true, allCorrect, details });

    if (allCorrect) {
      onComplete();
    }
  };

  const handleReset = () => {
    setPlottedValues([null, null, null, null, null]);
    setEvaluationResult(null);
  };

  // Pre-fill / Auto-hint button if student gets stuck
  const handleShowTargetGuide = () => {
    setPlottedValues([20, 35, 45, 30, 15]);
    setEvaluationResult(null);
  };

  return (
    <section id="draw-plot" className="scroll-mt-32">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        {/* Step Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-6 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 mb-1">
              <span>Step 4 of 5</span>
              <span aria-hidden="true">·</span>
              <span>Hands-on Graphing Activity</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
              Plot Your Own Graph: School Library Visitors
            </h2>
          </div>
          {isCompleted && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold rounded-lg border border-amber-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-700" />
              <span>Goal 4 Achieved</span>
            </div>
          )}
        </div>

        {/* Task Briefing */}
        <div className="bg-amber-50/80 border border-amber-200/90 rounded-xl p-4 sm:p-5 mb-6 text-sm text-stone-700 leading-relaxed">
          <p className="font-semibold text-stone-900 mb-1">
            Cambridge Task Instructions:
          </p>
          <p className="text-stone-600 text-xs sm:text-sm">
            Read the frequency data in the table below. Tap on the grid to plot each day's visitor count with an <strong>x</strong> mark. Once plotted, join the consecutive points with straight line segments and check your accuracy!
          </p>
        </div>

        {/* Data Table vs Interactive Graph */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-6">
          {/* Data Table & Stepper Controls */}
          <div className="lg:col-span-4 bg-amber-50/30 border border-amber-200/80 rounded-xl p-4 sm:p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                <span className="flex items-center gap-1.5">
                  <Table className="w-3.5 h-3.5 text-amber-700" />
                  <span>Given Data Table</span>
                </span>
                <span className="text-stone-500 font-normal">Stage 8 Exam</span>
              </div>

              {/* Table */}
              <div className="border border-stone-200 rounded-lg overflow-hidden bg-white mb-4">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="bg-amber-50/70 text-stone-700 border-b border-stone-200">
                      <th className="py-2 px-3 font-bold">Day (Time)</th>
                      <th className="py-2 px-3 font-bold">Visitors (y)</th>
                      <th className="py-2 px-2 text-center font-bold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 font-mono">
                    {days.map((day, idx) => {
                      const userVal = plottedValues[idx];
                      const target = targets[idx].value;
                      const isTargetMet = userVal === target;

                      return (
                        <tr
                          key={day}
                          onClick={() => setActiveDayIndex(idx)}
                          className={`cursor-pointer transition-colors ${
                            activeDayIndex === idx ? 'bg-amber-100/80 font-bold text-amber-950' : 'hover:bg-amber-50/50'
                          }`}
                        >
                          <td className="py-2 px-3 text-stone-800">{day}</td>
                          <td className="py-2 px-3 text-stone-900">{target} students</td>
                          <td className="py-2 px-2 text-center">
                            {userVal !== null ? (
                              isTargetMet ? (
                                <span className="inline-block w-4 h-4 rounded-full bg-amber-200 text-amber-900 text-[10px] font-bold leading-4">
                                  ✓
                                </span>
                              ) : (
                                <span className="inline-block w-4 h-4 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold leading-4">
                                  !
                                </span>
                              )
                            ) : (
                              <span className="text-[10px] text-stone-400">—</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Day Adjustment Buttons for Precise Touch/Mouse Input */}
              <div className="bg-white border border-stone-200 rounded-lg p-3 mb-3">
                <div className="text-xs font-semibold text-stone-700 mb-2 flex items-center justify-between">
                  <span>Plotting for: <strong>{days[activeDayIndex]}</strong></span>
                  <span className="font-mono text-xs text-amber-900 font-bold">
                    Target: {targets[activeDayIndex].value}
                  </span>
                </div>

                <div className="grid grid-cols-6 gap-1 text-[11px] font-mono">
                  {[0, 10, 20, 30, 40, 50].map((val) => (
                    <button
                      key={val}
                      onClick={() => setPointValue(activeDayIndex, val)}
                      className={`py-1.5 rounded border text-center font-bold transition-colors ${
                        plottedValues[activeDayIndex] === val
                          ? 'bg-amber-400 border-amber-400 text-amber-950 shadow-xs'
                          : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-amber-50'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-stone-100 text-[11px] text-stone-500">
                  <span>Current: <strong>{plottedValues[activeDayIndex] !== null ? plottedValues[activeDayIndex] : 'Not plotted'}</strong></span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setPointValue(activeDayIndex, targets[activeDayIndex].value)}
                      className="text-amber-800 hover:underline font-bold"
                    >
                      Auto-snap ({targets[activeDayIndex].value})
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-stone-600 bg-white border border-stone-200 hover:bg-stone-50 rounded-lg transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
              <button
                onClick={handleShowTargetGuide}
                className="inline-flex items-center gap-1 px-3 py-2 text-xs font-bold text-amber-950 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-lg transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Fill Sample</span>
              </button>
            </div>
          </div>

          {/* Graphing Grid (SVG) */}
          <div className="lg:col-span-8 bg-amber-50/30 border border-amber-200/80 rounded-xl p-4 sm:p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-stone-600 mb-2">
              <span className="font-bold text-stone-900">
                Interactive Graph Paper (Click anywhere along vertical grid lines)
              </span>
              <span className="text-stone-500">Scale: 1 unit = 5 students</span>
            </div>

            {/* SVG Plot Canvas */}
            <div className="relative w-full aspect-[5/2.9] bg-white rounded-lg border border-amber-200 shadow-2xs overflow-hidden select-none cursor-crosshair">
              <svg
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className="w-full h-full"
                onClick={handleSvgClick}
              >
                {/* Fine Math Grid */}
                {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50].map((v) => {
                  const y = getY(v);
                  const isMajor = v % 10 === 0;
                  return (
                    <g key={v}>
                      <line
                        x1={plotLeft}
                        y1={y}
                        x2={plotRight}
                        y2={y}
                        stroke={isMajor ? '#fde68a' : '#fef9c3'}
                        strokeWidth={isMajor ? '1' : '0.6'}
                      />
                      {isMajor && (
                        <text
                          x={plotLeft - 8}
                          y={y + 3}
                          textAnchor="end"
                          className="text-[10px] font-mono fill-stone-500 font-medium"
                        >
                          {v}
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* Day vertical grid lines */}
                {days.map((day, i) => {
                  const x = getX(i);
                  const isActiveCol = activeDayIndex === i;
                  return (
                    <g key={day}>
                      {/* Active column highlight band */}
                      {isActiveCol && (
                        <rect
                          x={x - 20}
                          y={plotTop}
                          width="40"
                          height={plotBottom - plotTop}
                          fill="#fef3c7"
                          opacity="0.7"
                        />
                      )}
                      <line
                        x1={x}
                        y1={plotTop}
                        x2={x}
                        y2={plotBottom}
                        stroke={isActiveCol ? '#f59e0b' : '#fde68a'}
                        strokeWidth={isActiveCol ? '1.5' : '1'}
                      />
                      <line x1={x} y1={plotBottom} x2={x} y2={plotBottom + 4} stroke="#44403c" />
                      <text
                        x={x}
                        y={plotBottom + 16}
                        textAnchor="middle"
                        className={`text-[11px] font-mono font-semibold ${
                          isActiveCol ? 'fill-amber-900 font-bold' : 'fill-stone-700'
                        }`}
                      >
                        {day}
                      </text>
                    </g>
                  );
                })}

                {/* Main Axes */}
                <line
                  x1={plotLeft}
                  y1={plotTop - 10}
                  x2={plotLeft}
                  y2={plotBottom}
                  stroke="#44403c"
                  strokeWidth="2"
                />
                <line
                  x1={plotLeft}
                  y1={plotBottom}
                  x2={plotRight + 15}
                  y2={plotBottom}
                  stroke="#44403c"
                  strokeWidth="2"
                />

                {/* Axis Labels */}
                <text
                  x="-150"
                  y="20"
                  transform="rotate(-90)"
                  textAnchor="middle"
                  className="text-[11px] font-bold fill-stone-600"
                >
                  Number of Visitors
                </text>
                <text
                  x={plotLeft + (plotRight - plotLeft) / 2}
                  y={plotBottom + 35}
                  textAnchor="middle"
                  className="text-[11px] font-bold fill-stone-700"
                >
                  Day of the Week
                </text>

                {/* Straight Line Segments connecting user points */}
                {linesJoined && (
                  <path
                    d={
                      plottedValues
                        .map((val, idx) => {
                          if (val === null) return null;
                          return `${idx === 0 ? 'M' : 'L'} ${getX(idx)} ${getY(val)}`;
                        })
                        .filter(Boolean)
                        .join(' ')
                    }
                    fill="none"
                    stroke="#d97706"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}

                {/* Plotted 'x' cross marks */}
                {days.map((_, i) => {
                  const val = plottedValues[i];
                  if (val === null) return null;
                  const x = getX(i);
                  const y = getY(val);
                  const isCorrect = val === targets[i].value;

                  return (
                    <g key={i}>
                      <line
                        x1={x - 4}
                        y1={y - 4}
                        x2={x + 4}
                        y2={y + 4}
                        stroke={isCorrect ? '#b45309' : '#e11d48'}
                        strokeWidth="2.5"
                      />
                      <line
                        x1={x - 4}
                        y1={y + 4}
                        x2={x + 4}
                        y2={y - 4}
                        stroke={isCorrect ? '#b45309' : '#e11d48'}
                        strokeWidth="2.5"
                      />
                      <circle cx={x} cy={y} r="2" fill="#78350f" />
                      {/* Label of value */}
                      <text
                        x={x}
                        y={y - 8}
                        textAnchor="middle"
                        className="text-[10px] font-mono fill-stone-900 font-bold"
                      >
                        {val}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Bottom Controls Strip */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 pt-3 border-t border-amber-200/80">
              <label className="flex items-center gap-2 text-xs font-semibold text-stone-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={linesJoined}
                  onChange={(e) => setLinesJoined(e.target.checked)}
                  className="rounded text-amber-500 focus:ring-amber-500 accent-amber-500 w-4 h-4"
                />
                <span className="flex items-center gap-1.5">
                  <PenTool className="w-3.5 h-3.5 text-amber-700" />
                  Join consecutive points with ruler line segments
                </span>
              </label>

              <button
                onClick={handleCheckPlotting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2 text-xs font-bold text-amber-950 bg-amber-400 hover:bg-amber-500 rounded-lg shadow-xs border border-amber-300 transition-colors"
              >
                <Check className="w-4 h-4" />
                <span>Check My Graph Accuracy</span>
              </button>
            </div>
          </div>
        </div>

        {/* Accuracy Feedback Panel */}
        {evaluationResult && (
          <div
            className={`p-4 rounded-xl text-xs leading-relaxed border transition-all ${
              evaluationResult.allCorrect
                ? 'bg-amber-50 border-amber-300 text-amber-950 font-medium'
                : 'bg-amber-50 border-amber-300 text-amber-950'
            }`}
          >
            <div className="flex items-start gap-3">
              {evaluationResult.allCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <h4 className="font-bold text-sm mb-1">
                  {evaluationResult.allCorrect
                    ? 'Excellent plotting! Full Marks (Cambridge Stage 8)'
                    : 'A few points need checking:'}
                </h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {evaluationResult.details.map((d) => (
                    <span
                      key={d.day}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium border ${
                        d.isCorrect
                          ? 'bg-amber-200/70 border-amber-300 text-amber-950 font-bold'
                          : 'bg-white border-amber-300 text-amber-900'
                      }`}
                    >
                      <span>{d.day}:</span>
                      {d.isCorrect ? (
                        <span>✓ {d.targetVal}</span>
                      ) : (
                        <span>
                          Plotted {d.userVal ?? 'None'}, should be {d.targetVal}
                        </span>
                      )}
                    </span>
                  ))}
                </div>
                {evaluationResult.allCorrect && (
                  <p className="mt-2 text-amber-900">
                    Your points are accurately placed, marked with clean crosses, and connected in order with straight line segments. Goal 4 has been completed!
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
