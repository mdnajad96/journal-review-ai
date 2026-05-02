'use client';

import { useState } from 'react';

export default function Search() {
  const [query, setQuery] = useState('');
  const [source, setSource] = useState('arxiv');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search functionality will be implemented
    console.log('Searching for:', query, 'from', source);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Search Papers</h1>
        <p className="text-slate-600 mt-2">Find the latest research papers on your topics of interest</p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter research topic (e.g., machine learning, quantum computing)"
            className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
          />
          <select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
          >
            <option value="arxiv">arXiv</option>
            <option value="crossref">CrossRef</option>
            <option value="all">All Sources</option>
          </select>
          <button
            type="submit"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>
      </form>

      {/* Results Placeholder */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-12 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">No results yet</h2>
        <p className="text-slate-600">Enter a research topic and click search to find papers</p>
      </div>

      {/* Popular Topics */}
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
              onClick={() => setQuery(topic)}
              className="px-4 py-2 bg-slate-100 hover:bg-blue-100 text-slate-900 rounded-lg transition border border-slate-200"
            >
              {topic}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
