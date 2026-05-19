import { useEffect, useState } from "react";
import api from "../api/axios";
import AdminSidebar from "../components/AdminSidebar";
import { categories } from "../data/categories";

const emptyBook = {
  title: "",
  author: "",
  price: 0,
  category: categories[0],
  description: "",
  image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80",
  stock: 1,
  rating: 4.5,
  format: ["Elektron"],
  isPopular: false,
  isNew: true
};

export default function AdminBooks() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState(emptyBook);
  const [editing, setEditing] = useState(null);

  const load = () => api.get("/books").then(({ data }) => setBooks(data));
  useEffect(() => { load(); }, []);

  const save = async (e) => {
    e.preventDefault();
    const payload = { ...form, price: Number(form.price), stock: Number(form.stock), rating: Number(form.rating) };
    if (editing) await api.put(`/books/${editing}`, payload);
    else await api.post("/books", payload);
    setForm(emptyBook);
    setEditing(null);
    load();
  };

  const edit = (book) => {
    setForm(book);
    setEditing(book.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const remove = async (id) => {
    await api.delete(`/books/${id}`);
    load();
  };

  return (
    <section className="container-page grid gap-6 py-10 lg:grid-cols-[260px_1fr]">
      <AdminSidebar />
      <div>
        <h1 className="text-4xl font-black">Kitoblar</h1>
        <form onSubmit={save} className="mt-6 grid gap-4 rounded-[28px] bg-[#f8f8f8] p-6 md:grid-cols-2">
          <input className="input" placeholder="Kitob nomi" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <input className="input" placeholder="Muallif" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} required />
          <input className="input" type="number" placeholder="Narx" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
          <select className="input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>{categories.map((c) => <option key={c}>{c}</option>)}</select>
          <input className="input" placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} required />
          <input className="input" type="number" step="0.1" placeholder="Rating" value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })} />
          <input className="input" type="number" placeholder="Stock" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
          <div className="flex flex-wrap items-center gap-4 rounded-2xl bg-white px-4">
            <label><input type="checkbox" checked={form.isPopular} onChange={(e) => setForm({ ...form, isPopular: e.target.checked })} /> Popular</label>
            <label><input type="checkbox" checked={form.isNew} onChange={(e) => setForm({ ...form, isNew: e.target.checked })} /> New</label>
            <label><input type="checkbox" checked={form.format.includes("Audio")} onChange={(e) => setForm({ ...form, format: e.target.checked ? ["Elektron", "Audio"] : ["Elektron"] })} /> Audio</label>
          </div>
          <textarea className="input md:col-span-2" placeholder="Tavsif" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
          <button className="btn-primary md:col-span-2">{editing ? "Kitobni saqlash" : "Kitob qo'shish"}</button>
        </form>
        <div className="mt-8 overflow-x-auto rounded-3xl border border-gray-100 bg-white">
          <table className="w-full min-w-[760px] text-left">
            <thead className="bg-gray-50">
              <tr><th className="p-4">Kitob</th><th>Narx</th><th>Kategoriya</th><th>Stock</th><th>Amallar</th></tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id} className="border-t border-gray-100">
                  <td className="p-4 font-bold">{book.title}<p className="text-sm font-normal text-brand-muted">{book.author}</p></td>
                  <td>{book.price.toLocaleString()}</td>
                  <td>{book.category}</td>
                  <td>{book.stock}</td>
                  <td className="space-x-2">
                    <button onClick={() => edit(book)} className="rounded-xl bg-brand-soft px-3 py-2 font-bold text-brand-orange">Tahrirlash</button>
                    <button onClick={() => remove(book.id)} className="rounded-xl bg-red-50 px-3 py-2 font-bold text-red-600">O'chirish</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
