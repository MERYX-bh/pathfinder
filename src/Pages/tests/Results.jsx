// src/Pages/tests/Results.jsx
import { Link, useNavigate } from "react-router-dom";
import { useMemo } from "react";

/* ------------------ Helpers d'état "auth/premium" ------------------ */
function getAuthState() {
  const isPremium = localStorage.getItem("pf.premium") === "1";
  // Heuristique "connecté" (remplace par ta vraie auth si tu en as une)
  const isLoggedIn =
    !!localStorage.getItem("auth.userEmail") ||
    !!localStorage.getItem("auth.pendingEmail") ||
    isPremium;
  return { isLoggedIn, isPremium };
}

/* ---------------------- Axes & scoring (démo) ---------------------- */
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
const SPAN = 6;

function axisScoresFromLocalStorage() {
  const raw = JSON.parse(localStorage.getItem("fullTest.answers") || "[]");
  const questions = JSON.parse(localStorage.getItem("fullTest.questions") || "null");
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
function toward10(axisValue, wantsLeft) {
  const signed = wantsLeft ? axisValue : -axisValue;
  const pct = Math.min(1, Math.max(0, (signed + SPAN) / (2 * SPAN)));
  return Math.round(pct * 100) / 10;
}
function headlineProfileType(s) {
  const e = s.EI, t = s.TF, j = s.JP, n = s.SN;
  if (e >= 0 && t >= 0) return "Le Leader Créatif";
  if (n < 0 && t >= 0)  return "Stratège créatif";
  if (j >= 0 && t >= 0) return "Exécutant fiable";
  if (e < 0 && t < 0)   return "Facilitateur/trice empathique";
  return "Profil polyvalent";
}

/* ------------------------ Données métiers (démo) ------------------------ */
const ALL_JOBS = [
  { id: "fullstack",   name: "Développeur Full-Stack", tag: "Technologie", score: 95,
    why: "Ton fort score en analyse et technique correspond parfaitement aux compétences requises.",
    pros: ["Forte demande sur le marché", "Salaires attractifs", "Télétravail possible"],
    cons: ["Apprentissage continu nécessaire", "Parfois long devant l’écran", "Deadlines serrées"] },
  { id: "uxui",        name: "Designer UX/UI", tag: "Design", score: 92,
    why: "Ta créativité élevée et ton sens de la communication sont des atouts majeurs.",
    pros: ["Créativité au quotidien", "Impact direct sur l’expérience utilisateur", "Secteur en croissance"],
    cons: ["Retours clients parfois difficiles", "Tendances changeantes", "Beaucoup de révisions"] },
  { id: "cpd",         name: "Chef de Projet Digital", tag: "Gestion", score: 88,
    why: "Ton leadership et ta communication font de toi un excellent candidat.",
    pros: ["Gestion d’équipes", "Vision stratégique", "Responsabilités importantes"],
    cons: ["Pression sur les résultats", "Gestion de conflits", "Disponibilité élevée"] },
  { id: "datasci",     name: "Data Scientist", tag: "Data & IA", score: 87,
    why: "Tes capacités d'analyse et ta rigueur sont idéales pour interpréter des données complexes.",
    pros: ["Secteur porteur", "Salaires élevés", "Innovation constante"],
    cons: ["Forte compétition", "Maths avancées requises", "Nettoyage de données fastidieux"] },
  { id: "pm",          name: "Product Manager", tag: "Produit", score: 85,
    why: "Ta vision stratégique et ta capacité à communiquer sont essentielles pour ce rôle.",
    pros: ["Vision d’ensemble", "Impact stratégique", "Diversité des missions"],
    cons: ["Nombreux stakeholders", "Arbitrages difficiles", "Responsabilités importantes"] },
  { id: "cloudarch",   name: "Architecte Cloud", tag: "Infrastructure", score: 83,
    why: "Ton expertise technique et ta vision à grande échelle correspondent aux besoins.",
    pros: ["Expertise recherchée", "Rémunération attractive", "Projets à grande échelle"],
    cons: ["Complexité technique", "Astreintes possibles", "Certifications coûteuses"] },
  { id: "devops",      name: "DevOps Engineer", tag: "Technologie", score: 79,
    why: "Ton sens de l’optimisation et ta rigueur technique sont des atouts pour les pipelines.",
    pros: ["Automatisation", "Amélioration continue", "Forte demande"],
    cons: ["Gestion d’incidents", "Astreintes fréquentes", "Pression opérationnelle"] },
  { id: "dataeng",     name: "Data Engineer", tag: "Data & IA", score: 78,
    why: "Ton profil technique/analytique convient à la construction de plateformes de données.",
    pros: ["Rôle central data", "Écosystème moderne", "Impact transversal"],
    cons: ["Complexité systèmes", "On-call possible", "Dette technique"] },
];

/* ------------------------------ UI ------------------------------ */
function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6">
      <circle cx="12" cy="12" r="11" fill="white" opacity="0.15" />
      <path d="M20 7l-9 9-5-5" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export default function ResultsPage() {
  const navigate = useNavigate();
  const { isLoggedIn, isPremium } = getAuthState();

  /* --- Calculs profil --- */
  const axes = useMemo(() => axisScoresFromLocalStorage(), []);
  const competences = useMemo(() => {
    const data = [
      { key: "technique",      name: "Technique",      color: "bg-emerald-500",   score: 0.6 * toward10(axes.SN, true) + 0.4 * toward10(axes.LP, true) },
      { key: "analyse",        name: "Analyse",        color: "bg-violet-500",    score: 0.6 * toward10(axes.TF, true) + 0.4 * toward10(axes.SN, true) },
      { key: "communication",  name: "Communication",  color: "bg-blue-600",      score: 0.5 * toward10(axes.EI, true) + 0.5 * toward10(axes.TF, false) },
      { key: "creativite",     name: "Créativité",     color: "bg-pink-500",      score: 0.7 * toward10(axes.SN, false) + 0.3 * toward10(axes.LP, false) },
      { key: "leadership",     name: "Leadership",     color: "bg-amber-600",     score: 0.6 * toward10(axes.EI, true) + 0.4 * toward10(axes.TF, true) },
    ].map(x => ({ ...x, score: Math.round(x.score * 10) / 10 }));
    return data;
  }, [axes]);

  const headline = headlineProfileType(axes);
  const showCount = isPremium ? 8 : 3;
  const jobs = useMemo(() => ALL_JOBS.slice(0, showCount), [showCount]);

  function restart() {
    try { localStorage.removeItem("fullTest.answers"); } catch {}
    navigate("/tests/complet");
  }

  function handlePayNow() { 
      navigate("/premium/inscription");
  }

  return (
    <div className="min-h-screen bg-[#fffdfb]">
      {/* Topbar simple */}
      <header className="h-14 border-b border-gray-100 flex items-center justify-between px-4 bg-white">
        <button onClick={() => navigate(-1)} className="text-sm text-gray-700 hover:text-gray-900">← Retour</button>
        <div className="text-sm font-medium">Résultats du test</div>
        <div className="opacity-0">.</div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Bannière réussite */}
        <div className="rounded-2xl bg-orange-500 text-white p-10 text-center">
          <div className="mx-auto mb-3 h-12 w-12 grid place-items-center rounded-full bg-white/20">
            <CheckIcon />
          </div>
          <div className="text-lg font-semibold">Test terminé !</div>
          <div className="mt-1 text-white/90">
            Félicitations, tu as complété le test avec succès
          </div>
        </div>

        {/* Bandeau “Premium activé” lorsque c’est le cas */}
        {isPremium && (
          <div className="mt-6 rounded-2xl bg-gradient-to-r from-indigo-700 to-blue-600 text-white p-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">👑</span>
              <div className="font-medium">Premium activé !</div>
            </div>
            <div className="text-sm text-white/90 mt-1">
              Tu as maintenant accès à tous les métiers et parcours détaillés.
            </div>
          </div>
        )}

        {/* Profil skills */}
        <section className="mt-8 rounded-2xl border bg-white p-6">
          <div className="font-semibold text-gray-900">Ton profil en un coup d’œil</div>
          <div className="mt-4 space-y-4">
            {competences.map(c => {
              const pct = Math.round((c.score / 10) * 100);
              return (
                <div key={c.key}>
                  <div className="flex items-center justify-between text-sm text-gray-800">
                    <span>{c.name}</span>
                    <span className="text-gray-500">{pct}%</span>
                  </div>
                  <div className="mt-2 h-3 w-full rounded-full bg-gray-100 overflow-hidden">
                    <div className={`h-3 rounded-full ${c.color}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Type de personnalité */}
        <section className="mt-8 rounded-2xl border bg-white p-6">
          <div className="text-gray-900 font-semibold">Type de personnalité</div>

          <div className="mt-4 rounded-xl bg-gradient-to-r from-orange-50 to-blue-50 p-4 border">
            <div className="inline-flex items-center gap-2">
              <span className="h-8 w-8 grid place-items-center rounded-full bg-orange-100 text-orange-600">✸</span>
              <span className="font-medium">{headline}</span>
            </div>
            <p className="mt-2 text-sm text-gray-700">
              Ton profil révèle une forte orientation vers <b>Technique</b> et <b>Analyse</b>.
              Tu excelles dans les environnements dynamiques qui valorisent l’innovation et la collaboration.
            </p>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-xl bg-blue-50 p-4">
              <div className="text-sm text-gray-500">Force</div>
              <div className="font-medium">Technique</div>
            </div>
            <div className="rounded-xl bg-green-50 p-4">
              <div className="text-sm text-gray-500">Style</div>
              <div className="font-medium">Collaboratif</div>
            </div>
            <div className="rounded-xl bg-indigo-50 p-4">
              <div className="text-sm text-gray-500">Motivation</div>
              <div className="font-medium">Innovation</div>
            </div>
            <div className="rounded-xl bg-amber-50 p-4">
              <div className="text-sm text-gray-500">Potentiel</div>
              <div className="font-medium">Élevé</div>
            </div>
          </div>
        </section>

        {/* Carte Premium (visible si NON premium) */}
        {!isPremium && (
          <section className="mt-8 rounded-2xl border-2 border-indigo-300 bg-indigo-50 p-0 overflow-hidden">
            <div className="px-5 py-4 flex items-center justify-between">
              <div>
                <div className="font-semibold">Débloque ton avenir professionnel</div>
                <div className="text-indigo-900/90 text-sm mt-1">
                  Accède aux descriptions complètes des métiers, aux parcours détaillés, aux recommandations d’écoles
                  et à une synthèse PDF personnalisée.
                </div>
              </div>
              <span className="rounded-full bg-indigo-600/10 text-indigo-700 px-2 py-1 text-xs">Premium</span>
            </div>

            <ul className="px-5 pb-0 text-sm text-indigo-900 space-y-2">
              <li>• 8 métiers recommandés (au lieu de 3)</li>
              <li>• Descriptions complètes + parcours détaillés</li>
              <li>• Recommandations d’écoles et établissements</li>
              <li>• Synthèse PDF personnalisée</li>
            </ul>

            <div className="px-5 pt-4 pb-5">
              <div className="text-2xl font-semibold">300€</div>
              <div className="text-xs text-indigo-900/70">Paiement unique • Accès à vie</div>

              <button
                onClick={handlePayNow}
                className="mt-4 w-full rounded-xl bg-indigo-700 text-white py-3 font-medium hover:bg-indigo-800"
              >
                👑 Payer maintenant
              </button>

              {!isLoggedIn && (
                <div className="mt-2 text-sm text-gray-700">
                  Déjà un compte ?{" "}
                  <Link to="/login" className="text-indigo-700 underline">Se connecter</Link>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Liste des métiers */}
        <section className="mt-8">
          <div className="text-gray-900 font-semibold">Tes métiers recommandés</div>

          {!isPremium && (
            <div className="mt-3 rounded-xl bg-violet-50 border border-violet-200 p-4 text-sm text-violet-900">
              <div className="font-medium">Version gratuite limitée :</div>
              <ul className="list-disc ml-5 mt-1 space-y-1">
                <li>Seulement 3 métiers visibles</li>
                <li>Pas de descriptions détaillées</li>
                <li>Pas d’accès aux parcours</li>
              </ul>
              <button
                onClick={() => navigate("/premium")}
                className="mt-3 inline-flex items-center rounded-lg border border-violet-300 bg-white px-3 py-1.5 text-violet-900 hover:bg-violet-100"
              >
                Passer à la version Premium pour tout débloquer
              </button>
            </div>
          )}

          <div className="mt-4 space-y-6">
            {jobs.map(j => (
              <div key={j.id} className="rounded-2xl border bg-white overflow-hidden">
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-lg font-semibold">{j.name}</div>
                      <div className="mt-1 inline-flex items-center gap-2 text-xs">
                        <span className="rounded-full bg-gray-100 px-2 py-0.5">{j.tag}</span>
                      </div>
                    </div>
                    <div className="text-orange-600 font-semibold">{j.score}%</div>
                  </div>

                  {isPremium ? (
                    <>
                      <p className="mt-3 text-sm text-gray-700">
                        <span className="text-orange-600 font-medium">Pourquoi ce métier pour toi :</span>{" "}
                        {j.why}
                      </p>

                      <div className="mt-4 grid md:grid-cols-2 gap-4">
                        <div className="rounded-xl bg-green-50 p-4">
                          <div className="font-medium text-green-900">Avantages</div>
                          <ul className="mt-2 text-sm text-green-800 list-disc ml-5">
                            {j.pros.map((p, i) => <li key={i}>{p}</li>)}
                          </ul>
                        </div>
                        <div className="rounded-xl bg-amber-50 p-4">
                          <div className="font-medium text-amber-900">Défis</div>
                          <ul className="mt-2 text-sm text-amber-800 list-disc ml-5">
                            {j.cons.map((c, i) => <li key={i}>{c}</li>)}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-4">
                        <Link
                          to={`/parcours/${j.id}`}
                          className="inline-flex items-center justify-center w-full md:w-auto rounded-xl border px-4 py-2 hover:bg-indigo-50"
                        >
                          Voir le parcours détaillé →
                        </Link>
                      </div>
                    </>
                  ) : (
                    <div className="mt-3 text-sm text-gray-500 inline-flex items-center gap-2">
                      <span className="inline-block h-4 w-4 rounded-full bg-gray-200" />
                      Détails disponibles en version Premium
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <button onClick={restart} className="w-full rounded-xl border bg-white px-4 py-3 hover:bg-gray-50">
              Repasser le test
            </button>
          </div>
        </section>

        {/* Conseils */}
        <section className="mt-8 rounded-2xl border bg-white p-6">
          <div className="font-semibold text-gray-900">Conseils personnalisés</div>
          <ul className="mt-3 space-y-2 text-sm text-gray-700">
            <li>✓ Explore les métiers qui combinent technique et analyse</li>
            <li>✓ Considère des formations qui renforcent tes points forts</li>
            <li>✓ N’hésite pas à contacter des professionnels pour des conseils</li>
          </ul>
        </section>

        {/* Debug (dev only) */}
        <section className="mt-8 rounded-2xl border border-dashed bg-gray-50 p-4 text-sm text-gray-700">
          <div className="font-medium">🔧 Debug Info (dev only)</div>
          <div className="mt-1">
            • isPremium: {isPremium ? <span className="text-green-700">TRUE (Premium)</span> : <span className="text-rose-700">FALSE (Gratuit)</span>}
          </div>
          <div>• Métiers affichés: {jobs.length} / 8</div>
          <div>• Version: {isPremium ? "PREMIUM (détails complets)" : "GRATUITE (3 métiers basiques)"} </div>
        </section>
      </main>
    </div>
  );
}
