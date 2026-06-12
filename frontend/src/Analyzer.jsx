import { useState } from 'react'
import axios from 'axios'

export default function Analyzer({ user, onBack }) {
  const [industry, setIndustry] = useState('')
  const [workflow, setWorkflow] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError] = useState('')

  const handleAnalyze = async () => {
    if (!industry || !workflow) {
      setError('Please fill in both fields')
      return
    }
    setError('')
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const res = await axios.post('http://localhost:4000/api/analyze', {
        industry,
        workflow,
        userId: user.id
      }, {
        headers: { Authorization: 'Bearer ' + token }
      })
      setResults(res.data.analysis)
    } catch (err) {
      setError(err.response?.data?.message || 'Analysis failed')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="border-b border-gray-800 px-6 py-4 flex items-center gap-4">
        <button onClick={onBack} className="text-gray-400 hover:text-white transition-colors">
          ← Back
        </button>
        <h1 className="text-xl font-bold text-indigo-400">Souci</h1>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-2">Analyze Your Workflow</h2>
        <p className="text-gray-400 mb-8">Describe what you do and we'll show you what can be automated.</p>

        {!results ? (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Your Industry</label>
              <input
                type="text"
                placeholder="e.g. Real estate, Marketing, Healthcare"
                value={industry}
                onChange={e => setIndustry(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Describe Your Workflow</label>
              <textarea
                placeholder="e.g. Every Monday I pull data from spreadsheets, email 5 people updates, schedule follow-up calls, and update our CRM manually..."
                value={workflow}
                onChange={e => setWorkflow(e.target.value)}
                rows={6}
                className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500 resize-none"
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Analyzing your workflow...' : 'Analyze Now'}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h3 className="font-semibold text-lg mb-3 text-green-400">✅ Tasks You Can Automate</h3>
              <ul className="space-y-2">
                {results.automatable_tasks?.map((task, i) => (
                  <li key={i} className="text-gray-300 flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>{task}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h3 className="font-semibold text-lg mb-3 text-yellow-400">🤝 Tasks That Need You</h3>
              <ul className="space-y-2">
                {results.manual_tasks?.map((task, i) => (
                  <li key={i} className="text-gray-300 flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">•</span>{task}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h3 className="font-semibold text-lg mb-1">⏱ Estimated Time Saved</h3>
              <p className="text-3xl font-bold text-indigo-400">{results.time_saved}</p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h3 className="font-semibold text-lg mb-3">🤖 Recommended AI Agents</h3>
              <div className="space-y-3">
                {results.suggested_agents?.map((agent, i) => (
                  <div key={i} className="border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{agent.name}</span>
                      <span className="text-indigo-400 text-sm">{agent.price}</span>
                    </div>
                    <p className="text-gray-400 text-sm">{agent.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => { setResults(null); setWorkflow(''); setIndustry('') }}
              className="w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Analyze Another Workflow
            </button>
          </div>
        )}
      </div>
    </div>
  )
}