import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: user?.name || "", phone: "", address: "", paymentType: "Naqd" });
  const [message, setMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/orders", {
      items: items.map(({ id, title, price, quantity, image }) => ({ id, title, price, quantity, image })),
      customer: { name: form.name, phone: form.phone, address: form.address },
      paymentType: form.paymentType,
      total
    });
    clearCart();
    setMessage("Buyurtma muvaffaqiyatli tasdiqlandi");
    setTimeout(() => navigate("/profile"), 900);
  };

  if (!items.length) return <div className="container-page py-20 text-center">Savat bo'sh. Avval kitob tanlang.</div>;

  return (
    <section className="container-page py-10">
      <h1 className="text-4xl font-black">Buyurtmani <span className="text-brand-orange">rasmiylashtirish</span></h1>
      <form onSubmit={submit} className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="card space-y-4 p-6">
          <input className="input" required placeholder="Ism" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="input" required placeholder="Telefon" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <textarea className="input min-h-32" required placeholder="Manzil" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          <select className="input" value={form.paymentType} onChange={(e) => setForm({ ...form, paymentType: e.target.value })}>
            <option>Naqd</option>
            <option>Karta</option>
            <option>Click demo</option>
            <option>Payme demo</option>
          </select>
          {message && <p className="rounded-2xl bg-green-50 p-4 font-semibold text-green-700">{message}</p>}
        </div>
        <aside className="h-fit rounded-3xl bg-[#f8f8f8] p-6">
          <h2 className="text-2xl font-black">To'lov</h2>
          <p className="mt-4 text-brand-muted">{items.length} xil kitob</p>
          <p className="mt-2 text-3xl font-black text-brand-orange">{total.toLocaleString()} so'm</p>
          <button className="btn-primary mt-6 w-full">Buyurtmani tasdiqlash</button>
        </aside>
      </form>
    </section>
  );
}
