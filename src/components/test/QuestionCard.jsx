// src/components/test/QuestionCard.jsx
import Card from "../ui/Card.jsx";

const BrainIcon = () => (
  <div className="h-9 w-9 rounded-xl bg-orange-500/10 text-orange-600 grid place-items-center">🧠</div>
);

export default function QuestionCard({ group, title, options, selectedIndex, onSelect, note }) {
  return (
    <Card className="rounded-2xl border border-orange-100 p-6">
      <div className="flex items-center gap-3 mb-3">
        <BrainIcon />
        <div className="text-xs font-medium text-orange-600">{group}</div>
      </div>

      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      <div className="space-y-1">
        {options.map((opt, idx) => (
          <div key={idx}>
            <hr className="border-transparent" />
            <div>
              {/* OptionItem-like inline pour conserver les marges fines */}
              <button
                type="button"
                onClick={() => onSelect(idx)}
                className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition
                  ${selectedIndex === idx ? "bg-orange-50 text-orange-700" : "hover:bg-gray-50"}`}
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full border-2
                    ${selectedIndex === idx ? "border-orange-500 bg-orange-500" : "border-gray-300 bg-white group-hover:border-gray-400"}`}
                />
                <span className="text-sm">{opt}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 border-t pt-3 text-xs text-gray-500 flex items-center gap-3">
        <span className="text-gray-400">ⓘ</span>
        {note}
      </div>
    </Card>
  );
}
