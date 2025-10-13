// src/components/test/TopTestBar.jsx
import { Link } from "react-router-dom";

export default function TopTestBar({ step, total = 10 }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <Link to="/tests" className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-2">
        <span className="text-lg">←</span> Changer de test
      </Link>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Question {step} sur {total}</span>
        <span className="rounded-full bg-blue-600 text-white text-xs px-2 py-1">Test de Validation</span>
      </div>
    </div>
  );
}
