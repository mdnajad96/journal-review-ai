'use client';

import React from 'react';
import Link from 'next/link';

interface FooterProps {
  compact?: boolean;
}

export default function Footer({ compact = false }: FooterProps) {
  if (compact) {
    return (
      <footer className="bg-white border-t border-slate-200 mt-8 py-4">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-600 text-sm">
          © 2024 Journal Review AI. Built with ❤️ for researchers.
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-gradient-to-br from-slate-900 to-slate-800 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">J</span>
              </div>
              <h3 className="text-xl font-bold">Journal Review AI</h3>
            </div>
            <p className="text-slate-400 text-sm">
              AI-powered research assistant for academic journals
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/" className="hover:text-white transition">Home</Link></li>
              <li><Link href="/upload" className="hover:text-white transition">Upload</Link></li>
              <li><Link href="/search" className="hover:text-white transition">Search</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition">Dashboard</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-white transition">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition">API Docs</a></li>
              <li><a href="#" className="hover:text-white transition">GitHub</a></li>
              <li><a href="#" className="hover:text-white transition">Support</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-slate-400 text-sm mb-3">Get updates on new features</p>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full px-3 py-2 bg-slate-700 rounded text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">
            © 2024 Journal Review AI. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-sm text-slate-400">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="#" className="hover:text-white transition">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
