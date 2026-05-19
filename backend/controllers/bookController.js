import { nextId, readJSON, writeJSON } from "../utils/fileDB.js";

export async function getBooks(req, res) {
  try {
    const { search, category, minPrice, maxPrice, sort } = req.query;
    let books = await readJSON("books.json");

    if (search) {
      const q = search.toLowerCase();
      books = books.filter((book) =>
        [book.title, book.author, book.category].some((field) => field.toLowerCase().includes(q))
      );
    }
    if (category && category !== "all") {
      books = books.filter((book) => book.category === category);
    }
    if (minPrice) books = books.filter((book) => book.price >= Number(minPrice));
    if (maxPrice) books = books.filter((book) => book.price <= Number(maxPrice));
    if (sort === "rating") books.sort((a, b) => b.rating - a.rating);
    if (sort === "price-low") books.sort((a, b) => a.price - b.price);
    if (sort === "price-high") books.sort((a, b) => b.price - a.price);

    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Kitoblarni olishda xatolik", error: error.message });
  }
}

export async function getBookById(req, res) {
  const books = await readJSON("books.json");
  const book = books.find((item) => item.id === req.params.id);
  if (!book) return res.status(404).json({ message: "Kitob topilmadi" });
  res.json(book);
}

export async function createBook(req, res) {
  const books = await readJSON("books.json");
  const book = { id: nextId(books), ...req.body };
  books.push(book);
  await writeJSON("books.json", books);
  res.status(201).json(book);
}

export async function updateBook(req, res) {
  const books = await readJSON("books.json");
  const index = books.findIndex((book) => book.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: "Kitob topilmadi" });
  books[index] = { ...books[index], ...req.body, id: req.params.id };
  await writeJSON("books.json", books);
  res.json(books[index]);
}

export async function deleteBook(req, res) {
  const books = await readJSON("books.json");
  const nextBooks = books.filter((book) => book.id !== req.params.id);
  if (nextBooks.length === books.length) return res.status(404).json({ message: "Kitob topilmadi" });
  await writeJSON("books.json", nextBooks);
  res.json({ message: "Kitob o'chirildi" });
}
