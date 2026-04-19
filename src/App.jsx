import { useState } from 'react'

const PASS_THRESHOLD = 40

function App() {
  const [students, setStudents] = useState([
    { id: 1, name: 'Nishtha', score: 78 },
    { id: 2, name: 'Manya', score: 45 },
    { id: 3, name: 'Saksham', score: 30 },
    { id: 4, name: 'Priyam', score: 68 },
  ])
  const [nameInput, setNameInput] = useState('')
  const [scoreInput, setScoreInput] = useState('')
  const [updates, setUpdates] = useState({})

  const passed = students.filter(s => s.score >= PASS_THRESHOLD).length
  const avg = students.length
    ? Math.round(students.reduce((sum, s) => sum + s.score, 0) / students.length)
    : 0

  function addStudent() {
    const score = Number(scoreInput)
    if (!nameInput.trim() || isNaN(score) || score < 0 || score > 100) return
    setStudents(prev => [...prev, { id: Date.now(), name: nameInput.trim(), score }])
    setNameInput('')
    setScoreInput('')
  }

  function saveScore(id) {
    const val = Number(updates[id])
    if (isNaN(val) || val < 0 || val > 100) return
    setStudents(prev => prev.map(s => (s.id === id ? { ...s, score: val } : s)))
    setUpdates(prev => ({ ...prev, [id]: undefined }))
  }

  return (
    <>
      <div className="version-label">Academic Terminal V2.0</div>
      <h1>STUDENT <span className="accent">SCOREBOARD</span></h1>

      {/* Add Student */}
      <div style={{ border: '1px solid var(--border)', marginBottom: '16px' }}>
        <div className="section-label">
          Register Student
          <span style={{ marginLeft: 'auto', fontSize: '10px', letterSpacing: '2px', color: 'var(--text)' }}>
            New Entry ▶
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px', padding: '12px', background: 'var(--surface)' }}>
          <input
            type="text"
            placeholder="Student Name"
            value={nameInput}
            onChange={e => setNameInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addStudent()}
            style={{ flex: 1 }}
          />
          <input
            type="number"
            placeholder="Score (0-100)"
            value={scoreInput}
            onChange={e => setScoreInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addStudent()}
            style={{ width: '140px' }}
          />
          <button className="btn-primary" onClick={addStudent}>+ ADD</button>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total</div>
          <div className="stat-value">{students.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Passed</div>
          <div className="stat-value">{passed}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Avg Score</div>
          <div className="stat-value">{avg}</div>
        </div>
      </div>

      {/* Table */}
      <div style={{ border: '1px solid var(--border)', marginBottom: '32px' }}>
        <div className="section-label">
          Student Records
          <span style={{ marginLeft: 'auto', fontSize: '10px', color: 'var(--text)' }}>
            {students.length} entries
          </span>
        </div>
        <table className="records-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Score</th>
              <th>Status</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td><span className="score-value">{s.score}</span></td>
                <td>
                  <span className={`badge ${s.score >= PASS_THRESHOLD ? 'badge-pass' : 'badge-fail'}`}>
                    {s.score >= PASS_THRESHOLD ? 'Pass' : 'Fail'}
                  </span>
                </td>
                <td style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input
                    type="number"
                    value={updates[s.id] ?? s.score}
                    onChange={e => setUpdates(prev => ({ ...prev, [s.id]: e.target.value }))}
                    style={{ width: '64px' }}
                  />
                  <button className="btn-save" onClick={() => saveScore(s.id)}>Save</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer>Students Terminal &nbsp;·&nbsp; Score System</footer>
    </>
  )
}

export default App