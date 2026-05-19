import { useEffect, useState } from "react";
import api from "../api/axios";
import BookCard from "../components/BookCard";
import BookRowCard from "../components/BookRowCard";
import Hero from "../components/Hero";
import NewsCard from "../components/NewsCard";
import SectionHeader from "../components/SectionHeader";
import { categories } from "../data/categories";
import { ArrowRight, BookMarked } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    Promise.all([api.get("/books"), api.get("/news")]).then(([booksRes, newsRes]) => {
      setBooks(booksRes.data);
      setNews(newsRes.data);
    });
  }, []);

  return (
    <>
      <Hero />
      <section className="container-page py-14">
        <SectionHeader title="Eng ko'p o'qilgan kitoblar" />
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
          {books.filter((book) => book.isPopular).slice(0, 5).map((book) => <BookCard key={book.id} book={book} />)}
        </div>
      </section>
      <section className="bg-[#f8f8f8] py-14">
        <div className="container-page">
          <SectionHeader title="Yangi qo'shilgan kitoblar" />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {books.filter((book) => book.isNew).slice(0, 8).map((book) => <BookRowCard key={book.id} book={book} />)}
          </div>
        </div>
      </section>
      <section className="container-page py-14">
        <SectionHeader title="Tavsiya etilgan kitoblar" />
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {books.slice(4, 12).map((book) => <BookCard key={book.id} book={book} />)}
        </div>
      </section>
      <section className="bg-[#f8f8f8] py-14">
        <div className="container-page">
          <SectionHeader title="Janrlar katalogi" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link key={category} to={`/books?category=${encodeURIComponent(category)}`} className="card flex items-center justify-between p-6">
                <span className="flex items-center gap-3 text-lg font-bold"><BookMarked className="h-6 w-6 text-brand-orange" /> {category}</span>
                <ArrowRight className="h-5 w-5 text-brand-orange" />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="container-page py-14">
        <SectionHeader title="So'nggi yangiliklar" to="/news" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {news.slice(0, 4).map((item) => <NewsCard key={item.id} item={item} />)}
        </div>
      </section>
    </>
  );
}
