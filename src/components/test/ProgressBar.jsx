// src/components/test/ProgressBar.jsx
export default function ProgressBar({ step, total = 10 }) {
  const percent = Math.min(100, Math.max(0, (step - 1) / total * 100 + (1 / total) * 100 * 0.1));
  return (
    <div className="w-full h-2 rounded-full bg-orange-100">
      <div
        className="h-2 rounded-full bg-orange-500 transition-all"
        style={{ width: `${(step / total) * 100}%` }}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={(step / total) * 100}
      />
    </div>
  );
}
