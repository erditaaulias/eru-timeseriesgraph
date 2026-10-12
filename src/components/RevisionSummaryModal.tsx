import React from 'react';
import { X, Printer, CheckCircle2, AlertTriangle, BookCheck } from 'lucide-react';

interface RevisionSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RevisionSummaryModal: React.FC<RevisionSummaryModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-xl border border-slate-200 overflow-hidden print:m-0 print:max-h-full print:shadow-none print:border-none">
        {/* Header */}
        <div className="p-5 border-b border-amber-200/80 flex items-center justify-between bg-amber-50/60 print:bg-white">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-400 text-amber-950 flex items-center justify-center font-bold border border-amber-300 print:hidden">
              <BookCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">
                Cambridge Stage 8 Revision Summary Card
              </h3>
              <p className="text-xs text-stone-500">
                Subtopic 16.2 Time Series Graphs · Quick Exam Reference
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 print:hidden">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-amber-950 bg-amber-200 hover:bg-amber-300 border border-amber-300 rounded-lg transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-600 rounded-lg hover:bg-amber-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-stone-700 leading-relaxed">
          {/* Rule 1: The 5 Golden Rules */}
          <div className="border border-amber-200 rounded-xl p-4 bg-amber-50/40">
            <h4 className="font-bold text-stone-900 text-sm mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-700" />
              <span>The 5 Golden Rules for Drawing a Time Series Graph:</span>
            </h4>
            <ol className="list-decimal pl-5 space-y-1.5 font-medium text-stone-800">
              <li>
                <strong>Time on the bottom:</strong> Always put the time variable on the horizontal (x) axis.
              </li>
              <li>
                <strong>Uniform scale:</strong> Use equal steps along both axes (e.g. 0, 5, 10, 15...).
              </li>
              <li>
                <strong>Plot with neat crosses:</strong> Use a sharp pencil to mark coordinates with small 'x' crosses.
              </li>
              <li>
                <strong>Use a ruler:</strong> Join consecutive points in time order with straight line segments.
              </li>
              <li>
                <strong>Always label:</strong> Include a descriptive title and axis names with units (e.g. °C, km/h, mm).
              </li>
            </ol>
          </div>

          {/* Rule 2: Describing Trends */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-white border border-amber-200 rounded-xl">
              <h5 className="font-bold text-stone-900 mb-1">Upward Trend ↗</h5>
              <p className="text-[11px] text-stone-600">
                The values are generally increasing over the time period.
              </p>
            </div>
            <div className="p-3 bg-white border border-stone-200 rounded-xl">
              <h5 className="font-bold text-stone-900 mb-1">Downward Trend ↘</h5>
              <p className="text-[11px] text-stone-600">
                The values are generally decreasing over the time period.
              </p>
            </div>
            <div className="p-3 bg-white border border-amber-200 rounded-xl">
              <h5 className="font-bold text-stone-900 mb-1">Seasonal Variation 〰</h5>
              <p className="text-[11px] text-stone-600">
                A regular repeating cycle (e.g. peaks every summer, dips every winter).
              </p>
            </div>
          </div>

          {/* Rule 3: Common Cambridge Exam Pitfalls */}
          <div className="border border-amber-300 bg-amber-50/80 rounded-xl p-4 text-amber-950">
            <h4 className="font-bold text-amber-950 text-sm mb-2 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
              <span>Watch Out! Common Exam Traps:</span>
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>
                <strong>Don't start at the origin (0,0)</strong> unless (0,0) is actually a data point in the table!
              </li>
              <li>
                <strong>Flat horizontal lines:</strong> A horizontal line segment means NO CHANGE happened during that time interval.
              </li>
              <li>
                <strong>Interpolation:</strong> You can only estimate values between plotted points if you assume the rate of change was constant.
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-amber-50/40 border-t border-amber-200/80 flex justify-end print:hidden">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-stone-700 bg-white border border-stone-300 rounded-lg hover:bg-amber-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
