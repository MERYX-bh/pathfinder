// src/Pages/tests/Completion.jsx
import { Link, useNavigate } from "react-router-dom";

export default function Completion() {
  const navigate = useNavigate();

  function restart() {
    // on efface les réponses pour repartir à zéro
    try { localStorage.removeItem("fullTest.answers"); } catch {}
    navigate("/tests/complet");
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="h-14 border-b border-gray-100 flex items-center justify-between px-4">
        <Link to="/tests/complet" className="text-sm text-gray-600 hover:text-gray-800">
          ← Retour au test
        </Link>
        <Link to="/" className="rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50">Accueil</Link>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="mx-auto h-16 w-16 rounded-full bg-green-50 grid place-items-center text-green-600 text-3xl">
          ✓
        </div>
        <h1 className="mt-6 text-2xl font-semibold text-center">Test d’orientation terminé&nbsp;!</h1>
        <p className="mt-2 text-gray-600 text-center">
          Félicitations ! Vous avez complété toutes les questions. Vos résultats sont maintenant disponibles.
        </p>

        <div className="mt-4 flex items-center justify-center gap-2">
          <span className="rounded-full bg-orange-100 text-orange-700 px-3 py-1 text-xs font-medium">
            100% complété
          </span>
          <span className="rounded-full bg-gray-100 text-gray-700 px-3 py-1 text-xs">
            8 compétences analysées
          </span>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* Confirmer mes résultats */}
          <div className="rounded-2xl border border-gray-200 p-6">
            <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-green-50 text-green-600 mb-2">
              ✓
            </div>
            <h2 className="font-semibold">Confirmer mes résultats</h2>
            <p className="mt-2 text-sm text-gray-600">
              Valider vos résultats et découvrir votre profil de compétences complet.
            </p>
            <Link
              to="/tests/complet/resultats"
              className="mt-4 inline-flex items-center justify-center rounded-xl bg-orange-500 px-4 py-2.5 text-white hover:bg-orange-600"
            >
              Voir les résultats →
            </Link>
          </div>

          {/* Refaire le test */}
          <div className="rounded-2xl border border-gray-200 p-6">
            <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600 mb-2">
              ⟳
            </div>
            <h2 className="font-semibold">Refaire le test</h2>
            <p className="mt-2 text-sm text-gray-600">
              Recommencer le test pour affiner ou modifier vos réponses.
            </p>
            <button
              onClick={restart}
              className="mt-4 inline-flex items-center justify-center rounded-xl border px-4 py-2.5 text-gray-800 hover:bg-white"
            >
              Recommencer
            </button>
          </div>
        </div>

        {/* Assistant IA */}
        <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center">
          <h3 className="font-semibold">Besoin de réflexion&nbsp;?</h3>
          <p className="mt-2 text-sm text-gray-600">
            Si vous hésitez sur certaines réponses, notre assistant IA peut vous aider à clarifier vos
            préférences et motivations.
          </p>
          <Link
            to="/assistant"
            className="mt-3 inline-flex items-center justify-center text-orange-600 hover:text-orange-700"
          >
            Parler à l’assistant IA
          </Link>
        </div>
      </main>
    </div>
  );
}
