// src/Pages/auth/PremiumSignup.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5">
      <path d="M12 2l2.1 5.4L20 9.1l-5 2 .9 5.4L12 14.8 8.1 16.5 9 11.1 4 9.1l5.9-1.7L12 2Z" fill="currentColor"/>
    </svg>
  );
}
function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5">
      <path d="M20 4H4a2 2 0 0 0-2 2v.4l10 6.25L22 6.4V6a2 2 0 0 0-2-2Zm0 4.15-8 5-8-5V18a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.15Z" fill="currentColor"/>
    </svg>
  );
}
function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5">
      <path d="M17 10h-1V8a4 4 0 1 0-8 0v2H7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2Zm-7-2a2 2 0 1 1 4 0v2h-4V8Z" fill="currentColor"/>
    </svg>
  );
}

export default function PremiumSignup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function onSubmit(e) {
    e.preventDefault();
    setError(null);

    // validations simples
    if (!form.name.trim()) return setError("Le prénom et nom est requis.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return setError("Email invalide.");
    if (form.password.length < 8) return setError("Le mot de passe doit contenir au moins 8 caractères.");
    if (form.password !== form.confirm) return setError("Les mots de passe ne correspondent pas.");

    setLoading(true);

    // 👉 Appelle ton backend ici puis redirige vers la page de paiement
    setTimeout(() => {
      try { localStorage.setItem("auth.pendingEmail", form.email); } catch {}
      setLoading(false);
      navigate("/paiement");
    }, 600);
  }

  return (
    <div className="min-h-screen relative">
      {/* fond très doux */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(1200px_600px_at_50%_-100px,rgba(255,173,138,0.18),transparent),radial-gradient(900px_500px_at_80%_120%,rgba(106,117,255,0.17),transparent)]" />

      <header className="h-12 flex items-center justify-between max-w-3xl mx-auto px-4">
        <Link to="/tests/complet/resultats" className="text-sm text-gray-700 hover:text-gray-900">
          ← Retour aux résultats
        </Link>
      </header>

      <main className="max-w-3xl mx-auto px-4 pb-16">
        <div className="mt-2 grid place-items-center">
          <div className="h-12 w-12 rounded-xl bg-indigo-600/90 grid place-items-center text-white shadow-sm">
            <SparkIcon />
          </div>
          <h1 className="mt-3 text-xl md:text-2xl font-semibold text-center">Crée ton compte</h1>
          <p className="mt-1 text-sm text-gray-600 text-center">
            Dernière étape avant d'accéder au Premium 🚀
          </p>
        </div>

        {/* Ce que tu vas débloquer */}
        <section className="mx-auto mt-6 max-w-2xl rounded-2xl bg-indigo-50 ring-1 ring-indigo-200 p-5">
          <div className="flex items-center gap-2 text-indigo-900 font-medium">
            <SparkIcon /> <span>Ce que tu vas débloquer</span>
          </div>
          <ul className="mt-3 space-y-2 text-sm text-indigo-900">
            <li className="flex items-start gap-2">⦿ Tous les métiers recommandés (sans limite)</li>
            <li className="flex items-start gap-2">⦿ Parcours détaillés et statistiques</li>
            <li className="flex items-start gap-2">⦿ Accès à vie pour 300€ (paiement unique)</li>
          </ul>
        </section>

        {/* Formulaire */}
        <section className="mx-auto mt-6 max-w-2xl rounded-2xl bg-white ring-1 ring-gray-200 p-5 md:p-6">
          <h2 className="font-medium">Tes informations</h2>
          <p className="mt-1 text-sm text-gray-600">
            Crée ton compte avant de procéder au paiement
          </p>

          {error && (
            <div className="mt-4 rounded-lg bg-rose-50 ring-1 ring-rose-200 text-rose-800 px-3 py-2 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="mt-4 space-y-4">
            {/* Nom */}
            <label className="block text-sm font-medium text-gray-800">
              Prénom et nom
              <div className="mt-1 flex items-center gap-2 rounded-xl border border-gray-200 focus-within:ring-2 focus-within:ring-indigo-500/30">
                <span className="pl-3 text-gray-400">
                  <svg viewBox="0 0 24 24" className="h-5 w-5">
                    <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.33 0-8 1.91-8 4.25V21h16v-2.75C20 15.91 16.33 14 12 14Z" fill="currentColor"/>
                  </svg>
                </span>
                <input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  placeholder="Jean Dupont"
                  className="w-full rounded-xl border-0 px-3 py-2.5 outline-none"
                  autoComplete="name"
                />
              </div>
            </label>

            {/* Email */}
            <label className="block text-sm font-medium text-gray-800">
              Email
              <div className="mt-1 flex items-center gap-2 rounded-xl border border-gray-200 focus-within:ring-2 focus-within:ring-indigo-500/30">
                <span className="pl-3 text-gray-400"><MailIcon /></span>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="ton@email.com"
                  className="w-full rounded-xl border-0 px-3 py-2.5 outline-none"
                  autoComplete="email"
                />
              </div>
            </label>

            {/* Password */}
            <label className="block text-sm font-medium text-gray-800">
              Mot de passe
              <div className="mt-1 flex items-center gap-2 rounded-xl border border-gray-200 focus-within:ring-2 focus-within:ring-indigo-500/30">
                <span className="pl-3 text-gray-400"><LockIcon /></span>
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={onChange}
                  placeholder="Minimum 8 caractères"
                  className="w-full rounded-xl border-0 px-3 py-2.5 outline-none"
                  autoComplete="new-password"
                />
              </div>
            </label>

            {/* Confirm */}
            <label className="block text-sm font-medium text-gray-800">
              Confirmer le mot de passe
              <div className="mt-1 flex items-center gap-2 rounded-xl border border-gray-200 focus-within:ring-2 focus-within:ring-indigo-500/30">
                <span className="pl-3 text-gray-400"><LockIcon /></span>
                <input
                  name="confirm"
                  type="password"
                  value={form.confirm}
                  onChange={onChange}
                  placeholder="Confirme ton mot de passe"
                  className="w-full rounded-xl border-0 px-3 py-2.5 outline-none"
                  autoComplete="new-password"
                />
              </div>
            </label>

            {/* CTA */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 inline-flex items-center justify-center rounded-xl bg-orange-500 px-4 py-3 text-white font-medium hover:bg-orange-600 disabled:opacity-60"
            >
              <span className="mr-2">
                <SparkIcon />
              </span>
              {loading ? "Création du compte..." : "Créer mon compte et accéder à mes résultats"}
            </button>

            <p className="text-center text-xs text-gray-500">
              En créant un compte, tu acceptes nos conditions d'utilisation
            </p>
          </form>
        </section>
      </main>
    </div>
  );
}
