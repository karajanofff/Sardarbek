import { nextId, readJSON, writeJSON } from "../utils/fileDB.js";

export async function getNews(req, res) {
  const news = await readJSON("news.json");
  res.json(news);
}

export async function getNewsById(req, res) {
  const news = await readJSON("news.json");
  const item = news.find((entry) => entry.id === req.params.id);
  if (!item) return res.status(404).json({ message: "Yangilik topilmadi" });
  res.json(item);
}

export async function createNews(req, res) {
  const news = await readJSON("news.json");
  const item = { id: nextId(news), ...req.body };
  news.unshift(item);
  await writeJSON("news.json", news);
  res.status(201).json(item);
}

export async function updateNews(req, res) {
  const news = await readJSON("news.json");
  const index = news.findIndex((entry) => entry.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: "Yangilik topilmadi" });
  news[index] = { ...news[index], ...req.body, id: req.params.id };
  await writeJSON("news.json", news);
  res.json(news[index]);
}

export async function deleteNews(req, res) {
  const news = await readJSON("news.json");
  const nextNews = news.filter((entry) => entry.id !== req.params.id);
  if (nextNews.length === news.length) return res.status(404).json({ message: "Yangilik topilmadi" });
  await writeJSON("news.json", nextNews);
  res.json({ message: "Yangilik o'chirildi" });
}
