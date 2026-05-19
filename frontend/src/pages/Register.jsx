import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await register(form);
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.message || "Ro'yxatdan o'tishda xatolik");
    }
  };

  return (
    <section className="container-page grid min-h-[70vh] place-items-center py-10">
      <form onSubmit={submit} className="w-full max-w-md rounded-[28px] border border-gray-100 bg-white p-8 shadow-soft">
        <h1 className="text-3xl font-black">Register</h1>
        <p className="mt-2 text-brand-muted">Yangi hisob yarating.</p>
        <div className="mt-6 space-y-4">
          <input className="input" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input className="input" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <input className="input" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          {error && <p className="rounded-2xl bg-red-50 p-3 text-sm font-semibold text-red-600">{error}</p>}
          <button className="btn-primary w-full">Ro'yxatdan o'tish</button>
        </div>
        <p className="mt-5 text-center text-sm text-brand-muted">
          Hisobingiz bormi? <Link to="/login" className="font-bold text-brand-orange">Login</Link>
        </p>
      </form>
    </section>
  );
}
