// src/Pages/tests/Formations.jsx
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/* ========= Axes & helpers : identiques au reste de l'app ========= */
const AXES = {
  E: "EI", I: "EI",
  S: "SN", N: "SN",
  T: "TF", F: "TF",
  J: "JP", P: "JP",
  G: "MO", M: "MO",
  PRACT: "LP", CONC: "LP",
};
const LEFT  = { EI: "E",  SN: "S",  TF: "T",  JP: "J",  MO: "G",  LP: "PRACT" };
const RIGHT = { EI: "I",  SN: "N",  TF: "F",  JP: "P",  MO: "M",  LP: "CONC" };
const SPAN = 6;

function axisScoresFromLocalStorage() {
  const raw = JSON.parse(localStorage.getItem("fullTest.answers") || "[]");
  const questions = JSON.parse(localStorage.getItem("fullTest.questions") || "null");
  const qlist = questions || (window.__questions__ || []);
  const s = { EI:0, SN:0, TF:0, JP:0, MO:0, LP:0 };
  raw.forEach((optIdx, i) => {
    const q = qlist[i]; if (!q) return;
    const opt = q.options?.[optIdx]; if (!opt) return;
    const k = opt.scoreKey; const axis = AXES[k]; if (!axis) return;
    if (k === LEFT[axis]) s[axis] += 1; else s[axis] -= 1;
  });
  return s;
}
function toward10(axisValue, wantsLeft) {
  const signed = wantsLeft ? axisValue : -axisValue;
  const pct = Math.min(1, Math.max(0, (signed + SPAN) / (2 * SPAN)));
  return Math.round(pct * 100) / 10; // 0..10
}
function computeCompetences(axes) {
  return {
    creativite:   +(0.7 * toward10(axes.SN, false) + 0.3 * toward10(axes.LP, false)).toFixed(1), // N + Conceptuel
    analyse:      +(0.6 * toward10(axes.TF, true)   + 0.4 * toward10(axes.SN, true)).toFixed(1),  // T + S
    communication:+(0.5 * toward10(axes.EI, true)   + 0.5 * toward10(axes.TF, false)).toFixed(1), // E + F
    empathie:     +(0.7 * toward10(axes.TF, false)  + 0.3 * toward10(axes.EI, false)).toFixed(1), // F + I
    organisation: +(1.0 * toward10(axes.JP, true)).toFixed(1),                                    // J
    stress:       +(0.5 * toward10(axes.JP, true)   + 0.5 * toward10(axes.MO, true)).toFixed(1),   // J + Objectifs
    leadership:   +(0.6 * toward10(axes.EI, true)   + 0.4 * toward10(axes.TF, true)).toFixed(1),   // E + T
    technique:    +(0.6 * toward10(axes.SN, true)   + 0.4 * toward10(axes.LP, true)).toFixed(1),   // S + Pratique
  };
}
function computeMBTI(axes) {
  const letter = (v, left, right) => (v >= 0 ? left : right);
  return (
    letter(axes.EI,"E","I") +
    letter(axes.SN,"S","N").replace("S","N") // on veut N si négatif
      .replace("N","S"), // petite sécurité (garde ES/EN logique)
    letter(axes.SN,"S","N")
  );
}
// version propre (corrigée) :
function computeMBTI4(axes){
  const EI = axes.EI >= 0 ? "E" : "I";
  const SN = axes.SN >= 0 ? "S" : "N";
  const TF = axes.TF >= 0 ? "T" : "F";
  const JP = axes.JP >= 0 ? "J" : "P";
  return EI + SN + TF + JP;
}

/* Style d’apprentissage suggéré par MBTI (très simple mais lisible) */
const MBTI_STYLES = {
  ENFP: ["Dynamique", "Créatif", "Social", "Stimulant"],
  ENTP: ["Stimulant", "Exploratoire", "Créatif", "Collaboratif"],
  ENFJ: ["Social", "Collaboratif", "Structuré", "Dynamique"],
  ENTJ: ["Structuré", "Analytique", "Exigeant", "Projet"],
  INFJ: ["Réflexif", "Calme", "Conceptuel", "Signifiant"],
  INFP: ["Créatif", "Calme", "Projet", "Autonome"],
  ISTJ: ["Structuré", "Pratique", "Méthodique", "Régulier"],
  ESTJ: ["Structuré", "Exigeant", "Projet", "Concret"],
  ISTP: ["Pratique", "Technique", "Autonome", "Intensif"],
  ESTP: ["Intensif", "Pratique", "Dynamique", "Terrain"],
  ISFJ: ["Réconfortant", "Progressif", "Régulier", "Encadré"],
  ESFJ: ["Social", "Encadré", "Collaboratif", "Progressif"],
  INTJ: ["Conceptuel", "Autonome", "Analytique", "Projet"],
  INTP: ["Autonome", "Conceptuel", "Exploratoire", "Analytique"],
  ISFP: ["Créatif", "Calme", "Progressif", "Projet"],
  ESFP: ["Dynamique", "Social", "Stimulant", "Pratique"],
};

