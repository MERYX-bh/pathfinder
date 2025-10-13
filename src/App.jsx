// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Topbar from "./layout/Topbar.jsx";
import AssistantWidget from "./layout/AssistantWidget.jsx";
import Home from "./Pages/Home.jsx";
import OnboardingStep1 from "./Pages/OnboardingStep1.jsx"; 
import QuickTest from "./Pages/tests/QuickTest.jsx";
import Test1 from "./Pages/Test1.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Topbar />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/onboarding/step-1" element={<OnboardingStep1 />} /> {/* <-- ajouté */}
          <Route path="/tests/rapide/:step" element={<QuickTest />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <AssistantWidget />
    </div>
  );
}
