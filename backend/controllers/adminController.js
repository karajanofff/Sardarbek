import { readJSON } from "../utils/fileDB.js";

export async function getStats(req, res) {
  const [books, orders, users] = await Promise.all([
    readJSON("books.json"),
    readJSON("orders.json"),
    readJSON("users.json")
  ]);
  const totalSales = orders.reduce((sum, order) => sum + Number(order.total || 0), 0);
  res.json({
    totalBooks: books.length,
    totalOrders: orders.length,
    totalUsers: users.length,
    totalSales
  });
}

export async function getUsers(req, res) {
  const users = await readJSON("users.json");
  res.json(users.map(({ password, ...user }) => user));
}
