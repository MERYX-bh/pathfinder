import { useNavigate } from "react-router-dom";

export default function AssistantWidget() {
  const nav = useNavigate();
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => nav("/assistant")}   // <-- ICI on va vers /assistant
        className="rounded-full px-4 py-2 bg-orange-500 text-white shadow-lg hover:bg-orange-600"
      >
        Poser une question à l’IA
      </button>
    </div>
  );
}
