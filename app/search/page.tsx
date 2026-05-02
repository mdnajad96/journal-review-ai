'use client';

import { useState } from 'react';
import Alert from '@/components/Alert';
import JournalCard from '@/components/JournalCard';
import LoadingSpinner from '@/components/LoadingSpinner';

interface Paper {
  id: string;
  title: string;
  authors: string[];
  date: string;
  abstract: string;
  source: 'arxiv' | 'crossref' | 'upload';
  url?: string;
}

export default function SearchImproved() {
  const [query, setQuery] = useState('');
  const [source, setSource] = useState('all');
  const [papers, setPapers] = useState<Paper[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [alert, setAlert] = useState<{ type: 'error' | 'info'; title: string; message: string } | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      setAlert({
        type: 'info',
        title: 'Please Enter a Topic',
        message: 'Enter a research topic to search for papers',
      });
      return;
    }

    setIsSearching(true);
    setHasSearched(true);
    try {
      const response = await fetch(
        `/api/search?topic=${encodeURIComponent(query)}&source=${source}&limit=10`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Search failed');
      }

      const formattedPapers: Paper[] = (data.papers || []).map(
        (paper: any, index: number) => ({
          id: `${paper.source}-${index}`,
          title: paper.title,
          authors: paper.authors || [],
          date: paper.publishedDate || 'Unknown',
          abstract: paper.abstract || 'No abstract available',
          source: paper.source || 'arxiv',
          url: paper.url,
        })
      );

      setPapers(formattedPapers);

      if (formattedPapers.length === 0) {
        setAlert({
          type: 'info',
          title: 'No Results',
          message: 'Try a different search term or topic',
        });
      }
    } catch (error) {
      setAlert({
        type: 'error',
        title: 'Search Failed',
        message: error instanceof Error ? error.message : 'An error occurred',
      });
      setPapers([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleAnalyze = (paperId: string) => {
    const paper = papers.find((p) => p.id === paperId);
    if (paper) {
      // Implement analysis later
      window.alert(`Analyzing: ${paper.title}`);
    }
  };

  const handleSave = (paperId: string) => {
    const paper = papers.find((p) => p.id === paperId);
    if (paper) {
      window.alert(`Saved: ${paper.title}`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Search Papers</h1>
        <p className="text-slate-600 mt-2">Find the latest research papers on your topics of interest</p>
      </div>

      {/* Alerts */}
      {alert && (
        <div className="mb-6">
          <Alert
            type={alert.type}
            title={alert.title}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        </div>
      )}

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter research topic (e.g., machine learning, quantum computing)"
            className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
          />
          <select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 transition"
          >
            <option value="all">All Sources</option>
            <option value="arxiv">arXiv</option>
            <option value="crossref">CrossRef</option>
          </select>
          <button
            type="submit"
            disabled={isSearching}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2 whitespace-nowrap"
          >
            {isSearching ? (
              <>
                <LoadingSpinner size="small" />
                <span>Searching...</span>
              </>
            ) : (
              <>
                <span>🔍</span>
                <span>Search</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Results */}
      {hasSearched && !isSearching && papers.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-12 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">No results found</h2>
          <p className="text-slate-600">Try searching with different keywords</p>
        </div>
      )}

      {/* Loading State */}
      {isSearching && (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-12 flex justify-center">
          <LoadingSpinner text="Searching papers..." />
        </div>
      )}

      {/* Results Grid */}
      {papers.length > 0 && (
        <div className="mb-8">
          <p className="text-sm text-slate-600 mb-4">Found {papers.length} papers</p>
          <div className="grid gap-6">
            {papers.map((paper) => (
              <JournalCard
                key={paper.id}
                {...paper}
                onAnalyze={() => handleAnalyze(paper.id)}
                onSave={() => handleSave(paper.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Popular Topics */}
      {!hasSearched && (
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-slate-900 mb-6">Popular Topics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'Machine Learning',
              'Quantum Computing',
              'Biotechnology',
              'Renewable Energy',
              'Neural Networks',
              'Climate Science',
              'Nanotechnology',
              'Artificial Intelligence',
            ].map((topic) => (
              <button
                key={topic}
                onClick={() => {
                  setQuery(topic);
                  setHasSearched(true);
                }}
                className="px-4 py-2 bg-slate-100 hover:bg-blue-100 text-slate-900 hover:text-blue-900 rounded-lg transition border border-slate-200 font-medium"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
