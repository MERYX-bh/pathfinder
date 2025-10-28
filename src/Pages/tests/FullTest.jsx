// src/Pages/tests/FullTest.jsx
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button.jsx";
import Card from "../../components/ui/Card.jsx";
import { fullTestQuestions } from "../../data/fullTestQuestions.js";

const Progress = ({ current, total }) => (
  <div className="w-full">
    <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
      <span>Question {current} sur {total}</span>
      <span>{Math.round((current / total) * 100)}%</span>
    </div>
    <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
      <div
        className="h-2 bg-orange-500 transition-all"
        style={{ width: `${(current / total) * 100}%` }}
      />
    </div>
  </div>
);

const DotPager = ({ current, total }) => (
  <div className="mt-6 flex justify-center gap-2">
    {Array.from({ length: total }).map((_, i) => (
      <span
        key={i}
        className={`h-2.5 w-2.5 rounded-full ${i < current ? "bg-orange-500" : "bg-gray-200"}`}
      />
    ))}
  </div>
);

// Mapping des axes psychographiques
const AXES = {
  E: "EI", I: "EI",
  S: "SN", N: "SN",
  T: "TF", F: "TF",
  J: "JP", P: "JP",
  G: "MO", M: "MO",
  PRACT: "LP", CONC: "LP",
};

const TITLES = {
  EI: ["Extraverti·e", "Introverti·e"],
  SN: ["Concret·ète", "Intuitif·ve / Vision"],
  TF: ["Logique", "Valeurs / Empathie"],
  JP: ["Structuré·e", "Flexible"],
  MO: ["Objectifs & Résultats", "Sens & Impact"],
  LP: ["Pratique", "Conceptuel"],
};

const LEFT = { EI: "E", SN: "S", TF: "T", JP: "J", MO: "G", LP: "PRACT" };
const RIGHT = { EI: "I", SN: "N", TF: "F", JP: "P", MO: "M", LP: "CONC" };

export default function FullTest() {
  const navigate = useNavigate();
  const total = fullTestQuestions.length;

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState(() =>
    JSON.parse(localStorage.getItem("fullTest.answers") || "[]")
  );

  useEffect(() => {
    localStorage.setItem("fullTest.answers", JSON.stringify(answers));
  }, [answers]);

  const q = fullTestQuestions[index];
  const selected = answers[index] ?? null;

  function onSelect(optIdx) {
    const next = [...answers];
    next[index] = optIdx;
    setAnswers(next);
  }

  function prev() {
    if (index > 0) setIndex(index - 1);
  }

  const canNext = selected !== null;

  // *** ACTION DU BOUTON SUIVANT ***
  function next() {
    if (!canNext) return;

    if (index === total - 1) {
      // fin → écran d'analyse
      navigate("/tests/complet/analyse");
    } else {
      setIndex(index + 1);
    }
  }

  // --- Calcul du score ---
  const score = useMemo(() => {
    const s = { EI: 0, SN: 0, TF: 0, JP: 0, MO: 0, LP: 0 };

    answers.forEach((optIdx, i) => {
      const qq = fullTestQuestions[i];
      const opt = typeof optIdx === "number" ? qq.options[optIdx] : null;
      if (!opt) return;

      const key = opt.scoreKey;
      const axis = AXES[key];
      if (!axis) return;

      if (key === LEFT[axis]) s[axis] += 1;
      else s[axis] -= 1;
    });

    return s;
  }, [answers]);

  const completion = answers.filter((x) => x !== undefined && x !== null).length;

  return (
    <div className="min-h-screen bg-white">

      {/* ======= TOPBAR ======= */}
      <header className="sticky top-0 z-10 border-b border-gray-100 bg-white/70 backdrop-blur">
        <div className="mx-auto max-w-4xl px-4 h-16 flex items-center justify-between">
          <div className="text-sm">
            <div className="font-semibold">Test complet</div>
            <div className="text-gray-500">Profil psychographique</div>
          </div>
          <span className="rounded-full bg-orange-100 text-orange-700 px-3 py-1 text-xs">
            Test de Découverte
          </span>
        </div>
      </header>

      {/* ======= CORPS ======= */}
      <main className="mx-auto max-w-4xl px-4 py-8">
        <Progress current={index + 1} total={total} />

        <Card className="mt-6 rounded-2xl border border-gray-200 p-6">
          <div className="text-xs uppercase tracking-wide text-gray-500">
            {q.domain} • {q.skill}
          </div>

          <h1 className="mt-1 text-lg md:text-xl font-semibold">{q.text}</h1>

          <div className="mt-4 space-y-3">
            {q.options.map((opt, i) => {
              const active = selected === i;

              return (
                <button
                  key={i}
                  onClick={() => onSelect(i)}
                  className={`w-full text-left rounded-xl border px-4 py-3 transition
                    ${active ? "border-orange-400 bg-orange-50" : "border-gray-200 hover:bg-gray-50"}`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`h-4 w-4 rounded-full border
                        ${active ? "border-orange-500 bg-orange-500" : "border-gray-300"}`}
                    />
                    <span className="text-sm">{opt.label}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* ======= ACTIONS ======= */}
          <div className="mt-6 flex items-center justify-between">
            <Button
              variant="outline"
              className="rounded-xl border px-4 py-2.5"
              onClick={prev}
              disabled={index === 0}
            >
              ← Précédent
            </Button>

            <div className="text-xs text-gray-500">{completion}/{total} répondues</div>

            <Button
              onClick={next}
              disabled={!canNext}
              className={`rounded-xl px-4 py-2.5 ${
                canNext
                  ? "bg-orange-500 text-white hover:bg-orange-600"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              {index === total - 1 ? "Analyser ma personnalité" : "Suivant →"}
            </Button>
          </div>
        </Card>

        <DotPager current={index + 1} total={total} />
      </main>
    </div>
  );
}

/* ======================= COMPONENT RESULTATS ======================= */

function Results({ score }) {
  const rows = [
    { axis: "EI" },
    { axis: "SN" },
    { axis: "TF" },
    { axis: "JP" },
    { axis: "MO" },
    { axis: "LP" },
  ];

  function pct(v) {
    const span = 6;
    const p = Math.round(((v + span) / (2 * span)) * 100);
    return Math.min(100, Math.max(0, p));
  }

  const summary = rows.map(({ axis }) =>
    (score[axis] >= 0 ? TITLES[axis][0] : TITLES[axis][1])
  );

  return (
    <Card className="rounded-2xl border border-gray-200 p-6">
      <h2 className="text-lg md:text-xl font-semibold">Votre profil</h2>

      <p className="text-sm text-gray-600 mt-1">
        Résumé : <span className="font-medium text-gray-800">{summary.join(" • ")}</span>
      </p>

      <div className="mt-6 space-y-5">
        {rows.map(({ axis }, i) => (
          <div key={i}>
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>{TITLES[axis][0]}</span>
              <span>{TITLES[axis][1]}</span>
            </div>

            <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-2 bg-orange-500"
                style={{ width: `${pct(score[axis])}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <Link to="/presentation">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-4 py-2.5">
            Comprendre mes résultats
          </Button>
        </Link>
        <Link to="/assistant">
          <Button variant="outline" className="rounded-xl border px-4 py-2.5 hover:bg-white">
            Demander conseil à l’IA
          </Button>
        </Link>
      </div>
    </Card>
  );
}
