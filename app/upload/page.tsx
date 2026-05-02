'use client';

import { useState, useRef } from 'react';
import Alert from '@/components/Alert';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function UploadImproved() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadTab, setUploadTab] = useState<'pdf' | 'endnote'>('pdf');
  const [alert, setAlert] = useState<{ type: 'success' | 'error' | 'info'; title: string; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      handleFileSelect(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleFileSelect = (selectedFile: File) => {
    // Validate file size (max 50MB)
    const maxSize = 50 * 1024 * 1024;
    if (selectedFile.size > maxSize) {
      setAlert({
        type: 'error',
        title: 'File Too Large',
        message: 'Please upload a file smaller than 50MB',
      });
      return;
    }

    // Validate file type
    if (uploadTab === 'pdf' && selectedFile.type !== 'application/pdf') {
      setAlert({
        type: 'error',
        title: 'Invalid File Type',
        message: 'Please upload a PDF file',
      });
      return;
    }

    if (uploadTab === 'endnote' && !['text/plain', 'application/xml', 'text/xml'].includes(selectedFile.type)) {
      if (!selectedFile.name.endsWith('.bib') && !selectedFile.name.endsWith('.xml')) {
        setAlert({
          type: 'error',
          title: 'Invalid File Type',
          message: 'Please upload a BibTeX or XML file',
        });
        return;
      }
    }

    setFile(selectedFile);
    setAlert(null);
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', uploadTab);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      setAlert({
        type: 'success',
        title: 'Upload Successful',
        message: 'Your file has been uploaded and is being analyzed by AI',
      });
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (error) {
      setAlert({
        type: 'error',
        title: 'Upload Failed',
        message: error instanceof Error ? error.message : 'An error occurred',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Upload Journal</h1>
        <p className="text-slate-600 mt-2">Upload a PDF or import from Endnote for AI analysis</p>
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

      {/* Upload Tabs */}
      <div className="flex space-x-4 mb-8 border-b border-slate-200">
        <button
          onClick={() => {
            setUploadTab('pdf');
            setFile(null);
          }}
          className={`px-4 py-2 border-b-2 font-semibold transition ${
            uploadTab === 'pdf'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          📄 PDF Upload
        </button>
        <button
          onClick={() => {
            setUploadTab('endnote');
            setFile(null);
          }}
          className={`px-4 py-2 border-b-2 font-semibold transition ${
            uploadTab === 'endnote'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          📚 Endnote Import
        </button>
      </div>

      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-12 text-center transition cursor-pointer ${
          isDragging ? 'border-blue-600 bg-blue-50' : 'border-slate-300 bg-slate-50 hover:border-slate-400'
        }`}
      >
        <div className="text-6xl mb-4">{uploadTab === 'pdf' ? '📄' : '📚'}</div>
        <h3 className="text-xl font-semibold text-slate-900 mb-2">
          {uploadTab === 'pdf' ? 'Drag and drop your PDF' : 'Drag and drop your Endnote file'}
        </h3>
        <p className="text-slate-600 mb-6">or</p>
        <label className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition">
          Choose File
          <input
            ref={fileInputRef}
            type="file"
            accept={uploadTab === 'pdf' ? '.pdf' : '.bib,.xml'}
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      {/* File Info */}
      {file && (
        <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
          <p className="text-green-800">
            ✓ File selected: <strong>{file.name}</strong> ({(file.size / 1024 / 1024).toFixed(2)} MB)
          </p>
          <button
            onClick={() => setFile(null)}
            className="text-green-600 hover:text-green-800 transition"
          >
            ✕ Remove
          </button>
        </div>
      )}

      {/* Upload Button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={handleUpload}
          disabled={!file || isUploading}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          {isUploading ? (
            <>
              <LoadingSpinner size="small" />
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <span>🤖</span>
              <span>Analyze with AI</span>
            </>
          )}
        </button>
      </div>

      {/* Info Section */}
      <div className="mt-12 grid md:grid-cols-2 gap-8">
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-slate-900 mb-3">✨ What AI Will Do</h4>
          <ul className="space-y-2 text-slate-700 text-sm">
            <li className="flex items-start">
              <span className="mr-3">✓</span>
              <span>Generate a comprehensive summary</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">✓</span>
              <span>Extract key findings and insights</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">✓</span>
              <span>Identify research gaps and opportunities</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">✓</span>
              <span>Suggest related papers to explore</span>
            </li>
          </ul>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
          <h4 className="font-semibold text-slate-900 mb-3">📋 Supported Formats</h4>
          <ul className="space-y-2 text-slate-700 text-sm">
            <li className="flex items-start">
              <span className="mr-3">✓</span>
              <span>PDF documents (up to 50MB)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">✓</span>
              <span>Endnote BibTeX exports (.bib)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">✓</span>
              <span>Endnote XML files (.xml)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">✓</span>
              <span>RIS format files</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
