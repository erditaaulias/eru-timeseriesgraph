import React, { useState } from 'react';
import { EXAM_QUESTIONS } from '../data/lessonData';
import { ExamQuestion } from '../types';
import { CheckCircle2, HelpCircle, Award, RotateCcw, ArrowRight, Lightbulb, Check, ChevronRight } from 'lucide-react';

interface Step5ExamChallengeProps {
  onComplete: () => void;
  isCompleted: boolean;
  onOpenSummary: () => void;
}

export const Step5ExamChallenge: React.FC<Step5ExamChallengeProps> = ({
  onComplete,
  isCompleted,
  onOpenSummary,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [showHint, setShowHint] = useState<boolean>(false);
  const [studentName, setStudentName] = useState<string>('Alex Johnson');
  const [showCertificate, setShowCertificate] = useState<boolean>(false);

  const q: ExamQuestion = EXAM_QUESTIONS[currentQuestionIndex];
  const userAnswer = userAnswers[q.id];
  const isAnswered = userAnswer !== undefined;
  const isCorrect = userAnswer === q.correctAnswer;

  const totalQuestions = EXAM_QUESTIONS.length;
  const correctCount = EXAM_QUESTIONS.filter(
    (item) => userAnswers[item.id] === item.correctAnswer
  ).length;

  const handleSelectOption = (option: string) => {
    const updated = { ...userAnswers, [q.id]: option };
    setUserAnswers(updated);

    const answeredCount = Object.keys(updated).length;
    const correctTotal = EXAM_QUESTIONS.filter(
      (item) => updated[item.id] === item.correctAnswer
    ).length;

    // Trigger completion if student has answered all or scored at least 4 out of 5
    if (correctTotal >= 4 || answeredCount === totalQuestions) {
      onComplete();
    }
  };

  const handleNext = () => {
    setShowHint(false);
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setShowCertificate(true);
    }
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setShowHint(false);
    setShowCertificate(false);
  };

  // SVG rendering dimensions for Exam Challenge
  const svgW = 460;
  const svgH = 220;
  const padL = 55;
  const padR = 430;
  const padT = 25;
  const padB = 180;

  // Calculate scales for the current question's graph
  const allValues = q.lines.flatMap((l) => l.points.map((p) => p.value));
  const minVal = Math.min(0, ...allValues);
  const maxVal = Math.max(...allValues);
  const yRange = maxVal - minVal || 1;
  const maxYAxis = Math.ceil(maxVal * 1.15);

  const getPtX = (idx: number, totalPts: number) => {
    return padL + (idx / (totalPts - 1)) * (padR - padL);
  };

  const getPtY = (val: number) => {
    return padB - (val / maxYAxis) * (padB - padT);
  };

  return (
    <section id="exam-challenge" className="scroll-mt-32">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        {/* Step Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-6 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 mb-1">
              <span>Step 5 of 5</span>
              <span aria-hidden="true">·</span>
              <span>Cambridge Checkpoint Style Practice</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
              Exam Challenge: Check Your Understanding
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-stone-500">
              Score: <strong className="text-amber-950 font-bold">{correctCount} / {totalQuestions}</strong>
            </span>
            {isCompleted && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold rounded-lg border border-amber-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-700" />
                <span>Goal 5 Achieved</span>
              </div>
            )}
          </div>
        </div>

        {/* Certificate Modal / View if unlocked */}
        {showCertificate && correctCount >= 4 ? (
          <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100/70 border-2 border-amber-300 rounded-2xl p-6 sm:p-8 text-center max-w-2xl mx-auto shadow-sm my-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center mx-auto mb-4 shadow-sm border border-amber-300">
              <Award className="w-9 h-9" />
            </div>

            <span className="text-xs font-bold text-amber-950 uppercase tracking-widest bg-amber-200/80 px-3 py-1 rounded-full border border-amber-300">
              Cambridge Stage 8 Certificate of Achievement
            </span>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-4">
              Time Series Graph Master
            </h3>

            <p className="text-sm text-stone-600 mt-2 max-w-md mx-auto">
              This certifies that <strong className="text-stone-900">{studentName}</strong> has successfully completed all 5 Cambridge Stage 8 success criteria for Subtopic 16.2.
            </p>

            <div className="mt-4 max-w-xs mx-auto">
              <label className="text-xs font-semibold text-stone-500 block mb-1">Student Name on Certificate:</label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full text-center px-3 py-1.5 text-sm font-bold border border-amber-300 rounded-lg bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={onOpenSummary}
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-amber-950 text-xs font-bold rounded-lg shadow-xs border border-amber-300 transition-colors"
              >
                Open & Print Revision Card
              </button>
              <button
                onClick={handleResetQuiz}
                className="px-4 py-2.5 bg-white border border-stone-200 hover:bg-amber-50 text-stone-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retry Challenge</span>
              </button>
            </div>
          </div>
        ) : (
          /* Active Question Interface */
          <div>
            {/* Progress indicator */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {EXAM_QUESTIONS.map((item, idx) => {
                  const isCur = currentQuestionIndex === idx;
                  const ans = userAnswers[item.id];
                  const isRight = ans === item.correctAnswer;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setShowHint(false);
                        setCurrentQuestionIndex(idx);
                      }}
                      className={`w-7 h-7 rounded-lg text-xs font-bold transition-all flex items-center justify-center ${
                        isCur
                          ? 'bg-amber-400 text-amber-950 font-black border border-amber-300 shadow-xs'
                          : ans !== undefined
                          ? isRight
                            ? 'bg-amber-100 text-amber-900 border border-amber-200'
                            : 'bg-rose-100 text-rose-800'
                          : 'bg-stone-100 text-stone-600 hover:bg-amber-50'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              <span className="text-xs text-stone-500">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </span>
            </div>

            {/* Split Screen: Left Diagram, Right Question */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Left: Question Diagram */}
              <div className="lg:col-span-6 bg-amber-50/30 border border-amber-200/80 rounded-xl p-4 sm:p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                    <span className="font-bold text-stone-800">{q.title}</span>
                    <span>{q.unit}</span>
                  </div>
                  <p className="text-xs text-stone-600 mb-3">{q.scenarioDescription}</p>
                </div>

                {/* SVG Graph for Question */}
                <div className="relative w-full aspect-[5/2.6] bg-white rounded-lg border border-stone-200 shadow-2xs overflow-hidden select-none">
                  <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-full">
                    {/* Horizontal grid lines */}
                    {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
                      const y = padB - ratio * (padB - padT);
                      const val = (ratio * maxYAxis).toFixed(1);
                      return (
                        <g key={ratio}>
                          <line x1={padL} y1={y} x2={padR} y2={y} stroke="#fef3c7" strokeWidth="1" />
                          <text x={padL - 6} y={y + 3} textAnchor="end" className="text-[10px] font-mono fill-stone-400">
                            {val}
                          </text>
                        </g>
                      );
                    })}

                    {/* Time ticks on bottom axis */}
                    {q.lines[0].points.map((pt, i) => {
                      const x = getPtX(i, q.lines[0].points.length);
                      return (
                        <g key={i}>
                          <line x1={x} y1={padB} x2={x} y2={padB + 4} stroke="#a8a29e" />
                          <text x={x} y={padB + 16} textAnchor="middle" className="text-[10px] font-mono fill-stone-600">
                            {pt.label}
                          </text>
                        </g>
                      );
                    })}

                    {/* Axes lines */}
                    <line x1={padL} y1={padT - 5} x2={padL} y2={padB} stroke="#44403c" strokeWidth="1.5" />
                    <line x1={padL} y1={padB} x2={padR + 10} y2={padB} stroke="#44403c" strokeWidth="1.5" />

                    {/* Question Lines */}
                    {q.lines.map((line, lIdx) => {
                      // Apply warm yellow & amber palette
                      const lineColor = lIdx === 0 ? '#d97706' : '#78350f';
                      return (
                        <g key={line.name}>
                          {/* Connecting Line Segments */}
                          <polyline
                            points={line.points.map((p, i) => `${getPtX(i, line.points.length)},${getPtY(p.value)}`).join(' ')}
                            fill="none"
                            stroke={lineColor}
                            strokeWidth="2.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          {/* Plotted crosses */}
                          {line.points.map((p, i) => {
                            const x = getPtX(i, line.points.length);
                            const y = getPtY(p.value);
                            return (
                              <g key={i}>
                                <line x1={x - 3} y1={y - 3} x2={x + 3} y2={y + 3} stroke={lineColor} strokeWidth="2.2" />
                                <line x1={x - 3} y1={y + 3} x2={x + 3} y2={y - 3} stroke={lineColor} strokeWidth="2.2" />
                                <circle cx={x} cy={y} r="1.5" fill={lineColor} />
                              </g>
                            );
                          })}
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Graph Legend if dual line */}
                {q.graphType === 'dual' && (
                  <div className="flex items-center gap-4 mt-3 text-xs font-semibold justify-center">
                    {q.lines.map((l, lIdx) => (
                      <div key={l.name} className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: lIdx === 0 ? '#d97706' : '#78350f' }} />
                        <span className="text-stone-700">{l.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: Question Prompt & Answer Choices */}
              <div className="lg:col-span-6 bg-white border border-stone-200 rounded-xl p-5 sm:p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                      {q.questionNumber}
                    </span>
                    <button
                      onClick={() => setShowHint(!showHint)}
                      className="inline-flex items-center gap-1 text-xs text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 px-2.5 py-0.5 rounded transition-colors font-semibold"
                    >
                      <HelpCircle className="w-3 h-3" />
                      <span>{showHint ? 'Hide Hint' : 'Hint'}</span>
                    </button>
                  </div>

                  <h3 className="text-base font-bold text-stone-900 mb-3 leading-snug">
                    {q.prompt}
                  </h3>

                  {/* Hint callout */}
                  {showHint && (
                    <div className="mb-4 p-3 bg-amber-100/80 border border-amber-300 rounded-lg text-xs text-amber-950 leading-relaxed">
                      <strong>Exam Hint:</strong> {q.hint}
                    </div>
                  )}

                  {/* Options */}
                  <div className="space-y-2 mb-4">
                    {q.options?.map((opt) => {
                      const isChosen = userAnswer === opt;
                      const isRight = opt === q.correctAnswer;

                      return (
                        <button
                          key={opt}
                          onClick={() => handleSelectOption(opt)}
                          className={`w-full text-left p-3 rounded-lg text-xs font-medium border transition-colors flex items-center justify-between ${
                            isChosen
                              ? isRight
                                ? 'bg-amber-100 border-amber-400 text-amber-950 font-bold'
                                : 'bg-rose-50 border-rose-300 text-rose-950 font-bold'
                              : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-amber-50/50'
                          }`}
                        >
                          <span>{opt}</span>
                          {isChosen && (
                            isRight ? (
                              <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />
                            ) : (
                              <span className="text-rose-600 font-bold text-sm shrink-0">✕</span>
                            )
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback explanation */}
                  {isAnswered && (
                    <div
                      className={`p-3.5 rounded-xl text-xs leading-relaxed mb-3 ${
                        isCorrect
                          ? 'bg-amber-50 border border-amber-300 text-amber-950'
                          : 'bg-rose-50 border border-rose-200 text-rose-950'
                      }`}
                    >
                      <p className="font-bold mb-0.5">
                        {isCorrect ? '✓ Correct Answer!' : '✗ Not Quite:'}
                      </p>
                      <p>{q.explanation}</p>
                      <p className="mt-2 text-stone-600 font-medium border-t border-amber-200/60 pt-1.5">
                        <strong className="text-stone-800">Cambridge Examiner Tip:</strong> {q.cambridgeTip}
                      </p>
                    </div>
                  )}
                </div>

                {/* Next navigation */}
                <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                  <span className="text-xs text-stone-500">
                    {isAnswered ? 'Answer recorded' : 'Select an answer to continue'}
                  </span>

                  <button
                    onClick={handleNext}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-amber-950 bg-amber-400 hover:bg-amber-500 rounded-lg transition-colors border border-amber-300 shadow-xs"
                  >
                    <span>{currentQuestionIndex < totalQuestions - 1 ? 'Next Question' : 'View Results'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
