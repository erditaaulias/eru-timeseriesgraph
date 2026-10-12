import React, { useState } from 'react';
import { WORKED_EXAMPLE_DATA } from '../data/lessonData';
import { CheckCircle2, HelpCircle, ArrowRight, Table, Sparkles, BookOpen } from 'lucide-react';

interface Step3GuidedPracticeProps {
  onComplete: () => void;
  isCompleted: boolean;
}

export const Step3GuidedPractice: React.FC<Step3GuidedPracticeProps> = ({
  onComplete,
  isCompleted,
}) => {
  const [activeTaskIndex, setActiveTaskIndex] = useState<number>(0);
  const [taskAnswers, setTaskAnswers] = useState<Record<string, string>>({});
  const [showHints, setShowHints] = useState<Record<string, boolean>>({});

  const currentTask = WORKED_EXAMPLE_DATA.tasks[activeTaskIndex];
  const allSolved = WORKED_EXAMPLE_DATA.tasks.every(
    (t) => taskAnswers[t.id] === t.correctAnswer
  );

  const handleSelectAnswer = (taskId: string, answer: string) => {
    const updated = { ...taskAnswers, [taskId]: answer };
    setTaskAnswers(updated);

    const isAllComplete = WORKED_EXAMPLE_DATA.tasks.every(
      (t) => updated[t.id] === t.correctAnswer
    );
    if (isAllComplete) {
      onComplete();
    }
  };

  const toggleHint = (taskId: string) => {
    setShowHints((prev) => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  // Coordinates for the Greenhouse Worked Example
  // Points: (08:00, 14), (10:00, 18), (12:00, 24), (14:00, 26), (16:00, 22), (18:00, 16)
  const graphWidth = 480;
  const graphHeight = 240;
  const leftPad = 60;
  const rightPad = 440;
  const topPad = 30;
  const botPad = 200;

  const getPtX = (i: number) => leftPad + (i / 5) * (rightPad - leftPad);
  const getPtY = (temp: number) => {
    // 10°C to 30°C scale
    const minT = 10;
    const maxT = 30;
    return botPad - ((temp - minT) / (maxT - minT)) * (botPad - topPad);
  };

  const points = WORKED_EXAMPLE_DATA.table.map((row, i) => ({
    x: getPtX(i),
    y: getPtY(row.temp),
    time: row.time,
    temp: row.temp,
  }));

  return (
    <section id="guided-practice" className="scroll-mt-32">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        {/* Step Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-6 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 mb-1">
              <span>Step 3 of 5</span>
              <span aria-hidden="true">·</span>
              <span>Cambridge Worked Example 16.2</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
              Guided Practice: Interpreting Data Step-by-Step
            </h2>
          </div>
          {isCompleted && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold rounded-lg border border-amber-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-700" />
              <span>Goal 3 Achieved</span>
            </div>
          )}
        </div>

        {/* Cambridge Context */}
        <div className="bg-amber-50/80 border border-amber-200/90 rounded-xl p-4 sm:p-5 mb-6 text-sm text-stone-700 leading-relaxed">
          <div className="flex items-center gap-2 font-bold text-stone-900 mb-1">
            <BookOpen className="w-4 h-4 text-amber-700" />
            <span>Problem Context:</span>
          </div>
          <p>{WORKED_EXAMPLE_DATA.context}</p>
        </div>

        {/* Data Presentation: Table & Clean Line Graph */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          {/* Data Table */}
          <div className="lg:col-span-4 bg-white border border-stone-200 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                <Table className="w-3.5 h-3.5 text-amber-600" />
                <span>Recorded Data Table</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="border-b border-stone-200 bg-amber-50/60 text-stone-700">
                      <th className="py-2 px-2.5 font-bold">Time</th>
                      <th className="py-2 px-2.5 font-bold">Temp (°C)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 font-mono">
                    {WORKED_EXAMPLE_DATA.table.map((row, idx) => (
                      <tr
                        key={row.time}
                        className={`hover:bg-amber-50/50 transition-colors ${
                          idx === 2 && activeTaskIndex === 0
                            ? 'bg-amber-100/90 font-bold text-amber-950'
                            : ''
                        }`}
                      >
                        <td className="py-2 px-2.5 text-stone-700">{row.time}</td>
                        <td className="py-2 px-2.5 text-stone-900 font-semibold">{row.temp}°C</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-[11px] text-stone-500 mt-2">
              Tip: Read across the row or trace up from the axis.
            </p>
          </div>

          {/* Time Series Graph */}
          <div className="lg:col-span-8 bg-amber-50/30 border border-amber-200/80 rounded-xl p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-stone-600 mb-1">
              <span className="font-bold text-stone-900">Lab Greenhouse Temperature</span>
              <span>10°C to 30°C Scale</span>
            </div>

            {/* SVG Graph */}
            <div className="relative w-full aspect-[5/2.5] bg-white rounded-lg border border-stone-200 shadow-2xs overflow-hidden select-none">
              <svg viewBox={`0 0 ${graphWidth} ${graphHeight}`} className="w-full h-full">
                {/* Horizontal grid lines */}
                {[10, 15, 20, 25, 30].map((tempVal) => {
                  const y = getPtY(tempVal);
                  return (
                    <g key={tempVal}>
                      <line x1={leftPad} y1={y} x2={rightPad} y2={y} stroke="#fef3c7" strokeWidth="1" />
                      <text x={leftPad - 8} y={y + 3} textAnchor="end" className="text-[10px] font-mono fill-stone-400">
                        {tempVal}°C
                      </text>
                    </g>
                  );
                })}

                {/* Vertical grid lines */}
                {points.map((pt, i) => (
                  <g key={i}>
                    <line x1={pt.x} y1={topPad} x2={pt.x} y2={botPad} stroke="#fafaf9" strokeWidth="1" />
                    <line x1={pt.x} y1={botPad} x2={pt.x} y2={botPad + 4} stroke="#a8a29e" />
                    <text x={pt.x} y={botPad + 16} textAnchor="middle" className="text-[10px] font-mono fill-stone-600">
                      {pt.time}
                    </text>
                  </g>
                ))}

                {/* Axes lines */}
                <line x1={leftPad} y1={topPad - 5} x2={leftPad} y2={botPad} stroke="#44403c" strokeWidth="1.5" />
                <line x1={leftPad} y1={botPad} x2={rightPad + 10} y2={botPad} stroke="#44403c" strokeWidth="1.5" />

                {/* Special highlight for Task 1: 12:00 reading */}
                {activeTaskIndex === 0 && (
                  <g>
                    <line
                      x1={points[2].x}
                      y1={botPad}
                      x2={points[2].x}
                      y2={points[2].y}
                      stroke="#d97706"
                      strokeWidth="2"
                      strokeDasharray="3,3"
                    />
                    <line
                      x1={leftPad}
                      y1={points[2].y}
                      x2={points[2].x}
                      y2={points[2].y}
                      stroke="#d97706"
                      strokeWidth="2"
                      strokeDasharray="3,3"
                    />
                  </g>
                )}

                {/* Connecting Line Segments */}
                <polyline
                  points={points.map((p) => `${p.x},${p.y}`).join(' ')}
                  fill="none"
                  stroke="#d97706"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Plotted Points with small crosses */}
                {points.map((p, i) => (
                  <g key={i}>
                    <line x1={p.x - 3.5} y1={p.y - 3.5} x2={p.x + 3.5} y2={p.y + 3.5} stroke="#b45309" strokeWidth="2.2" />
                    <line x1={p.x - 3.5} y1={p.y + 3.5} x2={p.x + 3.5} y2={p.y - 3.5} stroke="#b45309" strokeWidth="2.2" />
                    <circle cx={p.x} cy={p.y} r="2" fill="#78350f" />
                    <text x={p.x} y={p.y - 7} textAnchor="middle" className="text-[10px] font-mono fill-stone-700 font-bold">
                      {p.temp}°
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </div>

        {/* 4 Progressive Micro-Tasks */}
        <div className="border border-stone-200 rounded-xl p-5 bg-white">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                Worked Example Questions:
              </span>
              <span className="text-xs text-stone-500">
                (Solve all 4 to complete Goal 3)
              </span>
            </div>

            {/* Task selector tabs */}
            <div className="flex items-center gap-1.5">
              {WORKED_EXAMPLE_DATA.tasks.map((task, idx) => {
                const isCurrent = activeTaskIndex === idx;
                const isCorrect = taskAnswers[task.id] === task.correctAnswer;
                return (
                  <button
                    key={task.id}
                    onClick={() => setActiveTaskIndex(idx)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all flex items-center justify-center ${
                      isCurrent
                        ? 'bg-amber-400 text-amber-950 font-black border border-amber-300 shadow-xs'
                        : isCorrect
                        ? 'bg-amber-100 text-amber-900 border border-amber-200'
                        : 'bg-stone-100 text-stone-600 hover:bg-amber-50'
                    }`}
                  >
                    {String.fromCharCode(97 + idx)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Task Details */}
          <div className="bg-amber-50/40 border border-amber-200/80 rounded-xl p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3 mb-3">
              <h3 className="text-sm sm:text-base font-bold text-stone-900 leading-snug">
                {currentTask.question}
              </h3>
              <button
                onClick={() => toggleHint(currentTask.id)}
                className="inline-flex items-center gap-1 text-xs text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 px-2.5 py-1 rounded-md shrink-0 font-semibold transition-colors"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{showHints[currentTask.id] ? 'Hide Hint' : 'Show Hint'}</span>
              </button>
            </div>

            {/* Hint Callout */}
            {showHints[currentTask.id] && (
              <div className="mb-4 p-3 bg-amber-100/80 border border-amber-300 rounded-lg text-xs text-amber-950 leading-relaxed">
                <strong>Hint:</strong> {currentTask.hint}
              </div>
            )}

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
              {currentTask.options.map((option) => {
                const isChosen = taskAnswers[currentTask.id] === option;
                const isRight = option === currentTask.correctAnswer;

                return (
                  <button
                    key={option}
                    onClick={() => handleSelectAnswer(currentTask.id, option)}
                    className={`p-3 rounded-lg text-xs font-semibold text-left border transition-all flex items-center justify-between ${
                      isChosen
                        ? isRight
                          ? 'bg-amber-100 border-amber-400 text-amber-950 font-bold shadow-2xs'
                          : 'bg-rose-50 border-rose-300 text-rose-950'
                        : 'bg-white border-stone-200 text-stone-700 hover:border-amber-400 hover:bg-amber-50/30'
                    }`}
                  >
                    <span>{option}</span>
                    {isChosen && isRight && (
                      <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback & Reasoning */}
            {taskAnswers[currentTask.id] && (
              <div
                className={`p-3 rounded-lg text-xs leading-relaxed ${
                  taskAnswers[currentTask.id] === currentTask.correctAnswer
                    ? 'bg-amber-50 border border-amber-300 text-amber-950 font-medium'
                    : 'bg-rose-50 border border-rose-200 text-rose-900'
                }`}
              >
                {taskAnswers[currentTask.id] === currentTask.correctAnswer ? (
                  <p>
                    <strong className="font-bold">Correct! </strong>
                    {currentTask.reasoning}
                  </p>
                ) : (
                  <p>
                    <strong className="font-bold">Incorrect. </strong>
                    Try using the hint above and check the graph coordinates carefully.
                  </p>
                )}
              </div>
            )}

            {/* Next question navigation button */}
            <div className="flex justify-end mt-4">
              {activeTaskIndex < WORKED_EXAMPLE_DATA.tasks.length - 1 ? (
                <button
                  onClick={() => setActiveTaskIndex((prev) => prev + 1)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-amber-950 bg-amber-400 hover:bg-amber-500 rounded-lg transition-colors border border-amber-300 shadow-xs"
                >
                  <span>Next Question ({String.fromCharCode(98 + activeTaskIndex)})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <div className="text-xs text-stone-500 font-medium">
                  {allSolved ? (
                    <span className="text-amber-800 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-700" /> All 4 parts solved correctly!
                    </span>
                  ) : (
                    'Review all 4 parts above'
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
