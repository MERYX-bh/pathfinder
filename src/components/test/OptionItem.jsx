// src/components/test/OptionItem.jsx
export default function OptionItem({ label, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition
        ${selected ? "bg-orange-50 text-orange-700" : "hover:bg-gray-50"}`}
    >
      <span
        className={`h-2.5 w-2.5 rounded-full border-2
          ${selected ? "border-orange-500 bg-orange-500" : "border-gray-300 bg-white group-hover:border-gray-400"}`}
      />
      <span className="text-sm">{label}</span>
    </button>
  );
}
