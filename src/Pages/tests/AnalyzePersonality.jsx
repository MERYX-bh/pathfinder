// src/Pages/tests/AnalyzePersonality.jsx
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function AnalyzePersonality() {
  const navigate = useNavigate();
  const [pct, setPct] = useState(0);

  // petite animation de progression puis redirection
  useEffect(() => {
    const start = Date.now();
    const duration = 2200; // ms
    const tick = setInterval(() => {
      const p = Math.min(100, Math.round(((Date.now() - start) / duration) * 100));
      setPct(p);
      if (p >= 100) {
        clearInterval(tick);
        navigate("/tests/complet/resultats");
      }
    }, 30);
    return () => clearInterval(tick);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white">
      <header className="h-14 border-b border-gray-100 flex items-center justify-between px-4">
        <Link to="/tests/complet" className="text-sm text-gray-600 hover:text-gray-800">
          ← Retour au test
        </Link>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="mx-auto h-16 w-16 rounded-full bg-green-50 grid place-items-center text-green-600 text-3xl">
          ✓
        </div>

        <h1 className="mt-6 text-2xl font-semibold">Test terminé&nbsp;!</h1>
        <p className="mt-2 text-gray-600">
          Nous analysons votre personnalité 
        </p>

        <div className="mt-8 inline-flex items-center gap-2 text-orange-700 bg-orange-50 rounded-full px-4 py-1.5 text-sm">
          <span role="img" aria-label="brain">🧠</span>
          Calcul de votre profil personnalité
        </div>

        <div className="mx-auto mt-6 h-2 w-full max-w-2xl rounded-full bg-orange-100 overflow-hidden">
          <div
            className="h-2 bg-orange-500 transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
      </main>
    </div>
  );
}
