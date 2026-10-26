import { Calendar, BookOpen, Clock, Award } from 'lucide-react'

const NAV_TABS = [
  { id: 'roadmap', label: 'Lộ trình 56 ngày', icon: Calendar },
  { id: 'notebook', label: 'Sổ tử thi', icon: BookOpen, hasBadge: true },
  { id: 'timer', label: 'Đồng hồ thực chiến', icon: Clock },
  { id: 'milestones', label: 'Mốc 2 tuần', icon: Award },
]

export default function Header({ activeTab, onSelectTab, autopsyCount }) {
  return (
    <header className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md px-6 py-4 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-lg">
          56
        </div>
        <div>
          <h1 className="text-base font-semibold text-zinc-100 flex items-center gap-2">
            TOEIC 56 Ngày Tác Chiến
            <span className="text-xs font-normal text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
              Mục tiêu 485 – 540+
            </span>
          </h1>
          <p className="text-xs text-zinc-400">
            Checklist kỷ luật • Study4 ETS 2024 • 360 Từ cốt lõi
          </p>
        </div>
      </div>

      <nav className="flex items-center gap-1 bg-zinc-900/80 p-1 rounded-xl text-sm font-medium">
        {NAV_TABS.map((tab) => {
          const IconComp = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2 ${
                isActive
                  ? 'bg-zinc-800 text-zinc-100'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <IconComp className="w-4 h-4" />
              {tab.label}
              {tab.hasBadge && autopsyCount > 0 && (
                <span className="text-xs bg-rose-500/20 text-rose-300 px-1.5 py-0.2 rounded-full tabular-nums">
                  {autopsyCount}
                </span>
              )}
            </button>
          )
        })}
      </nav>
    </header>
  )
}
