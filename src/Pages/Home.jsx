// src/Pages/Home.jsx
import { Link } from "react-router-dom";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";

/* ==== petites icônes inline (pas de lib externe) ==== */
const Logo = () => (
  <div className="h-8 w-8 rounded-full bg-orange-500/15 text-orange-600 grid place-items-center font-semibold">
    P
  </div>
);
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.7" fill="none" />
    <path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="1.7" />
  </svg>
);
const BrainIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M8 10a3 3 0 1 1 0-6m0 6v7M16 10a3 3 0 1 0 0-6m0 6v7M12 9v10" stroke="currentColor" strokeWidth="1.6" fill="none" />
  </svg>
);
const ZapIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M13 2 3 14h7l-1 8 12-14h-7l-1-6Z" stroke="currentColor" strokeWidth="1.4" fill="none" />
  </svg>
);
const BookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 5h10a3 3 0 0 1 3 3v11H7a3 3 0 0 0-3 3V5Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M7 5v14" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);
const CapIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M2 9l10-5 10 5-10 5-10-5Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M6 12v4c0 2 4 3 6 3s6-1 6-3v-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </svg>
);
const TrendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M3 17l6-6 4 4 8-8" stroke="currentColor" strokeWidth="1.8" fill="none" />
  </svg>
);

function Badge({ children, color = "blue" }) {
  const map = {
    blue: "bg-blue-50 text-blue-700",
    orange: "bg-orange-50 text-orange-700",
    gray: "bg-gray-100 text-gray-700",
  };
  return (
    <span className={`inline-flex items-center rounded px-2 py-0.5 text-xs ${map[color]}`}>
      {children}
    </span>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* ===== Topbar ===== */}
      <header className="border-b border-gray-100 bg-white/70 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo />
            <div className="leading-tight">
              <div className="font-semibold">PathFinder</div>
              <div className="text-xs text-gray-500 -mt-0.5">Orientation professionnelle</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Badge color="orange">Nouveau</Badge>
            <button
              type="button"
              className="flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1.5 text-sm hover:bg-gray-50"
            >
              <span className="inline-block h-6 w-6 rounded-full bg-gray-200" />
              <span className="text-gray-700">meriem</span>
              <span className="text-xs text-gray-500">Voir mon parcours</span>
            </button>
          </div>
        </div>
      </header>

      {/* ===== Hero / Recherche ===== */}
      <section className="mx-auto max-w-6xl px-4 py-10 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold">Découvrez votre voie professionnelle</h1>
        <p className="mt-3 text-gray-600">
          Explorez les métiers, passez nos tests d’orientation ou demandez conseil à notre assistant IA.
        </p>

        {/* barre de recherche */}
        <div className="mx-auto mt-6 max-w-xl">
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <SearchIcon />
            </span>
            <input
              type="text"
              placeholder="Rechercher un métier (ex: développeur, designer, commercial...)"
              className="w-full rounded-2xl border border-gray-200 pl-10 pr-3 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
        </div>
      </section>

      {/* ===== Tests d’orientation ===== */}
      <section className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-xl font-semibold">Tests d'orientation professionnelle</h2>
        <p className="mt-1 text-center text-gray-500">
          Découvrez votre personnalité et vos métiers recommandés grâce à nos tests psychographiques validés.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {/* Test complet */}
          <Card className="rounded-2xl border-2 border-orange-100 p-6">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-orange-500/10 text-orange-600 grid place-items-center h-10 w-10">
                <BrainIcon />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">Test complet</h3>
                  <Badge>Recommandé</Badge>
                </div>

                <p className="mt-2 text-sm text-gray-600">
                  Analyse complète de votre personnalité et recommandations de métiers personnalisées.
                </p>

                <ul className="mt-3 space-y-1 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✔</span> 20 questions approfondies
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✔</span> Profil MBTI complet
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✔</span> Recommandations personnalisées
                  </li>
                </ul>

                <div className="mt-4 flex items-center gap-6 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <span role="img" aria-label="durée">⏱</span> Durée : 12-15 minutes
                  </div>
                  <div className="flex items-center gap-1">
                    <span role="img" aria-label="idéal">🧭</span> Idéal pour : Explorer
                  </div>
                </div>

                <div className="mt-5">
                  <Link to="/tests/complet">
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-4 py-2.5">
                      Commencer le test complet
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>

          {/* Test rapide */}
          <Card className="rounded-2xl border border-blue-200 p-6">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-blue-500/10 text-blue-600 grid place-items-center h-10 w-10">
                <ZapIcon />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">Test rapide</h3>
                  <Badge color="gray">Rapide</Badge>
                </div>

                <p className="mt-2 text-sm text-gray-600">
                  Idéal si vous avez déjà une idée de métier en tête, ou si vous voulez découvrir vos forces et faiblesses sans idée précise.
                </p>

                <ul className="mt-3 space-y-1 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="text-blue-600">•</span> 10 questions ciblées
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-600">•</span> Suggestions de métiers
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-600">•</span> Analyse des forces/faiblesses
                  </li>
                </ul>

                <div className="mt-4 flex items-center gap-6 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <span role="img" aria-label="durée">⏱</span> Durée : 5-7 minutes
                  </div>
                  <div className="flex items-center gap-1">
                    <span role="img" aria-label="idéal">🧭</span> Idéal pour : Confirmer ou découvrir
                  </div>
                </div>

                <div className="mt-5">
                  <Link
                    to="/tests/rapide/1"
                    className="inline-block mt-4 rounded-xl border border-blue-300 px-4 py-2.5 text-blue-600 hover:bg-blue-50"
                  >
                    Test rapide
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* ===== Préparation professionnelle ===== */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-center text-xl font-semibold">Préparation professionnelle</h2>
        <p className="mt-1 text-center text-gray-500">
          Développez vos compétences et préparez votre insertion sur le marché du travail.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <Card className="rounded-2xl border border-gray-200 p-6">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 grid place-items-center rounded-xl bg-violet-500/10 text-violet-600">
                <BookIcon />
              </div>
              <div>
                <h3 className="font-semibold">Cours pratiques</h3>
                <p className="mt-1 text-sm text-gray-600">
                  CV, lettres de motivation, entretiens d’embauche et recherche d’emploi.
                </p>
                <p className="mt-3 text-xs text-gray-500 flex items-center gap-2">
                  <span className="text-gray-400">👥</span> Modules interactifs
                </p>
              </div>
            </div>
          </Card>

          <Card className="rounded-2xl border border-gray-200 p-6">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 grid place-items-center rounded-xl bg-purple-500/10 text-purple-600">
                <CapIcon />
              </div>
              <div>
                <h3 className="font-semibold">Formations</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Parcours de formation détaillés avec partenaires éducatifs.
                </p>
                <p className="mt-3 text-xs text-gray-500">🎓 Cursus personnalisés</p>
              </div>
            </div>
          </Card>

          {/* Métiers → /metiers (carte entière cliquable) */}
          <Link
            to="/metiers"
            className="block focus:outline-none focus:ring-2 focus:ring-orange-400 rounded-2xl"
          >
            <Card className="rounded-2xl border border-gray-200 p-6 hover:border-orange-300 hover:shadow-md cursor-pointer transition">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 grid place-items-center rounded-xl bg-orange-500/10 text-orange-600">
                  <TrendIcon />
                </div>
                <div>
                  <h3 className="font-semibold">Métiers</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Explorez les fiches métiers détaillées et les opportunités.
                  </p>
                  <p className="mt-3 text-xs text-gray-500">🤖 Recommandations IA</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>

        {/* Bloc assistant IA */}
        <div className="mt-10 rounded-2xl border border-blue-200 bg-blue-50 p-6 md:p-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-white/70 grid place-items-center text-blue-600 shadow-sm">
              💬
            </div>
            <h3 className="text-lg md:text-xl font-semibold">Besoin d’aide personnalisée ?</h3>
            <p className="mt-2 text-gray-600">
              Notre assistant IA est là pour répondre à vos questions et vous guider dans votre orientation professionnelle.
            </p>
            <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/assistant">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-4 py-2.5">
                  Poser une question à l’IA
                </Button>
              </Link>
              <Link to="/presentation">
                <Button variant="outline" className="rounded-xl border px-4 py-2.5 hover:bg-white">
                  Revoir la présentation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Widget “Guide PathFinder” (bas-droite) ===== */}
      <aside
        aria-label="Guide PathFinder"
        className="fixed bottom-4 right-4 hidden md:block"
      >
        <div className="w-[280px] rounded-2xl border border-orange-200 bg-white p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="font-medium">Guide PathFinder</div>
            <button className="text-gray-400 hover:text-gray-600" title="Fermer">✕</button>
          </div>
          <div className="mt-1 text-xs text-gray-500">1/6 étapes</div>
          <div className="mt-2 h-2 w-full rounded-full bg-orange-100">
            <div className="h-2 w-1/6 rounded-full bg-orange-500" />
          </div>
          <div className="mt-3 text-sm">
            <div className="text-gray-500">Étape suivante :</div>
            <div className="mt-1 inline-flex items-center gap-2 rounded-lg border px-2 py-1">
              <span className="text-gray-700">📊 Test de personnalité</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
