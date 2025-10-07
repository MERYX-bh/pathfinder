import { Link } from "react-router-dom";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">🅿️</div>
          <div className="font-semibold">PathFinder</div>
          <span className="ml-2 text-xs text-gray-500">Orientation professionnelle</span>
        </Link>
        <div className="text-sm text-gray-600">meriem • En activité</div>
      </div>
    </header>
  );
}
