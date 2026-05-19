import { BookOpen, Headphones, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import BookCard from "../components/BookCard";
import { useCart } from "../context/CartContext";

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [book, setBook] = useState(null);
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    Promise.all([api.get(`/books/${id}`), api.get("/books")]).then(([one, all]) => {
      setBook(one.data);
      setSimilar(all.data.filter((item) => item.category === one.data.category && item.id !== id).slice(0, 4));
    });
  }, [id]);

  if (!book) return <div className="container-page py-20 text-center">Yuklanmoqda...</div>;

  return (
    <section className="container-page py-10">
      <p className="text-sm font-semibold text-brand-muted">Asosiy sahifa &gt; Kitoblar &gt; {book.title}</p>
      <div className="mt-8 grid gap-10 lg:grid-cols-[420px_1fr]">
        <div className="rounded-[28px] bg-[#f8f8f8] p-6">
          <img src={book.image} alt={book.title} className="mx-auto h-[560px] max-h-[70vh] w-full rounded-3xl object-cover shadow-soft" />
        </div>
        <div>
          <span className="rounded-full bg-brand-soft px-4 py-2 text-sm font-bold text-brand-orange">{book.category}</span>
          <h1 className="mt-5 text-4xl font-black md:text-5xl">{book.title}</h1>
          <p className="mt-3 text-xl text-brand-muted">{book.author}</p>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-1 font-bold"><Star className="h-5 w-5 fill-brand-orange text-brand-orange" /> {book.rating}</span>
            <span>Omborda: <b>{book.stock}</b></span>
            {book.format.includes("Elektron") && <span className="inline-flex gap-1 text-brand-orange"><BookOpen /> Elektron kitob</span>}
            {book.format.includes("Audio") && <span className="inline-flex gap-1 text-brand-orange"><Headphones /> Audio kitob</span>}
          </div>
          <p className="mt-8 text-3xl font-black text-brand-orange">{book.price.toLocaleString()} so'm</p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-brand-muted">{book.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={() => addToCart(book)} className="btn-outline">Savatga qo'shish</button>
            <button onClick={() => { addToCart(book); navigate("/checkout"); }} className="btn-primary">Hozir xarid qilish</button>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <h2 className="mb-6 text-3xl font-black">O'xshash <span className="text-brand-orange">kitoblar</span></h2>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {similar.map((item) => <BookCard key={item.id} book={item} />)}
        </div>
      </div>
    </section>
  );
}
