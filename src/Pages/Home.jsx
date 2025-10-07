import { Link } from "react-router-dom";
import Card from "../components/ui/Card.jsx";

export default function Home() {
  return (
    <div className="space-y-10">
      <div className="text-center">
        <h1 className="text-3xl font-semibold">Découvrez votre voie professionnelle</h1>
        <p className="mt-3 text-gray-600">
          Explorez les métiers, passez nos tests d’orientation ou demandez conseil à notre assistant IA.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-center">Tests d’orientation professionnelle</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <div className="flex items-start gap-3">
              <div className="text-2xl">🧠</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">Test complet</h3>
                  <span className="text-xs rounded bg-blue-50 text-blue-700 px-2 py-0.5">Recommandé</span>
                </div>
                <ul className="mt-2 text-sm text-gray-600 list-disc pl-4">
                  <li>20 questions</li>
                  <li>Profil personnalité</li>
                  <li>Recommandations personnalisées</li>
                </ul>
                <Link to="/tests" className="inline-block mt-4 rounded-xl px-4 py-2 bg-orange-500 text-white hover:bg-orange-600">
                  Commencer le test complet
                </Link>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start gap-3">
              <div className="text-2xl">⚡</div>
              <div className="flex-1">
                <h3 className="font-semibold">Test rapide</h3>
                <ul className="mt-2 text-sm text-gray-600 list-disc pl-4">
                  <li>10 questions ciblées</li>
                  <li>Suggestions de métiers</li>
                  <li>Analyse forces/faiblesses</li>
                </ul>
                <Link to="/tests" className="inline-block mt-4 rounded-xl px-4 py-2 border border-orange-300 text-orange-600 hover:bg-orange-50">
                  Test rapide
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
