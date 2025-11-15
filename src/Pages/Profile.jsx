// src/Pages/Profile.jsx
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

/* -------------------------------------------------------
   Petites icônes inline (pas de lib externe nécessaire)
------------------------------------------------------- */
const PremiumBadge = () => (
  <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-0.5 text-xs text-yellow-800">
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path d="M3 7l4 3 5-6 5 6 4-3v10H3V7Z" fill="currentColor" />
    </svg>
    Premium
  </span>
);
const LogoutIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
    <path d="M10 17v2H4V5h6v2H6v10h4Zm9-5-4 4v-3h-7v-2h7V8l4 4Z" fill="currentColor" />
  </svg>
);
const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
    <path d="M7 2h2v2h6V2h2v2h3v18H4V4h3V2Zm12 6H5v12h14V8Z" fill="currentColor" />
  </svg>
);
const ArrowRight = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
    <path
      d="M12 4l1.41 1.41L8.83 10H20v2H8.83l4.58 4.59L12 18l-8-8 8-8Z"
      transform="rotate(180 12 12)"
      fill="currentColor"
    />
  </svg>
);
const GiftIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
    <path d="M20 7h-2.18A3.001 3.001 0 1 0 12 5a3.001 3.001 0 1 0-5.82 2H4v5h8V7h-2a1 1 0 1 1 0-2h2a1 1 0 1 1 0 2h2v5h8V7Zm-8 7H4v7h8v-7Zm2 0v7h8v-7h-8Z" fill="currentColor" />
  </svg>
);
const MatchIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
    <path d="M3 13l4 4 7-7 7 7V6h-2v8.17l-5-5L7 15l-3-3z" fill="currentColor" />
  </svg>
);

/* -------------------------------------------------------
   Petit catalogue minimal pour "résoudre" les IDs sauvegardés
   (mêmes IDs que ta page CareerPath)
------------------------------------------------------- */
const CATALOG = {
  fullstack: {
    id: "fullstack",
    title: "Développeur Full-Stack",
    formations: [
      { id: "ecole42", name: "École 42", kind: "École d'informatique", duration: "3 ans" },
      { id: "wagon", name: "Le Wagon", kind: "Bootcamp", duration: "9 semaines" },
      { id: "epitech", name: "Epitech", kind: "École d'informatique", duration: "5 ans" },
      { id: "saclay", name: "Université Paris-Saclay", kind: "Université", duration: "3-5 ans" },
      { id: "openclassrooms", name: "OpenClassrooms", kind: "Formation en ligne", duration: "12-18 mois" },
    ],
  },
  datasci: {
    id: "datasci",
    title: "Data Scientist",
    formations: [
      { id: "m2ds", name: "M2 Data Science (Université)", kind: "Master", duration: "2 ans" },
      { id: "ensae", name: "ENSAE / ENSAI", kind: "Grande École", duration: "3 ans" },
      { id: "oc-ds", name: "OpenClassrooms - Data Scientist", kind: "Formation en ligne", duration: "12-18 mois" },
    ],
  },
};

/* -------------------------------------------------------
   Helpers lecture localStorage (robustes si rien n’est set)
------------------------------------------------------- */
function loadUser() {
  const name = localStorage.getItem("auth.userName") || "Utilisateur";
  const email = localStorage.getItem("auth.userEmail") || "utilisateur@example.com";
  const premium = localStorage.getItem("pf.premium") === "1";
  return { name, email, premium };
}

// On s'attend (si tu as suivi le component CareerPath proposé)
// à trouver des parcours sauvegardés sous la clé `pf.path.<jobId>`.
// Chaque payload ressemble à : { jobId, validatedFormationIds: [...], steps: [...], savedAt: <ts> }
function loadSavedPaths() {
  const paths = [];
  for (const key in localStorage) {
    if (Object.prototype.hasOwnProperty.call(localStorage, key) && key.startsWith("pf.path.")) {
      try {
        const value = JSON.parse(localStorage.getItem(key) || "null");
        if (value && value.jobId) paths.push(value);
      } catch {}
    }
  }
  // tri par date desc
  paths.sort((a, b) => (b.savedAt || 0) - (a.savedAt || 0));
  return paths;
}

// Tests simulés : si tu as un historique stocke-le sous "pf.tests" (array). Sinon on crée un fallback.
function loadTests() {
  try {
    const saved = JSON.parse(localStorage.getItem("pf.tests") || "null");
    if (Array.isArray(saved)) return saved;
  } catch {}
  // Fallback (1 test fictif si l’utilisateur a déjà des réponses dans le localStorage du test)
  const hadAnswers = !!localStorage.getItem("fullTest.answers");
  if (hadAnswers) {
    return [
      {
        id: "test-full",
        name: "Test d'orientation complet",
        date: new Date().toISOString(),
        profileTag: "Profil Innovateur",
        jobCount: 3,
        match: 95,
      },
    ];
  }
  return [];
}

