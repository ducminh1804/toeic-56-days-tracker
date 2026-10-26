import { useState, useMemo, useEffect } from 'react'
import confetti from 'canvas-confetti'
import Header from './components/Header'
import StatsOverview from './components/StatsOverview'
import RoadmapView from './components/RoadmapView'
import AutopsyNotebook from './components/AutopsyNotebook'
import CombatTimer from './components/CombatTimer'
import MilestonesView from './components/MilestonesView'
import { PHASES, TIMER_PRESETS, DAYS_DATA } from './data/planData'

const getStored = (key, fallback) => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : fallback
  } catch {
    return fallback
  }
}

const setStored = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (err) {
    console.error('Storage error:', err)
  }
}

export default function App() {
  const [activeTab, setActiveTab] = useState('roadmap')
  const [selectedWeek, setSelectedWeek] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  // Task checklist state
  const [checkedTasks, setCheckedTasks] = useState(() =>
    getStored('toeic_checked_tasks', {})
  )

  // Sổ Tử Thi state
  const [autopsyList, setAutopsyList] = useState(() =>
    getStored('toeic_autopsy_log', [
      {
        id: 'sample-1',
        date: '2026-10-26',
        testPart: 'Part 2',
        question: 'Where did you leave the contract? -> Answer A: Yes, yesterday.',
        trapType: 'Bẫy Yes/No đối với câu hỏi Wh-',
        ruleFix: 'Câu hỏi Where tuyệt đối không chọn Yes/No. Gạch đáp án có Yes/No ngay lập tức!',
        resolved: false,
      },
      {
        id: 'sample-2',
        date: '2026-10-26',
        testPart: 'Part 1',
        question: 'Tranh phòng họp chỉ có bàn ghế, băng đọc: "Chairs are being arranged".',
        trapType: 'Bẫy chữ "being" tả vật',
        ruleFix: 'Tranh không có người mà nghe "being + V3" là gạch ngay 95%.',
        resolved: true,
      },
    ])
  )

  // Milestones state
  const [milestoneScores, setMilestoneScores] = useState(() =>
    getStored('toeic_milestone_scores', {
      m1: { score: '', status: 'pending' },
      m2: { score: '', status: 'pending' },
      m3: { score: '', status: 'pending' },
      m4: { score: '', status: 'pending' },
    })
  )

  // Timer state
  const [timerSeconds, setTimerSeconds] = useState(12 * 60)
  const [timerInitial, setTimerInitial] = useState(12 * 60)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [selectedTimerPreset, setSelectedTimerPreset] = useState(TIMER_PRESETS[0].label)

  // Derived state (Zero boilerplate, no redundant useEffect)
  const totalTasks = 56 * 3
  const completedTasksCount = useMemo(
    () => Object.values(checkedTasks).filter(Boolean).length,
    [checkedTasks]
  )
  const overallPercent = Math.round((completedTasksCount / totalTasks) * 100)
  const completedDaysCount = useMemo(
    () => DAYS_DATA.filter((d) => d.tasks.every((t) => checkedTasks[t.id])).length,
    [checkedTasks]
  )
  const currentPhase = useMemo(() => {
    if (selectedWeek <= 2) return PHASES[0]
    if (selectedWeek <= 4) return PHASES[1]
    if (selectedWeek <= 6) return PHASES[2]
    return PHASES[3]
  }, [selectedWeek])

  const filteredDays = useMemo(() => {
    return DAYS_DATA.filter((day) => {
      if (selectedWeek !== 0 && day.week !== selectedWeek) return false
      if (!searchQuery.trim()) return true
      const q = searchQuery.toLowerCase()
      return (
        day.title.toLowerCase().includes(q) ||
        day.tasks.some((t) => t.desc.toLowerCase().includes(q) || t.name.toLowerCase().includes(q)) ||
        day.tips?.toLowerCase().includes(q)
      )
    })
  }, [selectedWeek, searchQuery])

  // Timer countdown
  useEffect(() => {
    let interval = null
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => setTimerSeconds((prev) => prev - 1), 1000)
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false)
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } })
    }
    return () => clearInterval(interval)
  }, [isTimerRunning, timerSeconds])

  // Handlers
  const handleToggleTask = (taskId, dayNumber) => {
    const updated = { ...checkedTasks, [taskId]: !checkedTasks[taskId] }
    setCheckedTasks(updated)
    setStored('toeic_checked_tasks', updated)

    const day = DAYS_DATA.find((d) => d.day === dayNumber)
    if (day && day.tasks.every((t) => updated[t.id]) && !checkedTasks[taskId]) {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } })
    }
  }

  const handleAddAutopsy = (item) => {
    const record = { id: Date.now().toString(), date: new Date().toISOString().split('T')[0], ...item, resolved: false }
    const updated = [record, ...autopsyList]
    setAutopsyList(updated)
    setStored('toeic_autopsy_log', updated)
  }

  const handleToggleAutopsyStatus = (id) => {
    const updated = autopsyList.map((i) => (i.id === id ? { ...i, resolved: !i.resolved } : i))
    setAutopsyList(updated)
    setStored('toeic_autopsy_log', updated)
  }

  const handleDeleteAutopsy = (id) => {
    const updated = autopsyList.filter((i) => i.id !== id)
    setAutopsyList(updated)
    setStored('toeic_autopsy_log', updated)
  }

  const handleUpdateMilestone = (mId, score, status) => {
    const updated = { ...milestoneScores, [mId]: { score, status } }
    setMilestoneScores(updated)
    setStored('toeic_milestone_scores', updated)
    if (status === 'passed') confetti({ particleCount: 50, spread: 60 })
  }

  const handleSelectPreset = (p) => {
    setSelectedTimerPreset(p.label)
    setIsTimerRunning(false)
    setTimerSeconds(p.minutes * 60)
    setTimerInitial(p.minutes * 60)
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 antialiased">
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        autopsyCount={autopsyList.length}
      />

      <main className="max-w-6xl mx-auto px-6 py-8 flex flex-col gap-8">
        <StatsOverview
          overallPercent={overallPercent}
          completedTasksCount={completedTasksCount}
          totalTasks={totalTasks}
          completedDaysCount={completedDaysCount}
          unresolvedAutopsyCount={autopsyList.filter((i) => !i.resolved).length}
          resolvedAutopsyCount={autopsyList.filter((i) => i.resolved).length}
        />

        {activeTab === 'roadmap' && (
          <RoadmapView
            days={filteredDays}
            selectedWeek={selectedWeek}
            onSelectWeek={setSelectedWeek}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            currentPhase={currentPhase}
            checkedTasks={checkedTasks}
            onToggleTask={handleToggleTask}
          />
        )}

        {activeTab === 'notebook' && (
          <AutopsyNotebook
            autopsyList={autopsyList}
            onAddAutopsy={handleAddAutopsy}
            onToggleStatus={handleToggleAutopsyStatus}
            onDeleteAutopsy={handleDeleteAutopsy}
          />
        )}

        {activeTab === 'timer' && (
          <CombatTimer
            timerSeconds={timerSeconds}
            timerInitial={timerInitial}
            isTimerRunning={isTimerRunning}
            selectedTimerPreset={selectedTimerPreset}
            onSelectPreset={handleSelectPreset}
            onTogglePlay={() => setIsTimerRunning(!isTimerRunning)}
            onResetTimer={() => {
              setIsTimerRunning(false)
              setTimerSeconds(timerInitial)
            }}
          />
        )}

        {activeTab === 'milestones' && (
          <MilestonesView
            milestoneScores={milestoneScores}
            onUpdateMilestone={handleUpdateMilestone}
          />
        )}
      </main>
    </div>
  )
}
