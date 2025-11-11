// src/Pages/tests/CareerPath.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

/* ---------------------- Données mock (fullstack & datasci) ---------------------- */
const CATALOG = {
  fullstack: {
    id: "fullstack",
    title: "Développeur Full-Stack",
    badge: "Ton parcours personnalisé",
    market: {
      demand: "Demande très forte sur le marché",
      hires:
        "12 500 offres d’emploi actives • Taux d’embauche +18% • Pénurie de talents confirmée",
      trend: "Croissance forte",
    },
    formations: [
      {
        id: "ecole42",
        kind: "École d'informatique",
        name: "École 42",
        desc: "Formation gratuite et innovante en développement web et software",
        duration: "3 ans",
        cost: "Gratuit",
        location: "Paris, Lyon, Perpignan",
        admission: "Sur dossier et tests",
        marketStat: {
          label: "Développeurs web issus de cette école",
          pct: 28,
          trend: "Croissance",
        },
      },
      {
        id: "wagon",
        kind: "Bootcamp",
        name: "Le Wagon",
        desc: "Bootcamp intensif de développement web full-stack",
        duration: "9 semaines",
        cost: "6 900€",
        location: "Paris, Lyon, Bordeaux",
        admission: "Entretien de motivation",
        marketStat: {
          label: "Développeurs web issus de cette école",
          pct: 22,
          trend: "Croissance",
        },
      },
      {
        id: "epitech",
        kind: "École d'informatique",
        name: "Epitech",
        desc: "École d'expertise informatique et de technologie",
        duration: "5 ans",
        cost: "7 500€/an",
        location: "Paris, Lyon, Bordeaux, Lille",
        admission: "Sur dossier et entretien",
        marketStat: {
          label: "Développeurs web issus de cette école",
          pct: 18,
          trend: "Stable",
        },
      },
      {
        id: "saclay",
        kind: "Université",
        name: "Université Paris-Saclay",
        desc: "Licence et Master en informatique",
        duration: "3-5 ans",
        cost: "250€/an",
        location: "Orsay",
        admission: "Parcoursup",
        marketStat: {
          label: "Développeurs web issus de cette école",
          pct: 15,
          trend: "Stable",
        },
      },
      {
        id: "openclassrooms",
        kind: "Formation en ligne",
        name: "OpenClassrooms",
        desc: "Formation diplômante en développement web à distance",
        duration: "12-18 mois",
        cost: "300€/mois",
        location: "En ligne",
        admission: "Ouvert à tous",
        marketStat: {
          label: "Développeurs web issus de cette école",
          pct: 17,
          trend: "Croissance",
        },
      },
    ],
    companyTypes: [
      {
        id: "startup",
        icon: "🚀",
        title: "Start-up Tech",
        subtitle: "Environnement dynamique et innovant, culture agile",
        examples: "Fintech, SaaS, E-commerce",
        pros: ["Innovation constante", "Responsabilités rapides", "Stock-options"],
        cons: ["Moins de stabilité", "Charge de travail élevée"],
        companies: [
          "Alan",
          "Qonto",
          "Doctolib",
          "PayFit",
          "Swile",
          "Back Market",
          "Contentsquare",
          "Mirakl",
        ],
        market: { stagePct: 32, workPct: 22, trend: "Croissance" },
      },
      {
        id: "grandgroupe",
        icon: "🏢",
        title: "Grand groupe / CAC40",
        subtitle: "Entreprises établies avec process structurés",
        examples: "Banques, Assurances, Retail",
        pros: ["Stabilité", "Avantages sociaux", "Carrière structurée"],
        cons: ["Hiérarchie importante", "Moins d'innovation"],
        companies: [
          "BNP Paribas",
          "Société Générale",
          "Crédit Agricole",
          "AXA",
          "Orange",
          "Carrefour",
          "SNCF",
          "Décathlon",
        ],
        market: { stagePct: 18, workPct: 22, trend: "Stable" },
      },
      {
        id: "freelance",
        icon: "⚡",
        title: "Freelance / Indépendant",
        subtitle: "Autonomie complète et choix des projets",
        examples: "Consultant, Développeur freelance",
        pros: ["Liberté totale", "Revenus potentiels élevés", "Choix des clients"],
        cons: ["Pas de sécurité", "Gestion administrative", "Isolement"],
        companies: [
          "Malt",
          "Comet",
          "Crème de la Crème",
          "Kicklox",
          "FreelanceRepublik",
          "Upwork",
          "Fiverr",
          "Independant.io",
        ],
        market: { stagePct: 12, workPct: 15, trend: "Croissance" },
      },
      {
        id: "agence",
        icon: "🧩",
        title: "Agence / ESN",
        subtitle: "Projets variés chez plusieurs clients",
        examples: "Conseil, Intégration, Agences digitales",
        pros: ["Variété de missions", "Montée en compétences rapide", "Réseau"],
        cons: ["Contexte client variable", "Mission-driven"],
        companies: [
          "Publicis Sapient",
          "Wavestone",
          "Valtech",
          "OCTO Technology",
          "Theodo",
          "BAM",
          "Ekino",
          "Eleven Labs",
        ],
        market: { stagePct: 12, workPct: 15, trend: "Stable" },
      },
    ],
  },

  datasci: {
    id: "datasci",
    title: "Data Scientist",
    badge: "Ton parcours personnalisé",
    market: {
      demand: "Demande élevée sur le marché",
      hires: "6 000 offres • +12% d’embauches • forte compétition",
      trend: "Croissance modérée",
    },
    formations: [
      {
        id: "m2ds",
        kind: "Master",
        name: "M2 Data Science (Université)",
        desc: "Parcours scientifique en statistiques, ML, deep learning",
        duration: "2 ans",
        cost: "250€/an",
        location: "France (Sorbonne, PSL, Paris-Saclay...)",
        admission: "Dossier + Pré-requis",
        marketStat: { label: "Data scientists issus de cette filière", pct: 24, trend: "Stable" },
      },
      {
        id: "ensae",
        kind: "Grande École",
        name: "ENSAE / ENSAI",
        desc: "Écoles spécialisées en stats/éco et data science",
        duration: "3 ans",
        cost: "~3 000€/an",
        location: "Palaiseau / Rennes",
        admission: "Concours / Dossier",
        marketStat: { label: "Data scientists issus de cette filière", pct: 19, trend: "Croissance" },
      },
      {
        id: "oc-ds",
        kind: "Formation en ligne",
        name: "OpenClassrooms - Data Scientist",
        desc: "Parcours diplômant à distance axé projets",
        duration: "12-18 mois",
        cost: "300€/mois",
        location: "En ligne",
        admission: "Ouvert à tous",
        marketStat: { label: "Data scientists issus de cette filière", pct: 14, trend: "Croissance" },
      },
    ],
    companyTypes: [
      {
        id: "research",
        icon: "🔬",
        title: "R&D / Recherche",
        subtitle: "Labs, équipes IA, publis",
        examples: "Labs internes / publics",
        pros: ["Excellence technique", "Impact scientifique"],
        cons: ["Sélection élevée", "Cadence publications"],
        companies: ["Inria", "Meta FAIR Paris", "DeepMind (EU)", "CNRS", "NavAlgo"],
        market: { stagePct: 9, workPct: 12, trend: "Stable" },
      },
      {
        id: "product-ai",
        icon: "🧠",
        title: "Produit IA",
        subtitle: "Équipes produit avec features ML",
        examples: "SaaS, plateformes",
        pros: ["Impact utilisateur", "Data volumineuse"],
        cons: ["Priorisation produit", "MLOps requis"],
        companies: ["Doctolib", "Back Market", "Qonto", "Alan"],
        market: { stagePct: 15, workPct: 19, trend: "Croissance" },
      },
    ],
  },
};

