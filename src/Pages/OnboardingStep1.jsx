import { useState } from "react";

function InputWithIcon({ label, type = "text", placeholder, value, onChange, Icon }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium">{label}</label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <Icon />
        </span>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full rounded-xl border border-gray-300 pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>
    </div>
  );
}

function SelectWithIcon({ label, value, onChange, children, Icon }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium">{label}</label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <Icon />
        </span>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          {/* caret */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
        <select
          value={value}
          onChange={onChange}
          className="w-full appearance-none rounded-xl border border-gray-300 pl-9 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
        >
          {children}
        </select>
      </div>
    </div>
  );
}

/* ---- Mini-icônes SVG (sans lib externe) ---- */
const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5Z" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);
const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="1.6" />
    <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);
const GlobeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
    <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

export default function OnboardingStep1() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [study, setStudy] = useState("");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!fullName || !email || !study) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    // TODO: persister dans un store / localStorage et naviguer vers l'étape 2
    console.log({ fullName, email, study });
    alert("Étape validée ✅");
  };

  return (
    <div className="min-h-screen bg-[#FAFAFB] text-gray-900">
      {/* Header centré */}
      <div className="max-w-2xl mx-auto px-4 pt-10 text-center">
        <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center text-lg font-semibold text-orange-600">
          P
        </div>
        <h1 className="text-2xl font-semibold">PathFinder</h1>

        <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-orange-50 px-3 py-1 text-sm text-orange-600">
          Étape 1/6
          <span aria-hidden>✨</span>
        </div>

        <p className="mt-4 text-gray-600">
          Créez votre profil pour commencer votre parcours d’orientation personnalisé
        </p>
      </div>

      {/* Carte formulaire */}
      <div className="max-w-2xl mx-auto px-4 mt-6">
        <div className="mx-auto w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-7">
          <h2 className="sr-only">Créer votre compte</h2>
          <form className="space-y-4" onSubmit={submit}>
            <InputWithIcon
              label="Prénom et nom"
              placeholder="Entrez votre nom complet"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              Icon={UserIcon}
            />

            <InputWithIcon
              label="Adresse email"
              type="email"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              Icon={MailIcon}
            />

            <SelectWithIcon
              label="Où en êtes-vous dans vos études ?"
              value={study}
              onChange={(e) => setStudy(e.target.value)}
              Icon={GlobeIcon}
            >
              <option value="">Sélectionnez votre niveau d’études</option>
              <option value="lycee">Lycée</option>
              <option value="licence">Licence</option>
              <option value="master">Master</option>
              <option value="autre">Autre</option>
            </SelectWithIcon>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              className="w-full rounded-xl bg-orange-500 px-4 py-2.5 font-medium text-white shadow-sm hover:bg-orange-600 active:scale-[.99]"
            >
              Commencer l’orientation →
            </button>
          </form>
        </div>

        {/* Mentions & liens */}
        <p className="mt-6 text-center text-sm text-gray-500">
          En créant un compte, vous acceptez nos conditions d’utilisation. Vos données sont protégées et ne seront jamais partagées.
        </p>

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-500">Besoin d’aide ?</p>
          <a className="text-blue-700 underline" href="#">
            Revoir la présentation de PathFinder
          </a>
        </div>

        <div className="mt-4 text-center text-sm text-gray-500">
          Déjà inscrit ?{" "}
          <a className="text-orange-600" href="#">
            Continuer sans compte
          </a>
        </div>
      </div>
    </div>
  );
}
