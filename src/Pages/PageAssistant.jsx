import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AssistantPage() {
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Bonjour ! 👋 Je suis ton assistant d’orientation PathFinder. Je suis là pour t’aider à découvrir ta voie professionnelle. Qu'est-ce qui t’intéresse le plus ?",
      options: [
        "Travailler avec des personnes",
        "Résoudre des problèmes techniques",
        "Créer et innover",
        "Analyser des données",
      ],
    },
  ]);

  const nav = useNavigate();

  function sendOption(option) {
    setMessages(prev => [
      ...prev,
      { from: "user", text: option },
      {
        from: "bot",
        text:
          option === "Travailler avec des personnes"
            ? "Tu aimes la collaboration, le contact humain et l’accompagnement. Je peux te recommander des métiers orientés RH, relation client, école, ou management."
            : option === "Résoudre des problèmes techniques"
            ? "Super ! Tu apprécies les défis techniques : développement, infrastructure, sécurité, data engineering… Je peux te proposer des métiers adaptés."
            : option === "Créer et innover"
            ? "Génial ! Tu aimes imaginer, concevoir et créer. Le design, l’UX/UI, le marketing créatif ou le product design peuvent t'intéresser."
            : "Excellent choix ! Tu aimes comprendre, structurer et analyser. Data analyst, data scientist ou business analyst sont des pistes pour toi.",
        options: [
          "Voir des métiers recommandés",
          "Retour à l’accueil",
        ],
      },
    ]);
  }

  function onSelect(option) {
    if (option === "Retour à l’accueil") {
      nav("/");
      return;
    }
    if (option === "Voir des métiers recommandés") {
      nav("/metiers");
      return;
    }
    sendOption(option);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <header className="h-16 border-b flex items-center px-4 gap-3">
        <button onClick={() => nav(-1)} className="text-gray-600 text-xl">←</button>
        <div>
          <div className="font-semibold">Assistant PathFinder</div>
          <div className="text-green-600 text-sm">🟢 En ligne</div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">

        {messages.map((m, i) => (
          <div key={i} className="space-y-4">
            {m.from === "bot" && (
              <div className="inline-block bg-white shadow p-4 rounded-xl">
                <div className="font-medium mb-2">{m.text}</div>

                {m.options && (
                  <div className="mt-4 space-y-3">
                    {m.options.map((o, idx) => (
                      <button
                        key={idx}
                        onClick={() => onSelect(o)}
                        className="w-full flex items-center gap-2 bg-white border rounded-xl px-4 py-2 shadow-sm hover:bg-gray-50"
                      >
                        <span>✈️</span>
                        <span>{o}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {m.from === "user" && (
              <div className="text-right">
                <span className="inline-block bg-orange-500 text-white px-4 py-2 rounded-xl">
                  {m.text}
                </span>
              </div>
            )}
          </div>
        ))}

      </main>

      <footer className="text-center text-gray-500 py-2 text-sm">
        💡 Sélectionne une réponse pour continuer la conversation
      </footer>
    </div>
  );
}
