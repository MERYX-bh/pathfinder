// src/Pages/tests/Results.jsx
import { Link, useNavigate } from "react-router-dom";
import { useMemo } from "react";

/* ---------- Axes (mêmes clés que FullTest) ---------- */
const AXES = {
  E: "EI", I: "EI",
  S: "SN", N: "SN",
  T: "TF", F: "TF",
  J: "JP", P: "JP",
  G: "MO", M: "MO",
  PRACT: "LP", CONC: "LP",
};
const LEFT  = { EI: "E",  SN: "S",  TF: "T",  JP: "J",  MO: "G",   LP: "PRACT" };
const RIGHT = { EI: "I",  SN: "N",  TF: "F",  JP: "P",  MO: "M",   LP: "CONC"  };
const SPAN = 6; // même échelle que dans FullTest

/* Helpers de scoring */
function axisScoresFromLocalStorage() {
  const raw = JSON.parse(localStorage.getItem("fullTest.answers") || "[]");
  const questions = JSON.parse(localStorage.getItem("fullTest.questions") || "null");
  // Par sécurité: si tu n'as pas stocké les questions dans le LS, on reconstruit à partir
  // d’un snapshot minimal embarqué dans la page (clé uniquement) via window.__questions__.
  const qlist = questions || (window.__questions__ || []);
  const s = { EI:0, SN:0, TF:0, JP:0, MO:0, LP:0 };

  raw.forEach((optIdx, i) => {
    const q = qlist[i];
    if (!q) return;
    const opt = q.options?.[optIdx];
    if (!opt) return;
    const key = opt.scoreKey;
    const axis = AXES[key];
    if (!axis) return;
    if (key === LEFT[axis]) s[axis] += 1;
    else s[axis] -= 1;
  });
  return s;
}

/** Renvoie un score 0..10 selon qu’on est orienté côté voulu (left/right) sur un axe */
function toward10(axisValue, wantsLeft) {
  const signed = wantsLeft ? axisValue : -axisValue;
  const pct = Math.min(1, Math.max(0, (signed + SPAN) / (2 * SPAN)));
  return Math.round(pct * 100) / 10; // 0..10, 1 décimale
}

/** Label de qualité (badge) */
function qualityLabel(x10) {
  if (x10 >= 9)   return ["Excellent", "bg-green-100 text-green-700"];
  if (x10 >= 8)   return ["Très bon", "bg-blue-100 text-blue-700"];
  if (x10 >= 7)   return ["Bon", "bg-amber-100 text-amber-700"];
  return ["À développer", "bg-gray-100 text-gray-700"];
}

/** Type court de profil pour la carte de gauche */
function headlineProfileType(s) {
  const e = s.EI, t = s.TF, j = s.JP, n = s.SN;
  if (e >= 0 && t >= 0) return "Leader naturel";
  if (n < 0 && t >= 0)  return "Stratège créatif";
  if (j >= 0 && t >= 0) return "Exécutant fiable";
  if (e < 0 && t < 0)   return "Facilitateur/trice empathique";
  return "Profil polyvalent";
}

