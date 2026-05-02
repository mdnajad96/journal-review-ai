'use client';

import { useState, useEffect } from 'react';
import JournalCard from '@/components/JournalCard';

interface Paper {
  id: string;
  title: string;
  authors: string[];
  date: string;
  abstract: string;
  source: 'upload' | 'arxiv' | 'crossref';
  summary?: string;
  keyFindings?: string[];
}

export default function DashboardImproved() {
  const [papers, setPapers] = useState<Paper[]>([
    {
      id: '1',
      title: 'Deep Learning Advances in Natural Language Processing',
      authors: ['John Doe', 'Jane Smith', 'Bob Johnson'],
      date: '2024-05-01',
      abstract: 'This paper explores recent advances in deep learning techniques for NLP tasks...',
      source: 'arxiv',
      summary:
        'The paper presents new methodologies for improving transformer-based models using novel attention mechanisms and knowledge distillation techniques. Key contributions include a 15% improvement in BLEU scores on translation tasks.',
      keyFindings: ['Transformer efficiency improved by 15%', 'New attention mechanism proposed', 'Knowledge distillation reduces model size'],
    },
  ]);

  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
  const [stats, setStats] = useState({
    total: 1,
    analyzed: 1,
    hoursRead: 2.5,
  });

  useEffect(() => {
    setStats({
      total: papers.length,
      analyzed: papers.filter((p) => p.summary).length,
      hoursRead: papers.length * 0.5,
    });
  }, [papers]);

  const handleAnalyze = (paperId: string) => {
    const paper = papers.find((p) => p.id === paperId);
    if (paper) {
      setSelectedPaper(paper);
    }
  };

  const handleDelete = (paperId: string) => {
    setPapers(papers.filter((p) => p.id !== paperId));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">My Research Library</h1>
        <p className="text-slate-600 mt-2">Manage and analyze your uploaded journals and papers</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg shadow-sm border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Papers Uploaded</p>
              <div className="text-4xl font-bold text-blue-600 mt-2">{stats.total}</div>
            </div>
            <div className="text-5xl opacity-30">📄</div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg shadow-sm border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Papers Analyzed</p>
              <div className="text-4xl font-bold text-green-600 mt-2">{stats.analyzed}</div>
            </div>
            <div className="text-5xl opacity-30">✓</div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg shadow-sm border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Reading Hours Saved</p>
              <div className="text-4xl font-bold text-purple-600 mt-2">{stats.hoursRead.toFixed(1)}</div>
            </div>
            <div className="text-5xl opacity-30">⏱️</div>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">
            All ({papers.length})
          </button>
          <button className="px-4 py-2 bg-slate-200 text-slate-900 rounded-lg text-sm font-medium hover:bg-slate-300 transition">
            Analyzed ({papers.filter((p) => p.summary).length})
          </button>
          <button className="px-4 py-2 bg-slate-200 text-slate-900 rounded-lg text-sm font-medium hover:bg-slate-300 transition">
            Unanalyzed ({papers.filter((p) => !p.summary).length})
          </button>
        </div>
        <a
          href="/upload"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
        >
          + Add Paper
        </a>
      </div>

      {/* Papers List */}
      {papers.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-12 text-center">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">No papers yet</h2>
          <p className="text-slate-600 mb-6">Upload your first journal or search for papers to get started</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/upload"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              📤 Upload Journal
            </a>
            <a
              href="/search"
              className="px-6 py-2 bg-slate-200 text-slate-900 rounded-lg hover:bg-slate-300 transition"
            >
              🔍 Search Papers
            </a>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {papers.map((paper) => (
            <div key={paper.id} className="relative">
              <JournalCard
                {...paper}
                onAnalyze={() => handleAnalyze(paper.id)}
                onSave={() => handleDelete(paper.id)}
              />
              <button
                onClick={() => handleDelete(paper.id)}
                className="absolute top-4 right-4 text-slate-400 hover:text-red-600 transition"
                title="Delete"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal (simplified) */}
      {selectedPaper && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="p-6 border-b border-slate-200 flex justify-between items-start">
              <h2 className="text-xl font-bold text-slate-900">{selectedPaper.title}</h2>
              <button
                onClick={() => setSelectedPaper(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4">
              {selectedPaper.summary && (
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Summary</h3>
                  <p className="text-slate-700 text-sm">{selectedPaper.summary}</p>
                </div>
              )}
              {selectedPaper.keyFindings && (
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Key Findings</h3>
                  <ul className="space-y-1">
                    {selectedPaper.keyFindings.map((finding, i) => (
                      <li key={i} className="text-slate-700 text-sm flex items-start">
                        <span className="mr-2">•</span>
                        <span>{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
