import { Search, CheckCircle2, Check, BookOpen, FileText, Headphones, Sparkles } from 'lucide-react'

const TASK_META = {
  vocab: { label: 'Từ vựng', color: 'text-amber-400 bg-amber-400/10', icon: BookOpen },
  reading: { label: 'Đọc/Ngữ pháp', color: 'text-sky-400 bg-sky-400/10', icon: FileText },
  listening: { label: 'Nghe', color: 'text-violet-400 bg-violet-400/10', icon: Headphones },
}

export default function RoadmapView({
  days,
  selectedWeek,
  onSelectWeek,
  searchQuery,
  onSearchChange,
  currentPhase,
  checkedTasks,
  onToggleTask,
}) {
  return (
    <div className="flex flex-col gap-6">
      {/* Week Selector Bar & Search */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          <button
            type="button"
            onClick={() => onSelectWeek(0)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedWeek === 0
                ? 'bg-zinc-100 text-zinc-950 font-semibold'
                : 'bg-zinc-900/80 text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Tất cả (56 ngày)
          </button>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((w) => (
            <button
              key={w}
              type="button"
              onClick={() => onSelectWeek(w)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedWeek === w
                  ? 'bg-zinc-100 text-zinc-950 font-semibold'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Tuần {w}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm từ khóa, part, mẹo..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
          />
        </div>
      </div>

      {/* Context Phase Banner */}
      {selectedWeek !== 0 && currentPhase && (
        <div className="bg-zinc-900/40 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                {currentPhase.name}: {currentPhase.subtitle}
              </span>
              <span className="text-xs text-zinc-500">• {currentPhase.weeks}</span>
            </div>
            <p className="text-sm font-medium text-zinc-200">
              Trọng tâm: {currentPhase.focus}
            </p>
            <p className="text-xs text-zinc-400">
              Mục tiêu: {currentPhase.targetScoreNote} (Kho từ: ~{currentPhase.targetWords} từ)
            </p>
          </div>
          <div className="text-xs text-zinc-400 self-start md:self-auto bg-zinc-800/40 px-3 py-2 rounded-xl">
            Tài liệu: Study4 ETS 2024 • 600 Essential Words
          </div>
        </div>
      )}

      {/* Days List */}
      <div className="flex flex-col gap-4">
        {days.map((day) => {
          const isDayCompleted = day.tasks.every((t) => checkedTasks[t.id])
          const completedInDay = day.tasks.filter((t) => checkedTasks[t.id]).length

          return (
            <article
              key={day.day}
              className={`p-6 rounded-2xl transition-colors ${
                isDayCompleted
                  ? 'bg-zinc-900/30 opacity-90'
                  : 'bg-zinc-900/60 hover:bg-zinc-900/80'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-lg tabular-nums ${
                      isDayCompleted
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-zinc-800 text-zinc-200'
                    }`}
                  >
                    Ngày {day.day}
                  </span>
                  <span className="text-xs font-medium text-zinc-400">
                    {day.dayOfWeek} (Tuần {day.week})
                  </span>
                  <h2 className="text-sm font-semibold text-zinc-100">
                    {day.title}
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-zinc-400 tabular-nums">
                    {completedInDay}/3 nhiệm vụ
                  </span>
                  {isDayCompleted ? (
                    <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Đã hoàn thành
                    </span>
                  ) : (
                    <span className="text-xs text-zinc-500">Chưa xong</span>
                  )}
                </div>
              </div>

              {/* Tasks Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                {day.tasks.map((task) => {
                  const isDone = !!checkedTasks[task.id]
                  const meta = TASK_META[task.type] || TASK_META.vocab
                  const IconComp = meta.icon

                  return (
                    <div
                      key={task.id}
                      onClick={() => onToggleTask(task.id, day.day)}
                      className={`p-4 rounded-xl cursor-pointer transition-all flex flex-col justify-between gap-3 ${
                        isDone
                          ? 'bg-zinc-950/60 text-zinc-500 line-through'
                          : 'bg-zinc-950/40 hover:bg-zinc-950/70 text-zinc-300'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1.5 ${meta.color}`}>
                          <IconComp className="w-3 h-3" />
                          {meta.label}
                        </span>

                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                            isDone
                              ? 'bg-emerald-500 text-zinc-950'
                              : 'border border-zinc-700 bg-transparent'
                          }`}
                        >
                          {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>

                      <p className="text-xs leading-relaxed font-normal">
                        {task.desc}
                      </p>
                    </div>
                  )
                })}
              </div>

              {day.tips && (
                <div className="mt-4 pt-3 flex items-start gap-2 text-xs text-zinc-400">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-zinc-300 font-medium">Mẹo thực chiến: </strong>
                    {day.tips}
                  </span>
                </div>
              )}
            </article>
          )
        })}
      </div>
    </div>
  )
}
