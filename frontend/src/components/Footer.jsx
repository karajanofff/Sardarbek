import { BookOpen, Headphones, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-100 bg-[#f8f8f8] py-10">
      <div className="container-page grid gap-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-black">Sardor-<span className="text-brand-orange">Ekitob.uz</span></h2>
          <p className="mt-3 max-w-md text-brand-muted">Elektron va audio kitoblarni topish, xarid qilish va o'qish uchun zamonaviy platforma.</p>
        </div>
        <div>
          <h3 className="font-bold">Bo'limlar</h3>
          <div className="mt-3 space-y-2 text-brand-muted">
            <Link className="block hover:text-brand-orange" to="/books">Kitoblar</Link>
            <Link className="block hover:text-brand-orange" to="/news">Yangiliklar</Link>
            <Link className="block hover:text-brand-orange" to="/cart">Savat</Link>
          </div>
        </div>
        <div>
          <h3 className="font-bold">Aloqa</h3>
          <div className="mt-3 space-y-2 text-brand-muted">
            <p className="flex gap-2"><Mail className="h-5 w-5 text-brand-orange" /> Sardarbek707@gmail.com</p>
            <p className="flex gap-2"><BookOpen className="h-5 w-5 text-brand-orange" /> E-book</p>
            <p className="flex gap-2"><Headphones className="h-5 w-5 text-brand-orange" /> Audio</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
