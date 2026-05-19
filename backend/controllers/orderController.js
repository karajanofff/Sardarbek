import { nextId, readJSON, writeJSON } from "../utils/fileDB.js";

export async function createOrder(req, res) {
  try {
    const { items, customer, paymentType, total } = req.body;
    if (!items?.length || !customer?.name || !customer?.phone || !customer?.address) {
      return res.status(400).json({ message: "Buyurtma ma'lumotlari to'liq emas" });
    }

    const orders = await readJSON("orders.json");
    const order = {
      id: nextId(orders),
      userId: req.user.id,
      items,
      customer,
      paymentType,
      total,
      status: "yangi",
      createdAt: new Date().toISOString()
    };

    orders.push(order);
    await writeJSON("orders.json", orders);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Buyurtma yaratishda xatolik", error: error.message });
  }
}

export async function getOrders(req, res) {
  const orders = await readJSON("orders.json");
  res.json(orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
}

export async function getMyOrders(req, res) {
  const orders = await readJSON("orders.json");
  res.json(orders.filter((order) => order.userId === req.user.id));
}

export async function updateOrderStatus(req, res) {
  const orders = await readJSON("orders.json");
  const order = orders.find((item) => item.id === req.params.id);
  if (!order) return res.status(404).json({ message: "Buyurtma topilmadi" });
  order.status = req.body.status || order.status;
  await writeJSON("orders.json", orders);
  res.json(order);
}