/* ------------------------- Helpers visuels ------------------------- */
function Badge({ children, tone = "gray" }) {
  const tones = {
    gray: "bg-gray-100 text-gray-800",
    green: "bg-green-100 text-green-800",
    orange: "bg-orange-100 text-orange-800",
    blue: "bg-blue-100 text-blue-800",
  };
  return <span className={`rounded-full px-2 py-0.5 text-xs ${tones[tone]}`}>{children}</span>;
}
function StatBar({ pct, color = "bg-blue-600" }) {
  return (
    <div className="mt-2 h-2 w-full rounded-full bg-gray-200 overflow-hidden">
      <div className={`h-2 ${color}`} style={{ width: `${pct}%` }} />
    </div>
  );
}
const Check = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5">
    <path d="M20 7l-9 9-5-5" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
  </svg>
);

/* ------------------------- Page principale ------------------------- */
export default function CareerPath() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const job = useMemo(() => CATALOG[jobId], [jobId]);

  const storageKey = `pf.path.${jobId}`;
  const [validatedFormationIds, setValidatedFormationIds] = useState([]);
  const [steps, setSteps] = useState([]); // { companyTypeId, step }

  useEffect(() => {
    if (!job) return;
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "null");
      if (saved) {
        setValidatedFormationIds(saved.validatedFormationIds || []);
        setSteps(saved.steps || []);
      }
    } catch {}
  }, [job, storageKey]);

  function toggleValidateFormation(id) {
    setValidatedFormationIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function addStep(companyTypeId, step) {
    setSteps((prev) => [...prev, { companyTypeId, step }]);
    setToast("Étape ajoutée à ton parcours");
  }

  function savePath() {
    const payload = { validatedFormationIds, steps, savedAt: Date.now(), jobId };
    try {
      localStorage.setItem(storageKey, JSON.stringify(payload));
    } catch {}
    setToast("Parcours enregistré ! Retrouve-le dans ton profil à tout moment");
  }

  const [toast, setToast] = useState("");
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2400);
    return () => clearTimeout(t);
  }, [toast]);

  if (!job) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="rounded-2xl border bg-white p-6">
          <div className="font-semibold">Métier introuvable</div>
          <button onClick={() => navigate(-1)} className="mt-3 rounded-lg border px-3 py-1.5 hover:bg-gray-50">
            ← Retour
          </button>
        </div>
      </div>
    );
  }

  const DURATIONS = {
    formationInit: "2-5 ans",
    stageAlt: "6-12 mois",
    stageFreelance: "3-6 mois",
    junior: "1-2 ans",
    montee: "2-3 ans",
    senior: "3-5 ans",
  };

  const firstValidatedFormation = validatedFormationIds.length
    ? job.formations.find((f) => f.id === validatedFormationIds[0])
    : null;

  const hasFreelanceStage = steps.some((s) => s.companyTypeId === "freelance" && s.step === "stage");

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header + actions */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-lg font-semibold">{job.title}</div>
          <div className="text-sm text-gray-600">{job.badge}</div>
        </div>
        <button
          onClick={savePath}
          className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
        >
          <span className="inline-block h-5 w-5 rounded-md bg-white/25 grid place-items-center">
            <svg viewBox="0 0 24 24" className="h-4 w-4">
              <path d="M17 3H7a2 2 0 0 0-2 2v14l7-3 7 3V5a2 2 0 0 0-2-2Z" fill="currentColor" />
            </svg>
          </span>
          Enregistrer
        </button>
      </div>

      {/* Filtres (cosmétiques) */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button className="inline-flex items-center gap-2 rounded-xl border bg-white px-3 py-1.5">
          <svg viewBox="0 0 24 24" className="h-4 w-4">
            <path d="M3 4h18l-7 8v6l-4 2v-8L3 4Z" fill="currentColor" />
          </svg>
          Filtres
        </button>
        <button className="rounded-xl border bg-white px-3 py-1.5">Toutes</button>
        <button className="rounded-xl border bg-white px-3 py-1.5">Tous les prix</button>
      </div>

      {/* Stats métier */}
      <section className="mt-6 rounded-2xl border bg-gradient-to-r from-indigo-50 to-orange-50 p-5">
        <div className="text-gray-900 font-semibold">Statistiques du métier de {job.title}</div>
        <p className="mt-2 text-sm text-gray-700">{job.market.hires}</p>
        <div className="mt-4 rounded-xl bg-orange-100/60 text-orange-900 p-4 flex items-center justify-between">
          <div className="font-medium">{job.market.demand}</div>
          <span className="rounded-full bg-green-100 text-green-700 px-2 py-0.5 text-xs">✔ {job.market.trend}</span>
        </div>
      </section>

      {/* Timeline */}
       <section className="mt-10">
  <h2 className="text-xl font-semibold text-gray-900 mb-6">
    Parcours classique vers ce métier
  </h2>

  {/* timeline container */}
  <ul className="relative pl-28 space-y-12">

    {/* Ligne verticale */}
    <span
      aria-hidden
      className="pointer-events-none absolute left-9 top-0 bottom-0 w-[3px]
                 bg-gradient-to-b from-orange-400 via-blue-400 to-orange-400"
    />

    {[
      {
        title: "Formation initiale",
        subtitle: "Acquérir les bases techniques et théoriques du métier",
        right: "2–5 ans",
        dot: "orange",
      },
      {
        title: "M2 Data Science (Université)",
        subtitle: "Master · France (Sorbonne, PSL, Paris-Saclay…)",
        right: "2 ans",
        dot: "green",
        badge: "Validé",
      },
      {
        title: "Premier stage / Alternance",
        subtitle: "Première expérience professionnelle en entreprise",
        right: "6–12 mois",
        dot: "blue",
      },
      {
        title: "Stage en Freelance / Indépendant",
        subtitle: "Autonomie complète et choix des projets",
        right: "3–6 mois",
        dot: "orange",
      },
      {
        title: "Premier emploi (Junior)",
        subtitle: "Développer ses compétences sur des projets réels",
        right: "1–2 ans",
        dot: "blue",
      },
      {
        title: "Montée en compétences",
        subtitle: "Devenir autonome et expert dans son domaine",
        right: "2–3 ans",
        dot: "orange",
      },
      {
        title: "Développeur Full-Stack Senior",
        subtitle: "Leadership technique et mentorat",
        right: "3–5 ans",
        dot: "blue",
      },
    ].map((step, idx) => (
      <li key={idx} className="relative pl-16 md:pl-20">

        {/* pastille */}
        <span
          aria-hidden
          className={[
            "absolute left-6 top-[2px] h-6 w-6 rounded-full bg-white border-[5px]",
            step.dot === "orange" && "border-orange-300",
            step.dot === "blue" && "border-blue-300",
            step.dot === "green" && "border-green-500 bg-green-500",
          ]
            .filter(Boolean)
            .join(" ")}
        />

        {/* contenu */}
        <div className="flex items-start justify-between gap-8 ml-0">
          <div className="flex-1">
            <div className="font-semibold text-lg">{step.title}</div>
            <div className="text-gray-600 text-sm">{step.subtitle}</div>

            {step.badge && (
              <span className="mt-1 inline-block rounded-full bg-green-100 text-green-700 text-xs px-2 py-0.5">
                {step.badge}
              </span>
            )}
          </div>

          <span className="shrink-0 rounded-full bg-gray-100 text-gray-700 text-xs px-3 py-1">
            {step.right}
          </span>
        </div>
      </li>
    ))}
  </ul>
</section>

      {/* Formations */}
      <section className="mt-8">
        <div className="text-gray-900 font-semibold">Formations disponibles</div>
        <p className="text-sm text-gray-600">
          Sélectionne la formation qui correspond le mieux à ton projet
        </p>

        <div className="mt-4 space-y-6">
          {job.formations.map((f) => {
            const validated = validatedFormationIds.includes(f.id);
            return (
              <div
                key={f.id}
                className="rounded-2xl border-2 border-orange-300 bg-orange-50/40 p-0 overflow-hidden"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="text-lg font-semibold">{f.name}</div>
                    {validated && (
                      <span className="inline-flex items-center gap-1 text-green-600">
                        <Check /> Validée
                      </span>
                    )}
                  </div>
                  <div className="mt-2 inline-flex items-center gap-2">
                    <Badge>{f.kind}</Badge>
                  </div>

                  <p className="mt-3 text-gray-700">{f.desc}</p>

                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <div className="text-sm text-gray-500">Durée</div>
                      <div className="font-medium">{f.duration}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Coût</div>
                      <div className="font-medium">{f.cost}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Localisation</div>
                      <div className="font-medium">{f.location}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Admission</div>
                      <div className="font-medium">{f.admission}</div>
                    </div>
                  </div>

                  <div className="mt-6 rounded-xl bg-indigo-50 p-4">
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-indigo-900">Statistiques du marché</div>
                      <span className="rounded-full bg-white/60 px-2 py-0.5 text-xs">
                        {f.marketStat.trend}
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-indigo-900/90">{f.marketStat.label}</div>
                    <StatBar pct={f.marketStat.pct} />
                    <div className="text-right text-xs text-indigo-900/70 mt-1">
                      {f.marketStat.pct}%
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-5">
                  {validated ? (
                    <div className="rounded-xl bg-green-200/70 text-green-900 px-4 py-3 font-medium grid place-items-center">
                      <span className="inline-flex items-center gap-2">
                        <Check /> Formation validée
                      </span>
                    </div>
                  ) : (
                    <button
                      onClick={() => toggleValidateFormation(f.id)}
                      className="w-full rounded-xl bg-orange-500 text-white py-3 font-medium hover:bg-orange-600"
                    >
                      Valider cette formation
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Types d’entreprises */}
      <section className="mt-10">
        <div className="text-gray-900 font-semibold">Types d'entreprises</div>
        <p className="text-sm text-gray-600">
          Ajoute-les à une étape : <b>Stage</b>, <b>Alternance</b>, <b>Junior</b> ou{" "}
          <b>Intermédiaire</b>.
        </p>

        <div className="mt-5 space-y-8">
          {job.companyTypes.map((t) => (
            <div key={t.id} className="rounded-2xl border bg-white">
              <div className="p-5">
                <div className="inline-flex items-center gap-2">
                  <span className="text-xl">{t.icon}</span>
                  <div>
                    <div className="font-semibold">{t.title}</div>
                    <div className="text-gray-600">{t.subtitle}</div>
                    <div className="text-xs text-gray-500">Exemples : {t.examples}</div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="rounded-xl bg-green-50 p-4">
                    <div className="font-medium text-green-900">Avantages</div>
                    <ul className="mt-2 text-sm text-green-800 list-disc ml-5">
                      {t.pros.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl bg-amber-50 p-4">
                    <div className="font-medium text-amber-900">Points d'attention</div>
                    <ul className="mt-2 text-sm text-amber-800 list-disc ml-5">
                      {t.cons.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="text-sm font-medium text-gray-900">
                    Entreprises dans ce domaine :
                  </div>
                  <div className="mt-2 grid md:grid-cols-2 gap-3">
                    {t.companies.map((c) => (
                      <div key={c} className="rounded-xl bg-gray-50 px-4 py-3">
                        {c}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 rounded-xl bg-orange-50 p-4">
                  <div className="text-sm font-medium text-gray-900">Statistiques du marché</div>
                  <div className="mt-3 text-sm text-gray-800">
                    Ont fait un stage dans ce type d'entreprise
                  </div>
                  <StatBar pct={t.market.stagePct} color="bg-blue-600" />
                  <div className="text-right text-xs text-gray-500 mt-1">
                    {t.market.stagePct}%
                  </div>

                  <div className="mt-3 text-sm text-gray-800">
                    Travaillent actuellement dans ce type
                  </div>
                  <StatBar pct={t.market.workPct} color="bg-orange-500" />
                  <div className="text-right text-xs text-gray-500 mt-1">
                    {t.market.workPct}%
                  </div>
                </div>

                <div className="mt-5">
                  <div className="text-sm font-medium text-gray-900 mb-2">
                    Ajouter ce type d’entreprise à quelle étape ?
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <button
                      onClick={() => addStep(t.id, "stage")}
                      className="rounded-xl border bg-white px-4 py-3 text-left hover:bg-gray-50"
                    >
                      <div className="font-medium">Stage</div>
                      <div className="text-xs text-gray-500">3–6 mois</div>
                    </button>
                    <button
                      onClick={() => addStep(t.id, "alt")}
                      className="rounded-xl border bg-white px-4 py-3 text-left hover:bg-gray-50"
                    >
                      <div className="font-medium">Alternance</div>
                      <div className="text-xs text-gray-500">1–2 ans</div>
                    </button>
                    <button
                      onClick={() => addStep(t.id, "junior")}
                      className="rounded-xl border bg-white px-4 py-3 text-left hover:bg-gray-50"
                    >
                      <div className="font-medium">Junior</div>
                      <div className="text-xs text-gray-500">1–2 ans</div>
                    </button>
                    <button
                      onClick={() => addStep(t.id, "inter")}
                      className="rounded-xl border bg-white px-4 py-3 text-left hover:bg-gray-50"
                    >
                      <div className="font-medium">Intermédiaire</div>
                      <div className="text-xs text-gray-500">2–3 ans</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {(validatedFormationIds.length > 0 || steps.length > 0) && (
        <section className="mt-8 rounded-2xl border bg-white p-5">
          <div className="font-semibold text-gray-900">Aperçu de ton parcours</div>
          <div className="mt-3 text-sm text-gray-800">
            {validatedFormationIds.length > 0 && (
              <div className="mb-2">
                <div className="text-gray-600">Formations validées :</div>
                <ul className="list-disc ml-5">
                  {validatedFormationIds.map((id) => {
                    const f = job.formations.find((x) => x.id === id);
                    return <li key={id}>{f ? f.name : id}</li>;
                  })}
                </ul>
              </div>
            )}
            {steps.length > 0 && (
              <div>
                <div className="text-gray-600">Étapes entreprises :</div>
                <ul className="list-disc ml-5">
                  {steps.map((s, i) => {
                    const t = job.companyTypes.find((x) => x.id === s.companyTypeId);
                    const labelMap = {
                      stage: "Stage",
                      alt: "Alternance",
                      junior: "Junior",
                      inter: "Intermédiaire",
                    };
                    return (
                      <li key={`${s.companyTypeId}-${s.step}-${i}`}>
                        {labelMap[s.step]} — {t ? t.title : s.companyTypeId}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {!!toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
          <div className="rounded-xl bg-emerald-900 text-white px-4 py-2 shadow-lg text-sm">
            {toast}
          </div>
        </div>
      )}

      <div className="mt-8 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="rounded-xl border bg-white px-4 py-2 hover:bg-gray-50">
          ← Retour
        </button>
        <button onClick={savePath} className="rounded-xl bg-orange-500 text-white px-4 py-2 hover:bg-orange-600">
          Enregistrer
        </button>
      </div>
    </div>
  );
}
