import { BarChart3, BookOpen, Home, ShoppingBag, Users } from "lucide-react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/admin", label: "Dashboard", icon: BarChart3 },
  { to: "/admin/books", label: "Kitoblar", icon: BookOpen },
  { to: "/admin/orders", label: "Buyurtmalar", icon: ShoppingBag },
  { to: "/admin/users", label: "Foydalanuvchilar", icon: Users },
  { to: "/", label: "Saytga qaytish", icon: Home }
];

export default function AdminSidebar() {
  return (
    <aside className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm lg:min-h-[calc(100vh-130px)]">
      <h2 className="mb-5 px-3 text-xl font-black">Admin<span className="text-brand-orange">Panel</span></h2>
      <nav className="grid gap-2">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} end={to === "/admin"} to={to} className={({ isActive }) => `flex items-center gap-3 rounded-2xl px-4 py-3 font-semibold ${isActive ? "bg-brand-orange text-white" : "text-gray-700 hover:bg-brand-soft hover:text-brand-orange"}`}>
            <Icon className="h-5 w-5" /> {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
