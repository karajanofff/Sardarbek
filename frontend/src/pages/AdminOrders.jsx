import { useEffect, useState } from "react";
import api from "../api/axios";
import AdminSidebar from "../components/AdminSidebar";

const statuses = ["yangi", "jarayonda", "yetkazildi", "bekor qilindi"];

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const load = () => api.get("/orders").then(({ data }) => setOrders(data));
  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    await api.put(`/orders/${id}/status`, { status });
    load();
  };

  return (
    <section className="container-page grid gap-6 py-10 lg:grid-cols-[260px_1fr]">
      <AdminSidebar />
      <div>
        <h1 className="text-4xl font-black">Buyurtmalar</h1>
        <div className="mt-8 space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="card p-5">
              <div className="flex flex-wrap justify-between gap-3">
                <div>
                  <b>#{order.id} - {order.customer.name}</b>
                  <p className="text-brand-muted">{order.customer.phone} | {order.customer.address}</p>
                </div>
                <select className="input max-w-52" value={order.status} onChange={(e) => updateStatus(order.id, e.target.value)}>
                  {statuses.map((status) => <option key={status}>{status}</option>)}
                </select>
              </div>
              <p className="mt-3 font-bold text-brand-orange">{Number(order.total).toLocaleString()} so'm</p>
              <p className="mt-2 text-sm text-brand-muted">{order.items.map((item) => `${item.title} x${item.quantity}`).join(", ")}</p>
            </div>
          ))}
          {orders.length === 0 && <p className="text-brand-muted">Buyurtmalar yo'q.</p>}
        </div>
      </div>
    </section>
  );
}
