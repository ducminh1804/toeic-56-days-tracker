import { Clock, Play, Pause, RotateCcw } from 'lucide-react'
import { TIMER_PRESETS } from '../data/planData'

export default function CombatTimer({
  timerSeconds,
  timerInitial,
  isTimerRunning,
  selectedTimerPreset,
  onSelectPreset,
  onTogglePlay,
  onResetTimer,
}) {
  const formatTimer = (totalSec) => {
    const m = Math.floor(totalSec / 60)
    const s = totalSec % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const progressPercent = Math.min(
    100,
    Math.max(0, ((timerInitial - timerSeconds) / timerInitial) * 100)
  )

  return (
    <div className="flex flex-col items-center gap-8 py-4">
      <div className="text-center max-w-md">
        <h2 className="text-lg font-semibold text-zinc-100 flex items-center justify-center gap-2">
          <Clock className="w-5 h-5 text-amber-400" />
          Đồng Hồ Thực Chiến
        </h2>
        <p className="text-xs text-zinc-400 mt-1">
          Kỷ luật cắt lỗ: Rèn phản xạ dừng đúng phút quy định để không bao giờ bị cháy giờ ở Part 7.
        </p>
      </div>

      {/* Presets Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 w-full max-w-2xl">
        {TIMER_PRESETS.map((p) => {
          const isSelected = selectedTimerPreset === p.label
          return (
            <button
              key={p.label}
              type="button"
              onClick={() => onSelectPreset(p)}
              className={`p-3 rounded-xl text-left transition-all ${
                isSelected
                  ? 'bg-zinc-800 text-zinc-100 ring-1 ring-zinc-600'
                  : 'bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
              }`}
            >
              <div className="text-xs font-semibold">{p.label}</div>
              <div className="text-[11px] text-zinc-500 mt-1">{p.desc}</div>
              <div className="text-xs font-bold text-amber-400 mt-2 tabular-nums">
                {p.minutes} phút
              </div>
            </button>
          )
        })}
      </div>

      {/* Big Display */}
      <div className="bg-zinc-900/60 px-16 py-12 rounded-3xl flex flex-col items-center gap-6">
        <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
          {selectedTimerPreset}
        </span>
        <div className="text-7xl md:text-8xl font-mono font-bold tracking-tight text-zinc-100 tabular-nums">
          {formatTimer(timerSeconds)}
        </div>

        <div className="w-64 bg-zinc-800/80 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-amber-400 h-full transition-all duration-1000"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onTogglePlay}
            className={`px-8 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all ${
              isTimerRunning
                ? 'bg-amber-500 text-zinc-950 hover:bg-amber-400'
                : 'bg-emerald-500 text-zinc-950 hover:bg-emerald-400'
            }`}
          >
            {isTimerRunning ? (
              <>
                <Pause className="w-4 h-4" />
                Tạm dừng
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                Bắt đầu tính giờ
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onResetTimer}
            className="p-3 rounded-xl bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
            title="Đặt lại"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
