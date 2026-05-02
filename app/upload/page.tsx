'use client';

import { useState } from 'react';

export default function Upload() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Upload Journal</h1>
        <p className="text-slate-600 mt-2">Upload a PDF or import from Endnote for AI analysis</p>
      </div>

      {/* Upload Tabs */}
      <div className="flex space-x-4 mb-8 border-b border-slate-200">
        <button className="px-4 py-2 border-b-2 border-blue-600 text-blue-600 font-semibold">
          PDF Upload
        </button>
        <button className="px-4 py-2 text-slate-600 hover:text-slate-900">
          Endnote Import
        </button>
      </div>

      {/* PDF Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-12 text-center transition ${
          isDragging ? 'border-blue-600 bg-blue-50' : 'border-slate-300 bg-slate-50 hover:border-slate-400'
        }`}
      >
        <div className="text-6xl mb-4">📄</div>
        <h3 className="text-xl font-semibold text-slate-900 mb-2">Drag and drop your PDF</h3>
        <p className="text-slate-600 mb-6">or</p>
        <label className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition">
          Choose File
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      {/* File Info */}
      {file && (
        <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800">
            ✓ File selected: <strong>{file.name}</strong> ({(file.size / 1024 / 1024).toFixed(2)} MB)
          </p>
        </div>
      )}

      {/* Upload Button */}
      <div className="mt-8 flex justify-center">
        <button
          disabled={!file}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-slate-400 disabled:cursor-not-allowed"
        >
          Analyze with AI
        </button>
      </div>

      {/* Info Section */}
      <div className="mt-12 grid md:grid-cols-2 gap-8">
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-slate-900 mb-3">✨ What AI Will Do</h4>
          <ul className="space-y-2 text-slate-700 text-sm">
            <li>• Generate a comprehensive summary</li>
            <li>• Extract key findings</li>
            <li>• Identify research gaps</li>
            <li>• Suggest related papers</li>
          </ul>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
          <h4 className="font-semibold text-slate-900 mb-3">📋 Supported Formats</h4>
          <ul className="space-y-2 text-slate-700 text-sm">
            <li>• PDF documents</li>
            <li>• Endnote exports (BibTeX)</li>
            <li>• Endnote XML files</li>
            <li>• RIS format</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
