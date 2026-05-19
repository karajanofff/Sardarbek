import { CalendarDays, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function NewsDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  useEffect(() => { api.get(`/news/${id}`).then(({ data }) => setItem(data)); }, [id]);
  if (!item) return <div className="container-page py-20 text-center">Yuklanmoqda...</div>;

  return (
    <article className="container-page py-10">
      <p className="text-sm font-semibold text-brand-muted">Asosiy sahifa &gt; So'nggi yangiliklar &gt; {item.title}</p>
      <div className="mt-8 overflow-hidden rounded-[28px] bg-white shadow-soft">
        <img src={item.image} alt={item.title} className="h-[420px] w-full object-cover" />
        <div className="p-6 md:p-10">
          <span className="text-sm font-extrabold text-brand-orange">{item.category}</span>
          <h1 className="mt-3 text-4xl font-black">{item.title}</h1>
          <div className="mt-4 flex gap-5 text-brand-muted">
            <span className="flex gap-2"><CalendarDays className="h-5 w-5" /> {item.date}</span>
            <span className="flex gap-2"><Clock className="h-5 w-5" /> {item.time}</span>
          </div>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-brand-muted">{item.content}</p>
        </div>
      </div>
    </article>
  );
}