export default function ResultsPage() {
  const navigate = useNavigate();

  /* --- Récup & calculs --- */
  const axes = useMemo(() => axisScoresFromLocalStorage(), []);
  const competences = useMemo(() => {
    // 8 compétences (0..10)
    const data = [
      {
        key: "creativite",
        name: "Créativité",
        icon: "🎨",
        score: 0.7 * toward10(axes.SN, false) + 0.3 * toward10(axes.LP, false), // N + Conceptuel
      },
      {
        key: "analyse",
        name: "Analyse",
        icon: "⭐",
        score: 0.6 * toward10(axes.TF, true) + 0.4 * toward10(axes.SN, true),  // T + S
      },
      {
        key: "communication",
        name: "Communication",
        icon: "💬",
        score: 0.5 * toward10(axes.EI, true) + 0.5 * toward10(axes.TF, false), // E + F
      },
      {
        key: "empathie",
        name: "Empathie",
        icon: "💗",
        score: 0.7 * toward10(axes.TF, false) + 0.3 * toward10(axes.EI, false), // F + I
      },
      {
        key: "organisation",
        name: "Organisation",
        icon: "⭐",
        score: 1.0 * toward10(axes.JP, true), // J
      },
      {
        key: "stress",
        name: "Résistance au stress",
        icon: "⭐",
        score: 0.5 * toward10(axes.JP, true) + 0.5 * toward10(axes.MO, true), // J + Objectifs
      },
      {
        key: "leadership",
        name: "Leadership",
        icon: "👑",
        score: 0.6 * toward10(axes.EI, true) + 0.4 * toward10(axes.TF, true), // E + T
      },
      {
        key: "technique",
        name: "Technique",
        icon: "⭐",
        score: 0.6 * toward10(axes.SN, true) + 0.4 * toward10(axes.LP, true), // S + Pratique
      },
    ].map(c => ({ ...c, score: Math.round(c.score * 10) / 10 }));

    return data;
  }, [axes]);

  const mainSkill = useMemo(
    () => competences.reduce((a, b) => (a.score >= b.score ? a : b), competences[0]),
    [competences]
  );

  const global = useMemo(() => {
    const avg = competences.reduce((s, c) => s + c.score, 0) / competences.length;
    return Math.round(avg * 10) / 10; // /10
  }, [competences]);

  const headline = headlineProfileType(axes);

  function restart() {
    try { localStorage.removeItem("fullTest.answers"); } catch {}
    navigate("/tests/complet");
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Top */}
      <header className="h-14 border-b border-gray-100 flex items-center justify-between px-4">
        <button onClick={() => navigate(-1)} className="text-sm text-gray-600 hover:text-gray-800">← Retour</button>
        <div className="text-sm font-medium">🏅 Vos Résultats</div>
        <Link
          to="/metiers" // adapte si besoin
          className="rounded-lg bg-orange-500 text-white px-3 py-1.5 text-sm hover:bg-orange-600"
        >
          🎁 Voir les métiers
        </Link>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* 3 cartes header */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border p-5">
            <div className="text-2xl">👑</div>
            <div className="mt-2 font-semibold">{headline}</div>
            <p className="mt-1 text-sm text-gray-600">
              Vous avez les qualités pour guider des équipes et motiver les autres.
            </p>
          </div>

          <div className="rounded-2xl border p-5">
            <div className="text-2xl">⭐</div>
            <div className="mt-2 font-semibold">Compétence principale</div>
            <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-green-50 text-green-700 px-3 py-1 text-sm">
              <span>{mainSkill.icon}</span>
              <span>{mainSkill.name}</span>
              <span className="ml-1 rounded-full bg-green-100 px-2 py-0.5 text-xs">{mainSkill.score}/10</span>
            </div>
          </div>

          <div className="rounded-2xl border p-5">
            <div className="text-2xl">📈</div>
            <div className="mt-2 font-semibold">Score global</div>
            <div className="mt-1 text-2xl font-semibold">{global.toFixed(1)}/10</div>
          </div>
        </div>

        {/* Profil de compétences */}
        <section className="mt-8 rounded-2xl border p-6">
          <div className="flex items-center gap-2 text-gray-800">
            <span>⭐</span>
            <span className="font-semibold">Votre Profil de Compétences</span>
          </div>

          <div className="mt-4 space-y-5">
            {competences.map((c) => {
              const width = Math.round((c.score / 10) * 100);
              const [qLabel, qClass] = qualityLabel(c.score);
              return (
                <div key={c.key}>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span>{c.icon}</span>
                      <span className="font-medium">{c.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`rounded-full px-2 py-0.5 text-xs ${qClass}`}>{qLabel}</span>
                      <span className="text-gray-500 text-sm">{c.score}/10</span>
                    </div>
                  </div>

                  <div className="mt-2 h-3 w-full rounded-full bg-rose-100 overflow-hidden">
                    <div
                      className="h-3 rounded-full bg-green-500"
                      style={{ width: `${width}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Points forts + Recos */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-2xl border p-6">
            <div className="flex items-center gap-2 text-gray-800">
              <span>🎯</span>
              <span className="font-semibold">Vos Points Forts</span>
            </div>

            <div className="mt-4 space-y-3">
              {competences
                .slice()
                .sort((a, b) => b.score - a.score)
                .map((c) => (
                  <div
                    key={c.key}
                    className="rounded-xl bg-green-50 text-green-800 px-4 py-3 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span>{c.icon}</span>
                      <div>
                        <div className="font-medium">{c.name}</div>
                        <div className="text-xs text-green-700">Score: {c.score}/10</div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </section>

          <section className="rounded-2xl border p-6">
            <div className="flex items-center gap-2 text-gray-800">
              <span>🚀</span>
              <span className="font-semibold">Recommandations</span>
            </div>

            <div className="mt-4 space-y-3">
              <div className="rounded-xl bg-blue-50 text-blue-900 p-4">
                <div className="font-medium">Explorez les métiers recommandés</div>
                <div className="text-sm text-blue-800">
                  Basés sur votre profil de compétences.
                </div>
              </div>
              <div className="rounded-xl bg-indigo-50 text-indigo-900 p-4">
                <div className="font-medium">Développez vos points forts</div>
                <div className="text-sm text-indigo-800">
                  Renforcez vos compétences principales.
                </div>
              </div>
              <div className="rounded-xl bg-purple-50 text-purple-900 p-4">
                <div className="font-medium">Équilibrez votre profil</div>
                <div className="text-sm text-purple-800">
                  Travaillez les compétences complémentaires.
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* CTA bas de page */}
        <div className="mt-8 flex flex-col md:flex-row gap-3 items-center">
          <Link
            to="/metiers"
            className="flex-1 md:flex-none rounded-xl bg-orange-500 text-white px-5 py-3 text-center hover:bg-orange-600"
          >
            🎁 Découvrir les métiers recommandés
          </Link>
          <button
            onClick={restart}
            className="rounded-xl border px-5 py-3 hover:bg-white"
          >
            Refaire le test
          </button>
          <Link
            to="/assistant"
            className="rounded-xl border px-5 py-3 hover:bg-white"
          >
            Parler à l'assistant
          </Link>
        </div>
      </main>
    </div>
  );
}
