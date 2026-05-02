'use client';

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">My Research Library</h1>
        <p className="text-slate-600 mt-2">Manage and analyze your uploaded journals and papers</p>
      </div>

      {/* Dashboard Content */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Stats Cards */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <div className="text-3xl font-bold text-blue-600">0</div>
          <p className="text-slate-600 mt-2">Papers Uploaded</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <div className="text-3xl font-bold text-green-600">0</div>
          <p className="text-slate-600 mt-2">Papers Analyzed</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <div className="text-3xl font-bold text-purple-600">0</div>
          <p className="text-slate-600 mt-2">Reading Hours Saved</p>
        </div>
      </div>

      {/* Papers List */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 text-center">
        <div className="text-6xl mb-4">📚</div>
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">No papers yet</h2>
        <p className="text-slate-600 mb-6">Upload your first journal or search for papers to get started</p>
        <a
          href="/upload"
          className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Upload Journal
        </a>
      </div>
    </div>
  );
}
