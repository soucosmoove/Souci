import { useState } from 'react'

export default function Dashboard({ user, onLogout, onAnalyze }) {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-indigo-400">Souci</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm">{user.email}</span>
          <button
            onClick={onLogout}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Sign out
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold mb-3">Welcome back</h2>
        <p className="text-gray-400 text-lg mb-12">What workflow do you want to automate today?</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="text-2xl mb-3">⚡</div>
            <h3 className="font-semibold text-lg mb-1">Analyze a Workflow</h3>
            <p className="text-gray-400 text-sm mb-4">Describe your current process and get an AI-powered automation plan.</p>
            <button
              onClick={onAnalyze}
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Get Started
            </button>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="text-2xl mb-3">🤖</div>
            <h3 className="font-semibold text-lg mb-1">Browse AI Agents</h3>
            <p className="text-gray-400 text-sm mb-4">Explore tools that can automate your most repetitive tasks.</p>
            <button className="bg-gray-800 hover:bg-gray-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
              Coming Soon
            </button>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="font-semibold mb-4">Your Stats</h3>
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-indigo-400">0</div>
              <div className="text-gray-400 text-sm mt-1">Workflows Analyzed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-indigo-400">0h</div>
              <div className="text-gray-400 text-sm mt-1">Time Saved</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-indigo-400">0</div>
              <div className="text-gray-400 text-sm mt-1">Agents Discovered</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}