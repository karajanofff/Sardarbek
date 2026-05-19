import { Search } from "lucide-react";

export default function SearchBar({ value, onChange, placeholder = "Kitob yoki muallif qidirish" }) {
  return (
    <div className="relative w-full">
      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
      <input className="input pl-12" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </div>
  );
}
