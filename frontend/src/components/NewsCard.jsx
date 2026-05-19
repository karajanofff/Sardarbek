import { CalendarDays, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export default function NewsCard({ item }) {
  return (
    <Link to={`/news/${item.id}`} className="card overflow-hidden">
      <div className="aspect-video overflow-hidden bg-gray-100">
        <img src={item.image} alt={item.title} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
      </div>
      <div className="space-y-3 p-5">
        <span className="text-xs font-extrabold uppercase tracking-wide text-brand-orange">{item.category}</span>
        <h3 className="line-clamp-2 text-lg font-extrabold text-brand-ink">{item.title}</h3>
        <p className="line-clamp-2 text-sm leading-6 text-brand-muted">{item.description}</p>
        <div className="flex gap-4 text-sm text-gray-500">
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="h-4 w-4" /> {item.date}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-4 w-4" /> {item.time}
          </span>
        </div>
      </div>
    </Link>
  );
}
