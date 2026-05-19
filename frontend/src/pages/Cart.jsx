import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, total, removeFromCart, updateQuantity } = useCart();

  return (
    <section className="container-page py-10">
      <h1 className="text-4xl font-black">Savatdagi <span className="text-brand-orange">kitoblar</span></h1>
      {items.length === 0 ? (
        <div className="mt-10 rounded-3xl bg-[#f8f8f8] p-10 text-center">
          <p className="text-brand-muted">Savat hozircha bo'sh.</p>
          <Link to="/books" className="btn-primary mt-5">Kitob tanlash</Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="card flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                <img src={item.image} alt={item.title} className="h-32 w-24 rounded-2xl object-cover" />
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-brand-muted">{item.author}</p>
                  <p className="mt-2 font-bold text-brand-orange">{item.price.toLocaleString()} so'm</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="rounded-xl bg-gray-100 p-2" onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus className="h-4 w-4" /></button>
                  <span className="w-10 text-center font-bold">{item.quantity}</span>
                  <button className="rounded-xl bg-gray-100 p-2" onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus className="h-4 w-4" /></button>
                </div>
                <button className="rounded-xl bg-red-50 p-3 text-red-500" onClick={() => removeFromCart(item.id)}><Trash2 className="h-5 w-5" /></button>
              </div>
            ))}
          </div>
          <aside className="h-fit rounded-3xl bg-[#f8f8f8] p-6">
            <h2 className="text-2xl font-black">Umumiy summa</h2>
            <p className="mt-4 text-3xl font-black text-brand-orange">{total.toLocaleString()} so'm</p>
            <Link to="/checkout" className="btn-primary mt-6 w-full">Checkout</Link>
          </aside>
        </div>
      )}
    </section>
  );
}