/* ========= Dataset Formations ========= */
const COURSES = [
  {
    id: "pnc",
    title: "Formation Hôtesse de l'air",
    school: "École Nationale de l'Aviation Civile",
    category: "Écoles spécialisées",
    rating: 4.7,
    duration: "3 mois",
    tuition: "2 000€",
    city: "Toulouse",
    styleTags: ["social","adaptatif","service"],
    jobTags: ["Hôtesse de l’air"],
    weights: { communication:0.30, empathie:0.20, organisation:0.15, stress:0.15, leadership:0.10, technique:0.05, analyse:0.03, creativite:0.02 },
    link: "#"
  },
  {
    id: "mdesign",
    title: "Master Design Graphique et Digital",
    school: "École Supérieure d'Art et Design",
    category: "Universités",
    rating: 4.5,
    duration: "2 ans",
    tuition: "8 000€/an",
    city: "Paris",
    styleTags: ["visuel","créatif","collaboratif"],
    jobTags: ["Designer graphique"],
    weights: { creativite:0.35, communication:0.15, technique:0.15, organisation:0.10, analyse:0.10, empathie:0.10, leadership:0.03, stress:0.02 },
    link: "#"
  },
  {
    id: "vtourisme",
    title: "Formation Conseiller en Voyage",
    school: "École Supérieure de Tourisme",
    category: "Écoles spécialisées",
    rating: 4.1,
    duration: "2 ans",
    tuition: "6 000€/an",
    city: "Nice",
    styleTags: ["créatif","culturel","relationnel"],
    jobTags: ["Conseiller en voyage"],
    weights: { communication:0.25, empathie:0.25, organisation:0.15, analyse:0.10, creativite:0.15, technique:0.05, leadership:0.03, stress:0.02 },
    link: "#"
  },
  {
    id: "mcommerce",
    title: "Master Commerce et Négociation",
    school: "École de Commerce",
    category: "Universités",
    rating: 4.3,
    duration: "2 ans",
    tuition: "12 000€/an",
    city: "Bordeaux",
    styleTags: ["social","pratique","dynamique"],
    jobTags: ["Commercial"],
    weights: { communication:0.30, empathie:0.15, leadership:0.20, analyse:0.10, organisation:0.15, technique:0.03, creativite:0.05, stress:0.02 },
    link: "#"
  },
  {
    id: "insa",
    title: "École d'Ingénieur Informatique",
    school: "INSA Lyon",
    category: "Universités",
    rating: 4.8,
    duration: "5 ans",
    tuition: "3 000€/an",
    city: "Lyon",
    styleTags: ["logique","analytique","autonome"],
    jobTags: ["Développeur","Ingénieur en intelligence artificielle"],
    weights: { technique:0.35, analyse:0.30, organisation:0.15, communication:0.08, stress:0.06, leadership:0.03, creativite:0.02, empathie:0.01 },
    link: "#"
  },
  {
    id: "wagon",
    title: "Bootcamp Développement Web",
    school: "Le Wagon",
    category: "Bootcamps",
    rating: 4.6,
    duration: "24 semaines",
    tuition: "6 500€",
    city: "Plusieurs villes",
    styleTags: ["pratique","intensif","collaboratif"],
    jobTags: ["Développeur"],
    weights: { technique:0.35, analyse:0.20, organisation:0.15, communication:0.10, leadership:0.08, stress:0.07, creativite:0.03, empathie:0.02 },
    link: "#"
  },
];

