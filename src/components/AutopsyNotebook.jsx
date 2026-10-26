import { useState } from 'react'
import { BookOpen, Plus, Trash2, Check, Printer } from 'lucide-react'

export default function AutopsyNotebook({
  autopsyList,
  onAddAutopsy,
  onToggleStatus,
  onDeleteAutopsy,
}) {
  const [form, setForm] = useState({
    testPart: 'Part 5',
    question: '',
    trapType: '',
    ruleFix: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.question.trim()) return
    onAddAutopsy(form)
    setForm({ testPart: 'Part 5', question: '', trapType: '', ruleFix: '' })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-zinc-100 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-rose-400" />
            Sổ Tử Thi (Error Autopsy Log)
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Nguyên tắc vàng: Đọc lại Sổ tử thi giúp ngăn chặn 80% nguy cơ lặp lại lỗi cũ trong phòng thi.
          </p>
        </div>

        <button
          type="button"
          onClick={() => window.print()}
          className="px-3 py-1.5 rounded-lg bg-zinc-900 text-xs font-medium text-zinc-300 hover:text-zinc-100 flex items-center gap-1.5 transition-colors self-start md:self-auto"
        >
          <Printer className="w-3.5 h-3.5" />
          In / Kẹp vào bìa
        </button>
      </div>

      {/* Form Thêm Câu Sai */}
      <form onSubmit={handleSubmit} className="bg-zinc-900/60 p-6 rounded-2xl flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-zinc-200">Ghi nhận câu sai / bẫy đề mới</h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-400">Phần thi</label>
            <select
              value={form.testPart}
              onChange={(e) => setForm({ ...form, testPart: e.target.value })}
              className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-zinc-500"
            >
              <option value="Part 1">Part 1 (Nghe tranh)</option>
              <option value="Part 2">Part 2 (Hỏi - Đáp)</option>
              <option value="Part 3">Part 3 (Hội thoại)</option>
              <option value="Part 4">Part 4 (Độc thoại)</option>
              <option value="Part 5">Part 5 (Ngữ pháp/Từ loại)</option>
              <option value="Part 6">Part 6 (Điền đoạn văn)</option>
              <option value="Part 7">Part 7 (Đoạn đơn/kép)</option>
              <option value="Full Test">Full Test 200 câu</option>
            </select>
          </div>

          <div className="md:col-span-3 flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-400">Bẫy gặp phải / Loại câu</label>
            <input
              type="text"
              placeholder="Ví dụ: Bẫy đồng âm, Bẫy 'being' tả vật, Cụm giới từ..."
              value={form.trapType}
              onChange={(e) => setForm({ ...form, trapType: e.target.value })}
              className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-zinc-400">Nội dung câu sai / Đáp án bẫy</label>
          <textarea
            rows={2}
            placeholder="Dán câu hỏi hoặc đáp án sai vào đây..."
            value={form.question}
            onChange={(e) => setForm({ ...form, question: e.target.value })}
            className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 resize-none"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-zinc-400">
            Nguyên nhân & Quy tắc khắc phục (Cách khoanh đúng lần sau)
          </label>
          <input
            type="text"
            placeholder="Ví dụ: Hỏi Wh- mà đáp án có Yes/No là gạch ngay; sau look forward to luôn là V-ing..."
            value={form.ruleFix}
            onChange={(e) => setForm({ ...form, ruleFix: e.target.value })}
            className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500"
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-zinc-100 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Lưu vào Sổ Tử Thi
          </button>
        </div>
      </form>

      {/* Danh Sách Mổ Tử Thi */}
      <div className="bg-zinc-900/60 rounded-2xl overflow-hidden">
        <div className="p-4 flex items-center justify-between text-xs text-zinc-400">
          <span>{autopsyList.length} câu đã mổ tử thi</span>
          <span>Click để đánh dấu "Đã nhớ / Khắc phục"</span>
        </div>

        <div className="divide-y divide-zinc-800/80">
          {autopsyList.map((item) => (
            <div
              key={item.id}
              className={`p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${
                item.resolved ? 'bg-zinc-950/40 opacity-75' : 'hover:bg-zinc-800/30'
              }`}
            >
              <div className="flex items-start gap-3 flex-1">
                <button
                  type="button"
                  onClick={() => onToggleStatus(item.id)}
                  className={`w-5 h-5 rounded-md mt-0.5 flex items-center justify-center transition-colors ${
                    item.resolved
                      ? 'bg-emerald-500 text-zinc-950'
                      : 'border border-zinc-700 hover:border-zinc-500'
                  }`}
                >
                  {item.resolved && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </button>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                      {item.testPart}
                    </span>
                    {item.trapType && (
                      <span className="text-[11px] text-rose-300 bg-rose-500/10 px-2 py-0.5 rounded">
                        {item.trapType}
                      </span>
                    )}
                    <span className="text-[11px] text-zinc-500 tabular-nums">
                      {item.date}
                    </span>
                  </div>

                  <p className={`text-xs text-zinc-200 mt-1 ${item.resolved ? 'line-through text-zinc-500' : ''}`}>
                    {item.question}
                  </p>

                  {item.ruleFix && (
                    <p className="text-xs text-emerald-400/90 font-medium mt-1">
                      Khắc phục: {item.ruleFix}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onDeleteAutopsy(item.id)}
                className="text-zinc-600 hover:text-rose-400 self-end md:self-center transition-colors p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
