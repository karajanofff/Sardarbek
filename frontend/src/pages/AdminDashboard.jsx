import { useEffect, useState } from "react";
import api from "../api/axios";
import AdminSidebar from "../components/AdminSidebar";
import { BookOpen, ShoppingBag, TrendingUp, Users } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  useEffect(() => { api.get("/admin/stats").then(({ data }) => setStats(data)); }, []);

  const cards = [
    { label: "Jami kitoblar", value: stats?.totalBooks || 0, icon: BookOpen },
    { label: "Jami buyurtmalar", value: stats?.totalOrders || 0, icon: ShoppingBag },
    { label: "Jami foydalanuvchilar", value: stats?.totalUsers || 0, icon: Users },
    { label: "Umumiy savdo summasi", value: `${Number(stats?.totalSales || 0).toLocaleString()} so'm`, icon: TrendingUp }
  ];

  return (
    <section className="container-page grid gap-6 py-10 lg:grid-cols-[260px_1fr]">
      <AdminSidebar />
      <div>
        <h1 className="text-4xl font-black">Dashboard</h1>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {cards.map(({ label, value, icon: Icon }) => (
            <div key={label} className="card p-6">
              <Icon className="h-8 w-8 text-brand-orange" />
              <p className="mt-4 text-sm font-semibold text-brand-muted">{label}</p>
              <h3 className="mt-2 text-2xl font-black">{value}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
