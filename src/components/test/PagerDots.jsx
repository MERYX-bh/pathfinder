// src/components/test/PagerDots.jsx
export default function PagerDots({ step, total = 10 }) {
  return (
    <div className="mt-6 flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={`h-2.5 w-2.5 rounded-full ${i < step ? "bg-orange-500" : "bg-orange-200"}`}
          />
        ))}
      </div>
      <p className="text-sm text-gray-500">Analyse de compatibilité en cours...</p>
    </div>
  );
}
