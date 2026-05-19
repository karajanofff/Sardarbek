import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function SectionHeader({ title, to = "/books" }) {
  return (
    <div className="mb-6 flex items-center justify-between gap-4">
      <h2 className="text-2xl font-extrabold text-brand-ink md:text-3xl">
        {title.split(" ")[0]} <span className="text-brand-orange">{title.split(" ").slice(1).join(" ")}</span>
      </h2>
      <Link to={to} className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-4 py-2 font-semibold text-brand-orange">
        Barchasi <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
