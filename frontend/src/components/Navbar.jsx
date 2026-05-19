import { Crown, Gift, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const navItems = [
  { label: "Janrlar", to: "/books" },
  { label: "Loyiha haqida", to: "/" },
  { label: "Yordam", to: "/" },
  { label: "So'nggi yangiliklar", to: "/news" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { user } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    navigate(`/books?search=${encodeURIComponent(query)}`);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="container-page flex h-20 items-center gap-4">
        <Link to="/" className="text-2xl font-black text-brand-ink">
          Sardor-<span className="text-brand-orange">Ekitob.uz</span>
        </Link>
        <nav className="hidden flex-1 items-center justify-center gap-6 lg:flex">
          {navItems.map((item) => (
            <NavLink key={item.label} to={item.to} className={({ isActive }) => `font-semibold ${isActive ? "text-brand-orange" : "text-gray-700 hover:text-brand-orange"}`}>
              {item.label}
            </NavLink>
          ))}
          <Link to="/books" className="inline-flex items-center gap-1 font-semibold text-gray-700 hover:text-brand-orange">
            <Crown className="h-4 w-4 text-brand-orange" /> Premium
          </Link>
          <Link to="/news" className="inline-flex items-center gap-1 font-semibold text-gray-700 hover:text-brand-orange">
            <Gift className="h-4 w-4 text-orange-600" /> Donat
          </Link>
        </nav>
        <form onSubmit={submit} className="ml-auto hidden items-center gap-2 md:flex">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Qidirish"
            className="w-44 rounded-full border border-gray-200 px-4 py-2 outline-none focus:border-brand-orange"
          />
          <button className="rounded-2xl bg-brand-orange p-3 text-white" aria-label="Qidirish">
            <Search className="h-5 w-5" />
          </button>
        </form>
        <button className="hidden rounded-full border border-gray-200 px-4 py-2 font-bold md:block">O'zb</button>
        <Link to="/cart" className="relative rounded-2xl border border-gray-200 p-3 hover:text-brand-orange" aria-label="Savat">
          <ShoppingCart className="h-5 w-5" />
          {count > 0 && <span className="absolute -right-2 -top-2 rounded-full bg-brand-orange px-2 text-xs font-bold text-white">{count}</span>}
        </Link>
        <Link to={user ? "/profile" : "/login"} className="hidden rounded-2xl border border-gray-200 p-3 hover:text-brand-orange md:block" aria-label="Profile">
          <User className="h-5 w-5" />
        </Link>
        <button onClick={() => setOpen(!open)} className="rounded-2xl border border-gray-200 p-3 lg:hidden" aria-label="Menyu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-gray-100 bg-white p-4 lg:hidden">
          <div className="container-page space-y-4">
            <form onSubmit={submit} className="flex gap-2">
              <input className="input" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Qidirish" />
              <button className="rounded-2xl bg-brand-orange px-4 text-white"><Search className="h-5 w-5" /></button>
            </form>
            {[...navItems, { label: "Premium", to: "/books" }, { label: "Donat", to: "/news" }, { label: user ? "Profile" : "Login", to: user ? "/profile" : "/login" }].map((item) => (
              <Link key={item.label} to={item.to} onClick={() => setOpen(false)} className="block rounded-2xl bg-gray-50 px-4 py-3 font-semibold">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
