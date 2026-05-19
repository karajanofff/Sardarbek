import { BookOpen, Headphones, Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function BookRowCard({ book }) {
  return (
    <Link to={`/books/${book.id}`} className="card flex gap-4 p-3">
      <img src={book.image} alt={book.title} className="h-28 w-20 rounded-xl object-cover" />
      <div className="min-w-0 flex-1 py-1">
        <h3 className="line-clamp-2 font-bold text-brand-ink">{book.title}</h3>
        <p className="mt-1 text-sm text-brand-muted">{book.author}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="inline-flex items-center gap-1 text-sm font-semibold">
            <Star className="h-4 w-4 fill-brand-orange text-brand-orange" /> {book.rating}
          </span>
          <span className="flex gap-2 text-brand-orange">
            {book.format.includes("Elektron") && <BookOpen className="h-4 w-4" />}
            {book.format.includes("Audio") && <Headphones className="h-4 w-4" />}
          </span>
        </div>
        <p className="mt-2 font-bold">{book.price.toLocaleString()} so'm</p>
      </div>
    </Link>
  );
}