/* -------------------------------------------------------
   Vue principale
------------------------------------------------------- */
export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(loadUser());
  const [tests, setTests] = useState(loadTests());
  const [paths, setPaths] = useState(loadSavedPaths());

  // recompute si localStorage change (action manuelle sur la page)
  useEffect(() => {
    const onStorage = () => {
      setUser(loadUser());
      setTests(loadTests());
      setPaths(loadSavedPaths());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Stats du header
  const metrics = useMemo(() => {
    const exploredJobs = tests.reduce((acc, t) => acc + (t.jobCount || 0), 0) || 0;
    const bestMatch = tests.length ? (tests[0].match || 95) : 0;
    return {
      testsCount: tests.length,
      exploredJobs,
      match: bestMatch,
    };
  }, [tests]);

  // Déconnexion
  function handleLogout() {
    try {
      // infos d'auth
      localStorage.removeItem("auth.userEmail");
      localStorage.removeItem("auth.userName");
      localStorage.removeItem("auth.pendingEmail");
      localStorage.removeItem("pf.premium");
      // si plus tard tu ajoutes un token : localStorage.removeItem("auth.token");
    } catch {}

    // retour à la page de login
    navigate("/auth/login");
  }

  // Helper pour formater une date courte FR
  function fmt(d) {
    try {
      return new Date(d).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "";
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Bandeau dégradé */}
      <div className="h-40 w-full bg-[linear-gradient(120deg,#ff7a59_0%,#7c4dff_100%)]" />

      <main className="mx-auto max-w-5xl px-4 -mt-24 pb-16">
        {/* Carte entête profil */}
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-xl bg-gray-100 grid place-items-center text-2xl text-gray-500">
                <svg viewBox="0 0 24 24" className="h-9 w-9" aria-hidden>
                  <path
                    d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.33 0-8 2-8 4.5V21h16v-2.5C20 16 16.33 14 12 14Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div>
                <div className="text-lg font-semibold">{user.name}</div>
                <div className="text-sm text-gray-600">{user.email}</div>
                <div className="mt-2 flex items-center gap-2">
                  {user.premium && <PremiumBadge />}
                  {!!tests.length && (
                    <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs text-indigo-800">
                      {tests.length} test{tests.length > 1 ? "s" : ""} complété
                      {tests.length > 1 ? "s" : ""}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50"
              title="Déconnexion"
            >
              <LogoutIcon />
              Déconnexion
            </button>
          </div>

          {/* KPIs */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border bg-white p-4">
              <div className="flex items-center gap-2 text-gray-500">
                <CalendarIcon />
                Test
              </div>
              <div className="mt-1 text-2xl font-semibold">
                {metrics.testsCount}
              </div>
            </div>

            <div className="rounded-xl border bg-white p-4">
              <div className="flex items-center gap-2 text-gray-500">
                <GiftIcon />
                Métiers
              </div>
              <div className="mt-1 text-2xl font-semibold">
                {metrics.exploredJobs}
              </div>
            </div>

            <div className="rounded-xl border bg-white p-4">
              <div className="flex items-center gap-2 text-gray-500">
                <MatchIcon />
                Match
              </div>
              <div className="mt-1 text-2xl font-semibold">
                {metrics.match || 0}%
              </div>
            </div>
          </div>
        </div>

        {/* Mes tests */}
        <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
          <div className="flex items-center justify-between">
            <div className="font-semibold">Mes tests d'orientation</div>
            {tests.length > 0 && (
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
                {tests.length} test{tests.length > 1 ? "s" : ""}
              </span>
            )}
          </div>

          {tests.length === 0 ? (
            <div className="mt-4 text-sm text-gray-600">
              Tu n’as pas encore complété de test.
              <Link
                to="/tests/complet"
                className="ml-2 text-orange-600 underline"
              >
                Commencer le test
              </Link>
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {tests.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between rounded-xl border bg-white p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="h-9 w-9 grid place-items-center rounded-lg bg-orange-50 text-orange-600">
                      <CalendarIcon />
                    </div>
                    <div>
                      <div className="font-medium">{t.name}</div>
                      <div className="text-xs text-gray-500">
                        {fmt(t.date)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {t.profileTag && (
                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs text-yellow-800">
                        {t.profileTag}
                      </span>
                    )}
                    <Link
                      to="/tests/complet/resultats"
                      className="inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50"
                    >
                      Voir
                      <ArrowRight />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Parcours sauvegardés */}
        <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
          <div className="flex items-center justify-between">
            <div className="font-semibold">Mes parcours personnalisés</div>
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
              {paths.length} parcours
            </span>
          </div>

          {paths.length === 0 ? (
            <div className="mt-4 text-sm text-gray-600">
              Aucun parcours sauvegardé. Va sur un métier (ex.{" "}
              <Link
                className="underline text-indigo-600"
                to="/parcours/fullstack"
              >
                Full-Stack
              </Link>
              ) et clique sur <b>Enregistrer</b>.
            </div>
          ) : (
            <div className="mt-4 space-y-4">
              {paths.map((p, idx) => {
                const cat = CATALOG[p.jobId];
                const title = cat?.title || p.jobId;
                const firstFormationId = p.validatedFormationIds?.[0];
                const formation = cat?.formations?.find(
                  (f) => f.id === firstFormationId
                );
                const stepsCount = (p.steps || []).length;

                const companiesLabel = (() => {
                  if (!stepsCount) return "Aucune entreprise sélectionnée";
                  const first = p.steps[0];
                  const stepMap = {
                    stage: "Stage",
                    alt: "Alternance",
                    junior: "Junior",
                    inter: "Intermédiaire",
                  };
                  return `${stepsCount} entreprise${
                    stepsCount > 1 ? "s" : ""
                  } sélectionnée${stepsCount > 1 ? "s" : ""} • ${
                    stepMap[first.step] || "Étape"
                  }`;
                })();

                return (
                  <div
                    key={`${p.jobId}-${idx}`}
                    className="rounded-2xl border bg-gradient-to-r from-indigo-50 to-orange-50 p-5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-lg font-semibold">{title}</div>

                        {/* Formation choisie */}
                        {formation ? (
                          <div className="mt-2 inline-flex items-center gap-2">
                            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-orange-100 text-orange-700">
                              🎓
                            </span>
                            <div>
                              <div className="font-medium">
                                {formation.name}
                              </div>
                              <div className="text-xs text-gray-600">
                                {formation.kind} • {formation.duration}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="mt-2 text-sm text-gray-600">
                            Aucune formation validée
                          </div>
                        )}

                        {/* Entreprises / étapes */}
                        <div className="mt-3 inline-flex items-center gap-2">
                          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700">
                            🏢
                          </span>
                          <div className="text-sm text-gray-800">
                            {companiesLabel}
                          </div>
                        </div>

                        <div className="mt-3 text-xs text-gray-500">
                          Mis à jour le {fmt(p.savedAt || Date.now())}
                        </div>
                      </div>

                      <Link
                        to={`/parcours/${p.jobId}`}
                        className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm ring-1 ring-gray-200 hover:bg-gray-50"
                      >
                        Voir le parcours <ArrowRight />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Actions rapides */}
        <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
          <div className="font-semibold">Actions rapides</div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <Link
              to="/tests/complet"
              className="flex items-center justify-between rounded-xl border bg-white px-4 py-3 hover:bg-gray-50"
            >
              <span className="inline-flex items-center gap-2">
                <span className="h-6 w-6 grid place-items-center rounded-lg bg-orange-100 text-orange-700">
                  🧭
                </span>
                Nouveau test
              </span>
              <ArrowRight />
            </Link>

            <Link
              to="/metiers"
              className="flex items-center justify-between rounded-xl border bg-white px-4 py-3 hover:bg-gray-50"
            >
              <span className="inline-flex items-center gap-2">
                <span className="h-6 w-6 grid place-items-center rounded-lg bg-indigo-100 text-indigo-700">
                  🎯
                </span>
                Voir les métiers
              </span>
              <ArrowRight />
            </Link>

            <Link
              to="/assistant"
              className="flex items-center justify-between rounded-xl border bg-white px-4 py-3 hover:bg-gray-50"
            >
              <span className="inline-flex items-center gap-2">
                <span className="h-6 w-6 grid place-items-center rounded-lg bg-green-100 text-green-700">
                  🤖
                </span>
                Assistant IA
              </span>
              <ArrowRight />
            </Link>

            <Link
              to="/tests/complet/resultats?download=1"
              className="flex items-center justify-between rounded-xl border bg-white px-4 py-3 hover:bg-gray-50"
            >
              <span className="inline-flex items-center gap-2">
                <span className="h-6 w-6 grid place-items-center rounded-lg bg-gray-100 text-gray-700">
                  ⬇️
                </span>
                Mes résultats
              </span>
              <ArrowRight />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
