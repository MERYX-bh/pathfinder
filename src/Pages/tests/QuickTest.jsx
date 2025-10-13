// src/Pages/tests/QuickTest.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/ui/Button.jsx";
import TopTestBar from "../../components/test/TopTestBar.jsx";
import ProgressBar from "../../components/test/ProgressBar.jsx";
import QuestionCard from "../../components/test/QuestionCard.jsx";
import PagerDots from "../../components/test/PagerDots.jsx";
import quickTestQuestions from "../../data/quickTestQuestions.js";

export default function QuickTest() {
  const { step: stepParam } = useParams();
  const navigate = useNavigate();
  const total = quickTestQuestions.length;

  const step = Math.min(total, Math.max(1, parseInt(stepParam || "1", 10)));
  const index = step - 1;
  const q = quickTestQuestions[index];

  // réponses (persistées localStorage)
  const [answers, setAnswers] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("pf_quick_answers") || "[]");
    } catch {
      return [];
    }
  });

  // selection courante
  const selectedIndex = useMemo(() => answers[index] ?? null, [answers, index]);

  useEffect(() => {
    // garde fou: si url invalide
    if (!q) navigate("/tests/rapide/1", { replace: true });
  }, [q, navigate]);

  const setSelected = (optIndex) => {
    const next = [...answers];
    next[index] = optIndex;
    setAnswers(next);
    localStorage.setItem("pf_quick_answers", JSON.stringify(next));
  };

  const goPrev = () => {
    if (step > 1) navigate(`/tests/rapide/${step - 1}`);
  };

  const goNext = () => {
    if (step < total) {
      navigate(`/tests/rapide/${step + 1}`);
    } else {
      // Fin du test
      // 👉 remplace par une vraie page de résultats si tu veux
      navigate("/tests/rapide/1"); // ou: navigate("/tests/rapide/result");
      alert("Test rapide terminé ✅\n(Connecte ici ton moteur d’analyse / résultat)");
    }
  };

  return (
    <div className="-mt-6">
      {/* top bar + barre de progression */}
      <TopTestBar step={step} total={total} />
      <ProgressBar step={step} total={total} />

      {/* carte question */}
      <div className="mx-auto max-w-3xl mt-6">
        <QuestionCard
          group={q.group}
          title={q.title}
          options={q.options}
          selectedIndex={selectedIndex}
          onSelect={setSelected}
          note={q.dimensionNote}
        />

        {/* actions */}
        <div className="mt-6 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={goPrev}
            className="rounded-xl border px-4 py-2.5 hover:bg-gray-50"
            disabled={step === 1}
          >
            ← Précédent
          </Button>

          <Button
            onClick={goNext}
            className={`rounded-xl px-4 py-2.5 text-white
              ${step === total ? "bg-orange-500 hover:bg-orange-600" : "bg-orange-500 hover:bg-orange-600"}
              ${selectedIndex == null ? "opacity-60 cursor-not-allowed" : ""}`}
            disabled={selectedIndex == null}
          >
            {step === total ? "Analyser ma personnalité" : "Suivant →"}
          </Button>
        </div>

        {/* pastilles */}
        <PagerDots step={step} total={total} />
      </div>
    </div>
  );
}
