export default function Home() {
  return (
    <div className="space-y-12 py-12">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6">
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
            Your AI-Powered Research Assistant
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Upload journals, search papers, and let AI summarize, analyze, and help polish your research—all in one place.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <a
              href="/upload"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition inline-block"
            >
              Upload Journal
            </a>
            <a
              href="/search"
              className="px-8 py-3 bg-slate-200 text-slate-900 rounded-lg font-semibold hover:bg-slate-300 transition inline-block"
            >
              Search Papers
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-12 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12 text-slate-900">Powerful Features</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '📄',
                title: 'Upload & Import',
                description: 'Upload PDF journals directly or import from your Endnote library with BibTeX exports.',
              },
              {
                icon: '🔍',
                title: 'Smart Search',
                description: 'Search the latest papers from arXiv and CrossRef by research topic.',
              },
              {
                icon: '🤖',
                title: 'AI Analysis',
                description: 'Get instant summaries, key findings, and help polishing your research proposals.',
              },
              {
                icon: '💾',
                title: 'Personal Library',
                description: 'Save and organize all your research papers in one central location.',
              },
              {
                icon: '📊',
                title: 'Insights & Trends',
                description: 'Discover patterns and trends across your research collection.',
              },
              {
                icon: '🎓',
                title: 'Student Friendly',
                description: 'Built for students with GitHub Student Pack and free AI credits.',
              },
            ].map((feature, index) => (
              <div key={index} className="p-6 bg-slate-50 rounded-lg hover:shadow-lg transition">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h4 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h4>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h3 className="text-3xl font-bold text-center mb-12 text-slate-900">How It Works</h3>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { number: 1, title: 'Upload', description: 'Add your journal PDF or Endnote file' },
            { number: 2, title: 'Process', description: 'AI analyzes and extracts key information' },
            { number: 3, title: 'Review', description: 'Read summaries and key findings' },
            { number: 4, title: 'Use', description: 'Polish proposals and write reviews' },
          ].map((step) => (
            <div key={step.number} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                {step.number}
              </div>
              <h4 className="text-lg font-semibold text-slate-900 mb-2">{step.title}</h4>
              <p className="text-slate-600 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Revolutionize Your Research?</h3>
          <p className="text-lg mb-8 opacity-90">
            Start analyzing your journals with AI today. It&apos;s free, it&apos;s fast, and it&apos;s designed for researchers like you.
          </p>
          <a
            href="/upload"
            className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-slate-100 transition inline-block"
          >
            Get Started Now
          </a>
        </div>
      </section>
    </div>
  );
}
