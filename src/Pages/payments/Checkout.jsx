import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/* ==== petites icônes inline ==== */
function Crown() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7">
      <path d="M3 7l4 3 5-6 5 6 4-3v10H3V7Z" fill="currentColor" />
    </svg>
  );
}
function Info() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4">
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity=".1" />
      <path d="M12 7.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm-1.25 4H12v5h1.25v1.25H10.75V11.5Z" fill="currentColor" />
    </svg>
  );
}
function Lock() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5">
      <path d="M17 10h-1V8a4 4 0 1 0-8 0v2H7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2Zm-7-2a2 2 0 1 1 4 0v2h-4V8Z" fill="currentColor"/>
    </svg>
  );
}
function CardIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5">
      <rect x="3" y="5" width="18" height="14" rx="2" fill="currentColor" opacity=".15"/>
      <rect x="3" y="8" width="18" height="3" fill="currentColor"/>
    </svg>
  );
}

export default function Checkout() {
  const navigate = useNavigate();

  // préremplissage de l’email depuis l’étape précédente si dispo
  const [email, setEmail] = useState("");
  useEffect(() => {
    const e = localStorage.getItem("auth.pendingEmail");
    if (e) setEmail(e);
  }, []);

  const [holder, setHolder] = useState("");
  const [number, setNumber] = useState("");
  const [exp, setExp] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState(null);
  const [paying, setPaying] = useState(false);

  // helpers validation très simples (démo)
  function validEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }
  function validCard(v) {
    const digits = v.replace(/\s+/g, "");
    return /^\d{16}$/.test(digits);
  }
  function validExp(v) {
    // format MM/AA et date future
    if (!/^\d{2}\/\d{2}$/.test(v)) return false;
    const [mmS, yyS] = v.split("/");
    const mm = parseInt(mmS, 10);
    const yy = parseInt(yyS, 10);
    if (mm < 1 || mm > 12) return false;
    const now = new Date();
    const year = now.getFullYear() % 100;
    const month = now.getMonth() + 1;
    return yy > year || (yy === year && mm >= month);
  }
  function validCVV(v) {
    return /^\d{3,4}$/.test(v);
  }

  function onPay(e) {
    e.preventDefault();
    setError(null);

    if (!validEmail(email)) return setError("Email invalide.");
    if (!holder.trim()) return setError("Le nom sur la carte est requis.");
    if (!validCard(number)) return setError("Numéro de carte invalide (16 chiffres).");
    if (!validExp(exp)) return setError("Date d’expiration invalide (MM/AA).");
    if (!validCVV(cvv)) return setError("CVV invalide (3 ou 4 chiffres).");

    // Simule un paiement + “activation” du Premium
    setPaying(true);
    setTimeout(() => {
      try {
        localStorage.setItem("isPremium", "true");
        localStorage.setItem("premium.email", email);
      } catch {}
      setPaying(false);
      // Redirection vers les résultats (ou une page /merci)
      navigate("/tests/complet/resultats");
    }, 1000);
  }

  // format auto pour le n° de carte
  function formatCard(val) {
    return val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  }
  function formatExp(val) {
    const d = val.replace(/\D/g, "").slice(0, 4);
    if (d.length <= 2) return d;
    return d.slice(0, 2) + "/" + d.slice(2);
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Topbar */}
      <header className="h-12 flex items-center justify-between max-w-4xl mx-auto px-4">
        <Link to="/premium" className="text-sm text-gray-700 hover:text-gray-900">← Retour</Link>
        <div className="text-lg font-semibold text-orange-600">Finaliser le paiement</div>
        <div />
      </header>

      <main className="max-w-4xl mx-auto px-4 pb-16">
        {/* Encadré produit */}
        <section className="mt-4 rounded-2xl border-2 border-indigo-600/60 bg-indigo-50 p-5 sm:p-6 relative">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-xl bg-indigo-700 text-white grid place-items-center">
              <Crown />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-indigo-900">PathFinder Premium</div>
              <div className="text-sm text-indigo-900/80">Accès à vie à toutes les fonctionnalités premium</div>

              <ul className="mt-4 space-y-2 text-sm text-indigo-900">
                <li>⦿ 5+ métiers supplémentaires recommandés</li>
                <li>⦿ Parcours classique détaillé étape par étape</li>
                <li>⦿ Statistiques du marché et salaires moyens</li>
                <li>⦿ Analyse complète avantages/défis</li>
                <li>⦿ Compte personnel avec historique sauvegardé</li>
              </ul>

              <div className="mt-5 flex items-end justify-between text-indigo-900">
                <div>
                  <div className="text-sm">Total à payer</div>
                  <div className="text-3xl font-semibold">300€</div>
                </div>
                <div className="text-sm text-indigo-900/70">Paiement unique</div>
              </div>

              <div className="mt-4 rounded-lg bg-white/70 ring-1 ring-indigo-200 p-3 text-sm text-indigo-900/90 flex items-start gap-2">
                <span className="text-indigo-700 mt-0.5"><Info /></span>
                <span>Après le paiement, tu créeras ton compte pour accéder à tous les détails de ton orientation</span>
              </div>
            </div>
          </div>
        </section>

        {/* Formulaire paiement */}
        <section className="mt-6 rounded-2xl bg-white ring-1 ring-gray-200 p-5 sm:p-6">
          <div className="flex items-center gap-2 text-gray-800 font-medium">
            <span className="text-orange-500"><CardIcon /></span>
            <span>Informations de paiement</span>
          </div>

          {error && (
            <div className="mt-4 rounded-lg bg-rose-50 ring-1 ring-rose-200 text-rose-800 px-3 py-2 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={onPay} className="mt-4 grid gap-4">
            {/* Email */}
            <label className="block text-sm font-medium text-gray-800">
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ton@email.com"
                className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500/30"
                autoComplete="email"
              />
            </label>

            {/* Nom sur la carte */}
            <label className="block text-sm font-medium text-gray-800">
              Nom sur la carte
              <input
                value={holder}
                onChange={(e) => setHolder(e.target.value)}
                placeholder="Jean Dupont"
                className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500/30"
                autoComplete="cc-name"
              />
            </label>

            {/* Numéro de carte */}
            <label className="block text-sm font-medium text-gray-800">
              Numéro de carte
              <input
                inputMode="numeric"
                value={number}
                onChange={(e) => setNumber(formatCard(e.target.value))}
                placeholder="1234 5678 9012 3456"
                className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500/30"
                autoComplete="cc-number"
              />
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Exp */}
              <label className="block text-sm font-medium text-gray-800">
                Date d’expiration
                <input
                  inputMode="numeric"
                  value={exp}
                  onChange={(e) => setExp(formatExp(e.target.value))}
                  placeholder="MM/AA"
                  className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500/30"
                  autoComplete="cc-exp"
                />
              </label>

              {/* CVV */}
              <label className="block text-sm font-medium text-gray-800">
                CVV
                <input
                  inputMode="numeric"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  placeholder="123"
                  className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500/30"
                  autoComplete="cc-csc"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={paying}
              className="mt-2 inline-flex items-center justify-center rounded-xl bg-indigo-700 text-white py-3 w-full hover:bg-indigo-800 disabled:opacity-60"
            >
              <span className="mr-2"><Lock /></span>
              {paying ? "Traitement en cours..." : "Payer 300€"}
            </button>
          </form>

          <div className="mt-5 rounded-xl bg-green-50 ring-1 ring-green-200 p-4 text-sm text-green-900 flex items-start gap-3">
            <span className="text-green-700"><Lock /></span>
            <div>
              <div className="font-medium">Paiement 100% sécurisé</div>
              <div className="text-green-900/80">
                Vos informations bancaires sont cryptées et sécurisées. Nous n’avons jamais accès à vos données de carte.
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
