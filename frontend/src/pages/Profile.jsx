import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders/my").then(({ data }) => setOrders(data));
  }, []);

  return (
    <section className="container-page py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black">Mening <span className="text-brand-orange">profilim</span></h1>
          <p className="mt-2 text-brand-muted">{user?.name} - {user?.email}</p>
        </div>
        <button onClick={logout} className="btn-outline">Logout</button>
      </div>
      <div className="mt-8 rounded-[28px] bg-[#f8f8f8] p-6">
        <h2 className="text-2xl font-black">Mening buyurtmalarim</h2>
        <div className="mt-5 space-y-4">
          {orders.length === 0 && <p className="text-brand-muted">Buyurtmalar hozircha yo'q.</p>}
          {orders.map((order) => (
            <div key={order.id} className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex flex-wrap justify-between gap-3">
                <b>Buyurtma #{order.id}</b>
                <span className="rounded-full bg-brand-soft px-3 py-1 text-sm font-bold text-brand-orange">{order.status}</span>
              </div>
              <p className="mt-2 text-brand-muted">{new Date(order.createdAt).toLocaleString()}</p>
              <p className="mt-2 font-bold">{Number(order.total).toLocaleString()} so'm</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
