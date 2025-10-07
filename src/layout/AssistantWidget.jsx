import { useNavigate } from "react-router-dom";

export default function AssistantWidget() {
  const nav = useNavigate();
  return (
    <div className="fixed bottom-4 right-4">
      <button
        onClick={() => nav("/tests")}
        className="rounded-full px-4 py-2 bg-orange-500 text-white shadow hover:bg-orange-600"
      >
        Poser une question à l’IA
      </button>
    </div>
  );
}
