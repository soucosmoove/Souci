import { useState } from 'react'
import Login from './Login'
import Dashboard from './Dashboard'
import Analyzer from './Analyzer'

function App() {
  const [user, setUser] = useState(null)
  const [page, setPage] = useState('dashboard')

  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser(null)
    setPage('dashboard')
  }

  if (!user) {
    return <Login onLogin={setUser} />
  }

  if (page === 'analyze') {
    return <Analyzer user={user} onBack={() => setPage('dashboard')} />
  }

  return (
    <Dashboard
      user={user}
      onLogout={handleLogout}
      onAnalyze={() => setPage('analyze')}
    />
  )
}

export default App