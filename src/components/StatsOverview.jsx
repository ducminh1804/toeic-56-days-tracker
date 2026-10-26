import { Flame } from 'lucide-react'

export default function StatsOverview({
  overallPercent,
  completedTasksCount,
  totalTasks,
  completedDaysCount,
  unresolvedAutopsyCount,
  resolvedAutopsyCount,
}) {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-zinc-900/60 p-5 rounded-2xl flex flex-col justify-between">
        <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
          Tổng tiến độ
        </span>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-3xl font-bold tracking-tight text-zinc-100 tabular-nums">
            {overallPercent}%
          </span>
          <span className="text-xs text-zinc-500 tabular-nums">
            ({completedTasksCount}/{totalTasks} task)
          </span>
        </div>
        <div className="w-full bg-zinc-800/80 h-1.5 rounded-full overflow-hidden mt-3">
          <div
            className="bg-emerald-400 h-full rounded-full transition-all duration-300"
            style={{ width: `${overallPercent}%` }}
          />
        </div>
      </div>

      <div className="bg-zinc-900/60 p-5 rounded-2xl flex flex-col justify-between">
        <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
          Ngày hoàn tất
        </span>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-3xl font-bold tracking-tight text-zinc-100 tabular-nums">
            {completedDaysCount}
          </span>
          <span className="text-xs text-zinc-500">/ 56 ngày</span>
        </div>
        <span className="text-xs text-zinc-400 mt-3 flex items-center gap-1.5">
          <Flame className="w-3.5 h-3.5 text-amber-400" />
          Kỷ luật 3 nhiệm vụ/ngày
        </span>
      </div>

      <div className="bg-zinc-900/60 p-5 rounded-2xl flex flex-col justify-between">
        <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
          Mục tiêu chốt sổ
        </span>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-3xl font-bold tracking-tight text-emerald-400 tabular-nums">
            96–108
          </span>
          <span className="text-xs text-zinc-500">/ 200 câu</span>
        </div>
        <span className="text-xs text-zinc-400 mt-3">
          Tương đương ~485 – 540 điểm TOEIC
        </span>
      </div>

      <div className="bg-zinc-900/60 p-5 rounded-2xl flex flex-col justify-between">
        <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
          Sổ tử thi
        </span>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-3xl font-bold tracking-tight text-rose-400 tabular-nums">
            {unresolvedAutopsyCount}
          </span>
          <span className="text-xs text-zinc-500">câu cần nhớ lại</span>
        </div>
        <span className="text-xs text-zinc-400 mt-3">
          {resolvedAutopsyCount} lỗi đã khắc phục
        </span>
      </div>
    </section>
  )
}
