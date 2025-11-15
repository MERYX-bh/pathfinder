// src/Pages/Auth/Signup.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5">
      <path
        d="M20 4H4a2 2 0 0 0-2 2v.4l10 6.25L22 6.4V6a2 2 0 0 0-2-2Zm0 4.15-8 5-8-5V18a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.15Z"
        fill="currentColor"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5">
      <path
        d="M17 10h-1V8a4 4 0 1 0-8 0v2H7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2Zm-7-2a2 2 0 1 1 4 0v2h-4V8Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Signup() {
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

    // petites validations
    if (!form.name.trim())
      return setError("Le prénom et nom est requis.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return setError("Email invalide.");
    if (form.password.length < 8)
      return setError("Le mot de passe doit contenir au moins 8 caractères.");
    if (form.password !== form.confirm)
      return setError("Les mots de passe ne correspondent pas.");

    setLoading(true);

    // 👉 plus tard : appel à ton backend pour créer le compte
    setTimeout(() => {
      try {
        // on enregistre l'utilisateur "connecté"
        localStorage.setItem("auth.userEmail", form.email);
        localStorage.setItem("auth.userName", form.name);
        // si tu veux marquer qu'il n'est pas premium :
        localStorage.setItem("pf.premium", "0");
      } catch {}

      setLoading(false);
      // après inscription, on commence le parcours
      navigate("/");
    }, 600);
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      {/* Fond gradient comme le login */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(1200px_600px_at_50%_-100px,rgba(255,173,138,0.22),transparent),radial-gradient(900px_500px_at_80%_120%,rgba(255,214,196,0.25),transparent),radial-gradient(900px_500px_at_10%_120%,rgba(202,235,255,0.22),transparent)]" />

      <div className="w-full max-w-xl">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <div className="h-12 w-12 rounded-2xl bg-orange-500/90 grid place-items-center shadow-sm">
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-white">
              <path
                d="M12 3a9 9 0 1 0 9 9 9.01 9.01 0 0 0-9-9Zm0 3.5a1 1 0 0 1 1 1V11h3.5a1 1 0 0 1 0 2H12a1 1 0 0 1-1-1V7.5a1 1 0 0 1 1-1Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h1 className="mt-2 text-lg font-semibold">PathFinder</h1>
          <p className="text-sm text-gray-600 -mt-0.5">
            Trouve ta voie professionnelle
          </p>
        </div>

        {/* Carte d'inscription */}
        <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-200/70 p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="text-lg font-semibold">
              Créer un compte
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Enregistre-toi pour sauvegarder tes résultats et ton profil
            </p>
          </div>

          {error && (
            <div className="mb-4 rounded-lg bg-rose-50 ring-1 ring-rose-200 px-3 py-2 text-sm text-rose-800">
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            {/* Nom */}
            <label className="block text-sm font-medium text-gray-800">
              Prénom et nom
              <div className="mt-1 flex items-center gap-2 rounded-xl border border-gray-200 bg-white focus-within:ring-2 focus-within:ring-orange-500/30">
                <span className="pl-3 text-gray-400">
                  <svg viewBox="0 0 24 24" className="h-5 w-5">
                    <path
                      d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.33 0-8 2-8 4.5V21h16v-2.5C20 16 16.33 14 12 14Z"
                      fill="currentColor"
                    />
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
              <div className="mt-1 flex items-center gap-2 rounded-xl border border-gray-200 bg-white focus-within:ring-2 focus-within:ring-orange-500/30">
                <span className="pl-3 text-gray-400">
                  <MailIcon />
                </span>
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

            {/* Mot de passe */}
            <label className="block text-sm font-medium text-gray-800">
              Mot de passe
              <div className="mt-1 flex items-center gap-2 rounded-xl border border-gray-200 bg-white focus-within:ring-2 focus-within:ring-orange-500/30">
                <span className="pl-3 text-gray-400">
                  <LockIcon />
                </span>
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

            {/* Confirmation */}
            <label className="block text-sm font-medium text-gray-800">
              Confirmer le mot de passe
              <div className="mt-1 flex items-center gap-2 rounded-xl border border-gray-200 bg-white focus-within:ring-2 focus-within:ring-orange-500/30">
                <span className="pl-3 text-gray-400">
                  <LockIcon />
                </span>
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

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 inline-flex items-center justify-center rounded-xl bg-orange-500 px-4 py-3 text-white font-medium hover:bg-orange-600 disabled:opacity-60 transition"
            >
              {loading ? "Création du compte..." : "Créer mon compte"}
            </button>

            <p className="text-center text-xs text-gray-500 mt-2">
              En créant un compte, tu acceptes nos conditions d'utilisation.
            </p>
          </form>

          {/* Lien vers connexion */}
          <p className="mt-4 text-center text-sm text-gray-600">
            Déjà un compte ?{" "}
            <Link to="/auth/login" className="text-orange-600 hover:underline">
              Se connecter
            </Link>
          </p>

          {/* Option Premium en plus */}
          <p className="mt-2 text-center text-xs text-gray-500">
            Tu veux débloquer toutes les fonctionnalités ?{" "}
            <Link
              to="/premium/inscription"
              className="text-indigo-600 hover:underline"
            >
              Découvrir l&apos;offre Premium
            </Link>
          </p>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          PathFinder • Orientation professionnelle intelligente
        </p>
      </div>
    </div>
  );
}
