// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Topbar from "./layout/Topbar.jsx";
import AssistantWidget from "./layout/AssistantWidget.jsx";
import Home from "./Pages/Home.jsx";
import OnboardingStep1 from "./Pages/OnboardingStep1.jsx"; 
import QuickTest from "./Pages/tests/QuickTest.jsx";
import FullTest from "./Pages/tests/FullTest.jsx";
import AnalyzePersonality from "./Pages/tests/AnalyzePersonality.jsx";
import Completion from "./Pages/tests/Completion.jsx";
import ResultsPage from "./Pages/tests/Results.jsx";
import RecommendedJobs from "./Pages/tests/RecommendedJobs.jsx";
import Formations from "./Pages/tests/Formations.jsx";

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
          <Route path="/tests/complet" element={<FullTest />} />
          <Route path="/tests/complet/analyse" element={<AnalyzePersonality />} />
          <Route path="/tests/complet/fin" element={<Completion />} />
          <Route path="/tests/complet/resultats" element={<ResultsPage />} />
          <Route path="/metiers" element={<RecommendedJobs />} />
          <Route path="/formations" element={<Formations />} />

        </Routes>
      </main>
      <AssistantWidget />
    </div>
  );
}