/* ========= UI utils ========= */
const Chip = ({ children, tone="gray" }) => {
  const map = {
    gray: "bg-gray-100 text-gray-700",
    blue: "bg-blue-100 text-blue-700",
    violet: "bg-violet-100 text-violet-700",
    green: "bg-green-100 text-green-700",
    orange: "bg-orange-100 text-orange-700",
    indigo: "bg-indigo-100 text-indigo-700",
  };
  return <span className={`px-2 py-1 rounded-full text-xs ${map[tone]}`}>{children}</span>;
};
const SegBtn = ({active, onClick, children}) => (
  <button
    onClick={onClick}
    className={`rounded-full px-3 py-1.5 text-sm border ${active ? "bg-orange-500 text-white border-orange-500" : "border-gray-200 hover:bg-gray-50"}`}
  >
    {children}
  </button>
);
function Progress({ value }) {
  return (
    <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
      <div className="h-2 bg-orange-500" style={{width: `${value}%`}} />
    </div>
  );
}

/* ========= Page ========= */
export default function Formations() {
  const navigate = useNavigate();
  const axes = useMemo(() => axisScoresFromLocalStorage(), []);
  const competences = useMemo(() => computeCompetences(axes), [axes]);
  const mbti = useMemo(() => computeMBTI4(axes), [axes]);
  const stylePrefs = MBTI_STYLES[mbti] || ["Dynamique","Collaboratif","Progressif","Pratique"];

  /* matching formation */
  function matchPercent(course) {
    const w = course.weights;
    const dot =
      (competences.creativite  * (w.creativite  || 0)) +
      (competences.analyse      * (w.analyse      || 0)) +
      (competences.communication* (w.communication|| 0)) +
      (competences.empathie     * (w.empathie     || 0)) +
      (competences.organisation * (w.organisation || 0)) +
      (competences.stress       * (w.stress       || 0)) +
      (competences.leadership   * (w.leadership   || 0)) +
      (competences.technique    * (w.technique    || 0));

    // Bonus de style : +5% par recouvrement (max +20%)
    const styleSet = new Set(course.styleTags.map(s=>s.toLowerCase()));
    let overlap = 0;
    stylePrefs.forEach(tag => { if (styleSet.has(tag.toLowerCase())) overlap += 1; });
    const bonus = Math.min(20, overlap * 5);

    const base = Math.round((dot / 10) * 100); // 0..100
    return Math.max(0, Math.min(100, base + bonus));
  }

  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("Toutes");
  const [tab, setTab] = useState("Reco"); // "Reco" | "Style"

  const withScore = useMemo(() => {
    return COURSES.map(c => ({...c, score: matchPercent(c)}))
      .sort((a,b)=> b.score - a.score);
  }, [competences, stylePrefs]);

  const categories = useMemo(() => {
    const counts = { "Toutes": withScore.length, "Universités":0, "Écoles spécialisées":0, "Bootcamps":0, "En ligne":0 };
    withScore.forEach(c => { counts[c.category] = (counts[c.category]||0)+1; });
    return counts;
  }, [withScore]);

  const filtered = withScore.filter(c => {
    const okCat = activeCat === "Toutes" ? true : c.category === activeCat;
    const q = query.trim().toLowerCase();
    const okQuery = !q ||
      c.title.toLowerCase().includes(q) ||
      c.school.toLowerCase().includes(q) ||
      c.jobTags.some(t=>t.toLowerCase().includes(q));
    return okCat && okQuery;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="h-14 border-b border-gray-100 flex items-center justify-between px-4">
        <button onClick={()=>navigate(-1)} className="text-sm text-gray-600 hover:text-gray-800">← Retour</button>
        <div className="text-sm font-medium">🎓 Formations personnalisées</div>
        <Link to="/assistant" className="rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50">Assistant IA</Link>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-center text-xl font-semibold">Formations personnalisées</h1>
        <p className="text-center text-gray-600 mt-2 max-w-3xl mx-auto">
          Découvrez les formations les plus adaptées à votre profil psychologique et vos métiers d’intérêt.
          Nos recommandations tiennent compte de votre type de personnalité et style d’apprentissage.
        </p>

        {/* Profil pris en compte */}
        <div className="flex justify-center mt-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-indigo-600 text-white text-xs px-3 py-1">
            🧠 Profil {mbti} pris en compte
          </span>
        </div>

        {/* Carte style d'apprentissage */}
        <div className="mt-6 rounded-2xl border border-violet-100 bg-violet-50 px-5 py-4">
          <div className="flex items-center gap-2 text-violet-800">
            <span>💡</span>
            <span className="font-medium">Votre style d'apprentissage optimal</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {stylePrefs.map((t,i)=><Chip key={i} tone="violet">{t}</Chip>)}
          </div>
        </div>

        {/* Recherche */}
        <div className="max-w-xl mx-auto mt-6">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔎</span>
            <input
              value={query}
              onChange={e=>setQuery(e.target.value)}
              placeholder="Rechercher une formation ou école…"
              className="w-full rounded-2xl border border-gray-200 pl-9 pr-3 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
        </div>

        {/* Filtres catégories */}
        <div className="mt-5 flex items-center justify-center gap-2 flex-wrap">
          {["Toutes","Universités","Écoles spécialisées","Bootcamps","En ligne"].map(cat=>(
            <SegBtn key={cat} active={activeCat===cat} onClick={()=>setActiveCat(cat)}>
              {cat} ({categories[cat]||0})
            </SegBtn>
          ))}
        </div>

        {/* Tabs */}
        <div className="max-w-3xl mx-auto mt-6 grid grid-cols-2 items-center gap-3">
          <button
            onClick={()=>setTab("Reco")}
            className={`rounded-full py-2 text-sm border ${tab==="Reco"?"bg-gray-900 text-white border-gray-900":"border-gray-200 hover:bg-gray-50"}`}
          >
            🌐 Recommandées
          </button>
          <button
            onClick={()=>setTab("Style")}
            className={`rounded-full py-2 text-sm border ${tab==="Style"?"bg-gray-900 text-white border-gray-900":"border-gray-200 hover:bg-gray-50"}`}
          >
            🧭 Par style
          </button>
        </div>

        {/* Grid formations */}
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {(tab==="Reco" ? filtered : filtered.sort((a,b)=> {
            // ordonner par recouvrement de style si onglet "Style"
            const count = (c)=>c.styleTags.filter(t=>stylePrefs.map(s=>s.toLowerCase()).includes(t.toLowerCase())).length;
            return count(b)-count(a);
          })).map(course => (
            <article key={course.id} className="rounded-2xl border p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="text-2xl">🏫</div>
                  <div>
                    <div className="font-semibold leading-tight">{course.title}</div>
                    <div className="text-xs text-gray-500">{course.school}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm">⭐ {course.rating}</div>
                  <div className="text-xs text-purple-600">{course.score}%</div>
                </div>
              </div>

              <div className="mt-3">
                <Chip tone="blue">Bon match</Chip>
              </div>

              <p className="mt-3 text-sm text-gray-600">
                {course.id==="pnc" && "Formation certifiante PNC pour l’aviation civile."}
                {course.id==="mdesign" && "Formation complète en design graphique avec spécialisation digitale."}
                {course.id==="vtourisme" && "Formation en conseil touristique et gestion de voyages."}
                {course.id==="mcommerce" && "Spécialisation en techniques commerciales et management."}
                {course.id==="insa" && "Formation d’ingénieur généraliste avec spécialisation informatique."}
                {course.id==="wagon" && "Formation intensive au développement web full-stack."}
              </p>

              <div className="mt-4 text-sm">
                <div className="font-medium">Style d’apprentissage :</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {course.styleTags.map((t,i)=><Chip key={i}>{t}</Chip>)}
                </div>
              </div>

              <div className="mt-4 text-sm">
                <div className="font-medium">Métiers accessibles :</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {course.jobTags.map((t,i)=><Chip key={i} tone="indigo">{t}</Chip>)}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-gray-700">
                <div className="flex items-center gap-2"><span>⏱</span><span>{course.duration}</span></div>
                <div className="flex items-center gap-2"><span>€</span><span>{course.tuition}</span></div>
                <div className="flex items-center gap-2"><span>📍</span><span>{course.city}</span></div>
              </div>

              <div className="mt-3">
                <Progress value={course.score} />
              </div>

              <div className="mt-4">
                <a href={course.link} className="inline-flex items-center gap-2 rounded-xl bg-orange-500 text-white px-4 py-2 text-sm hover:bg-orange-600">
                  En savoir plus <span>↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Bandeau préparation insertion */}
        <div className="mt-10 rounded-2xl border bg-blue-50 p-6">
          <div className="flex items-center gap-2 text-blue-900">
            <span className="text-xl">📘</span>
            <div className="font-semibold">Préparez votre insertion professionnelle</div>
          </div>
          <p className="mt-1 text-sm text-blue-900/80">
            Accédez à nos cours pratiques pour réussir votre transition vers le monde du travail : entretiens, recherche de stage, premier emploi…
          </p>
          <div className="mt-4">
            <Link to="/cours-pratiques" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 text-white px-4 py-2 text-sm hover:bg-blue-700">
              Accéder aux cours pratiques →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
