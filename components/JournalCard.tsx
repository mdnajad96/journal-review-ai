'use client';

import React from 'react';

interface JournalCardProps {
  title: string;
  authors: string[];
  date: string;
  abstract: string;
  source: 'arxiv' | 'crossref' | 'upload';
  summary?: string;
  keyFindings?: string[];
  onAnalyze?: () => void;
  onSave?: () => void;
}

export default function JournalCard({
  title,
  authors,
  date,
  abstract,
  source,
  summary,
  keyFindings,
  onAnalyze,
  onSave,
}: JournalCardProps) {
  const sourceColors: Record<string, string> = {
    arxiv: 'bg-red-100 text-red-800',
    crossref: 'bg-green-100 text-green-800',
    upload: 'bg-blue-100 text-blue-800',
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition border border-slate-200 overflow-hidden">
      {/* Card Header */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-slate-900 flex-1 pr-4">
            {title}
          </h3>
          <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${sourceColors[source]}`}>
            {source.toUpperCase()}
          </span>
        </div>
        <p className="text-sm text-slate-600 mb-2">
          {authors.slice(0, 2).join(', ')}{authors.length > 2 ? ` +${authors.length - 2} more` : ''}
        </p>
        <p className="text-xs text-slate-500">{date}</p>
      </div>

      {/* Abstract */}
      <div className="px-6 py-4 border-b border-slate-200">
        <p className="text-slate-700 text-sm line-clamp-3">{abstract}</p>
      </div>

      {/* Summary (if available) */}
      {summary && (
        <div className="px-6 py-4 bg-blue-50 border-b border-slate-200">
          <h4 className="text-sm font-semibold text-slate-900 mb-2">✨ AI Summary</h4>
          <p className="text-sm text-slate-700 line-clamp-2">{summary}</p>
        </div>
      )}

      {/* Key Findings (if available) */}
      {keyFindings && keyFindings.length > 0 && (
        <div className="px-6 py-4 bg-green-50 border-b border-slate-200">
          <h4 className="text-sm font-semibold text-slate-900 mb-2">🔍 Key Findings</h4>
          <ul className="space-y-1">
            {keyFindings.slice(0, 3).map((finding, i) => (
              <li key={i} className="text-xs text-slate-700 flex items-start">
                <span className="mr-2">•</span>
                <span className="line-clamp-1">{finding}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Actions */}
      <div className="px-6 py-4 bg-slate-50 flex space-x-3">
        {onAnalyze && (
          <button
            onClick={onAnalyze}
            className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
          >
            🤖 Analyze
          </button>
        )}
        {onSave && (
          <button
            onClick={onSave}
            className="flex-1 px-4 py-2 bg-slate-200 text-slate-900 text-sm font-medium rounded-lg hover:bg-slate-300 transition"
          >
            💾 Save
          </button>
        )}
      </div>
    </div>
  );
}
