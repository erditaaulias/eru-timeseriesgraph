import React, { useState } from 'react';
import { GLOSSARY_TERMS } from '../data/lessonData';
import { X, Search, BookOpen, Lightbulb } from 'lucide-react';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filtered = GLOSSARY_TERMS.filter(
    (g) =>
      g.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-amber-200/80 flex items-center justify-between bg-amber-50/60">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-200 text-amber-950 flex items-center justify-center font-bold">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">
                Cambridge Stage 8 Maths Glossary
              </h3>
              <p className="text-xs text-stone-500">
                Key terms and definitions for Time Series Graphs
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-600 rounded-lg hover:bg-amber-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-4 border-b border-stone-100 bg-white">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search a term (e.g. trend, axis, seasonal)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs font-medium border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400"
            />
          </div>
        </div>

        {/* List of Terms */}
        <div className="p-5 overflow-y-auto space-y-3.5 divide-y divide-stone-100">
          {filtered.length === 0 ? (
            <p className="text-xs text-stone-500 text-center py-6">
              No matching terms found. Try searching for "trend" or "axis".
            </p>
          ) : (
            filtered.map((item, idx) => (
              <div key={item.term} className={idx > 0 ? 'pt-3.5' : ''}>
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-bold text-stone-900">{item.term}</h4>
                  <span className="text-[10px] uppercase font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-200">
                    Key Term
                  </span>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed mb-1.5">
                  {item.definition}
                </p>
                <div className="text-[11px] text-stone-500 mb-1">
                  <strong>Example:</strong> {item.example}
                </div>
                <div className="text-[11px] text-amber-950 bg-amber-50 border border-amber-200/90 p-2 rounded-md flex items-start gap-1.5">
                  <Lightbulb className="w-3 h-3 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Remember:</strong> {item.remember}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-amber-50/40 border-t border-amber-200/80 text-right">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-stone-700 bg-white border border-stone-300 rounded-lg hover:bg-amber-50 transition-colors"
          >
            Close Glossary
          </button>
        </div>
      </div>
    </div>
  );
};
