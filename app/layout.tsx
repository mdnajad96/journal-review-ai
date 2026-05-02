import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'Journal Review AI',
  description: 'AI-powered journal review and research assistant',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
        <div className="flex flex-col min-h-screen">
          {/* Header */}
          <header className="bg-white shadow-sm border-b border-slate-200">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">J</span>
                  </div>
                  <h1 className="text-2xl font-bold text-slate-900">Journal Review AI</h1>
                </div>
                <div className="hidden md:flex space-x-6">
                  <Link href="/" className="text-slate-700 hover:text-blue-600 transition">Home</Link>
                  <Link href="/dashboard" className="text-slate-700 hover:text-blue-600 transition">Dashboard</Link>
                  <Link href="/upload" className="text-slate-700 hover:text-blue-600 transition">Upload</Link>
                  <Link href="/search" className="text-slate-700 hover:text-blue-600 transition">Search</Link>
                </div>
              </div>
            </nav>
          </header>

          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-white border-t border-slate-200 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-slate-600 text-sm">
                  © 2024 Journal Review AI. Built with ❤️ for researchers.
                </p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                  <a href="#" className="text-slate-600 hover:text-blue-600 text-sm transition">Privacy</a>
                  <a href="#" className="text-slate-600 hover:text-blue-600 text-sm transition">Terms</a>
                  <a href="#" className="text-slate-600 hover:text-blue-600 text-sm transition">Contact</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
