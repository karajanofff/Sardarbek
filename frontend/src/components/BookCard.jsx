import { BookOpen, Headphones, ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function BookCard({ book }) {
  const { addToCart } = useCart();

  return (
    <div className="card group overflow-hidden">
      <Link to={`/books/${book.id}`} className="block">
        <div className="aspect-[3/4.5] overflow-hidden bg-gray-100">
          <img src={book.image} alt={book.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        </div>
      </Link>
      <div className="space-y-3 p-4">
        <Link to={`/books/${book.id}`} className="line-clamp-2 min-h-[48px] text-base font-bold text-brand-ink hover:text-brand-orange">
          {book.title}
        </Link>
        <p className="text-sm text-brand-muted">{book.author}</p>
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1 text-sm font-semibold">
            <Star className="h-4 w-4 fill-brand-orange text-brand-orange" /> {book.rating}
          </span>
          <div className="flex gap-2 text-brand-orange">
            {book.format.includes("Elektron") && <BookOpen className="h-4 w-4" />}
            {book.format.includes("Audio") && <Headphones className="h-4 w-4" />}
          </div>
        </div>
        <div className="flex items-center justify-between pt-1">
          <strong>{book.price.toLocaleString()} so'm</strong>
          <button
            type="button"
            onClick={() => addToCart(book)}
            className="rounded-xl bg-brand-orange p-2 text-white transition hover:bg-orange-600"
            aria-label="Savatga qo'shish"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
