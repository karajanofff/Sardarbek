import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/axios";
import BookCard from "../components/BookCard";
import CategoryDropdown from "../components/CategoryDropdown";
import SearchBar from "../components/SearchBar";

export default function Books() {
  const [searchParams] = useSearchParams();
  const [books, setBooks] = useState([]);
  const [visible, setVisible] = useState(12);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "all");
  const [price, setPrice] = useState("all");
  const [sort, setSort] = useState("rating");

  useEffect(() => {
    api.get("/books").then(({ data }) => setBooks(data));
  }, []);

  const filtered = useMemo(() => {
    return books
      .filter((book) => [book.title, book.author, book.category].join(" ").toLowerCase().includes(search.toLowerCase()))
      .filter((book) => category === "all" || book.category === category)
      .filter((book) => price === "all" || (price === "low" ? book.price <= 40000 : book.price > 40000))
      .sort((a, b) => (sort === "rating" ? b.rating - a.rating : sort === "price-low" ? a.price - b.price : b.price - a.price));
  }, [books, search, category, price, sort]);

  return (
    <section className="container-page py-10">
      <p className="text-sm font-semibold text-brand-muted">Asosiy sahifa &gt; Kitoblar</p>
      <h1 className="mt-4 text-4xl font-black md:text-5xl">Kitoblar</h1>
      <div className="mt-8 grid gap-4 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <SearchBar value={search} onChange={setSearch} />
        <CategoryDropdown value={category} onChange={setCategory} />
        <select className="input" value={price} onChange={(e) => setPrice(e.target.value)}>
          <option value="all">Barcha narxlar</option>
          <option value="low">40 000 so'mgacha</option>
          <option value="high">40 000 so'mdan yuqori</option>
        </select>
        <select className="input" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="rating">Rating bo'yicha</option>
          <option value="price-low">Arzondan qimmatga</option>
          <option value="price-high">Qimmatdan arzonga</option>
        </select>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filtered.slice(0, visible).map((book) => <BookCard key={book.id} book={book} />)}
      </div>
      {visible < filtered.length && (
        <div className="mt-10 text-center">
          <button onClick={() => setVisible((v) => v + 8)} className="btn-primary">Ko'proq ko'rsatish</button>
        </div>
      )}
    </section>
  );
}
