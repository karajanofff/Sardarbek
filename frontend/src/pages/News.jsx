import { useEffect, useState } from "react";
import api from "../api/axios";
import NewsCard from "../components/NewsCard";

export default function News() {
  const [news, setNews] = useState([]);
  useEffect(() => { api.get("/news").then(({ data }) => setNews(data)); }, []);

  return (
    <section className="container-page py-10">
      <p className="text-sm font-semibold text-brand-muted">Asosiy sahifa &gt; So'nggi yangiliklar</p>
      <h1 className="mt-4 text-4xl font-black md:text-5xl">So'nggi <span className="text-brand-orange">yangiliklar</span></h1>
      <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
        {news.map((item) => <NewsCard key={item.id} item={item} />)}
      </div>
    </section>
  );
}
