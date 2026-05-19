import { useEffect, useState } from "react";
import api from "../api/axios";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  useEffect(() => { api.get("/admin/users").then(({ data }) => setUsers(data)); }, []);

  return (
    <section className="container-page grid gap-6 py-10 lg:grid-cols-[260px_1fr]">
      <AdminSidebar />
      <div>
        <h1 className="text-4xl font-black">Foydalanuvchilar</h1>
        <div className="mt-8 overflow-x-auto rounded-3xl border border-gray-100 bg-white">
          <table className="w-full min-w-[620px] text-left">
            <thead className="bg-gray-50"><tr><th className="p-4">Ism</th><th>Email</th><th>Role</th><th>Sana</th></tr></thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t border-gray-100">
                  <td className="p-4 font-bold">{user.name}</td>
                  <td>{user.email}</td>
                  <td><span className="rounded-full bg-brand-soft px-3 py-1 text-sm font-bold text-brand-orange">{user.role}</span></td>
                  <td>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
