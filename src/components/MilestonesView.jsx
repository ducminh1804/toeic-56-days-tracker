import { Award } from 'lucide-react'
import { MILESTONES } from '../data/planData'

export default function MilestonesView({
  milestoneScores,
  onUpdateMilestone,
}) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-semibold text-zinc-100 flex items-center gap-2">
          <Award className="w-5 h-5 text-emerald-400" />
          Bảng Kiểm Soát Tiến Độ Qua Từng Mốc 2 Tuần
        </h2>
        <p className="text-xs text-zinc-400 mt-1">
          Cứ mỗi 2 tuần hoàn thành, hãy nhìn vào con số này để đối chiếu xem bạn có đang đi đúng lộ trình 500+ hay không.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MILESTONES.map((m) => {
          const currentRecord = milestoneScores[m.id] || { score: '', status: 'pending' }
          const isPassed = currentRecord.status === 'passed'

          return (
            <div
              key={m.id}
              className="bg-zinc-900/60 p-6 rounded-2xl flex flex-col justify-between gap-4"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg">
                    {m.title}
                  </span>
                  <span className="text-xs text-zinc-500">
                    Giai đoạn {m.phase}
                  </span>
                </div>

                <div className="text-sm font-semibold text-zinc-200 mt-1">
                  Chỉ tiêu cần đạt: {m.targetScoreRange}
                </div>

                <ul className="text-xs text-zinc-400 flex flex-col gap-1.5 mt-2">
                  {m.criteria.map((crit, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{crit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Input Điểm Thực Tế */}
              <div className="pt-3 flex items-center justify-between gap-3 bg-zinc-950/40 p-3 rounded-xl">
                <span className="text-xs text-zinc-400">
                  Số câu đúng thực tế:
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="e.g. 62/116"
                    value={currentRecord.score}
                    onChange={(e) =>
                      onUpdateMilestone(m.id, e.target.value, currentRecord.status)
                    }
                    className="w-24 bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1 text-xs text-zinc-100 text-center font-mono tabular-nums focus:outline-none focus:border-zinc-500"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newStatus = isPassed ? 'pending' : 'passed'
                      onUpdateMilestone(m.id, currentRecord.score, newStatus)
                    }}
                    className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-colors ${
                      isPassed
                        ? 'bg-emerald-500 text-zinc-950'
                        : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {isPassed ? 'Đã đạt' : 'Chưa đạt'}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
