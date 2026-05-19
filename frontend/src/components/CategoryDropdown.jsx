import { categories } from "../data/categories";

export default function CategoryDropdown({ value, onChange }) {
  return (
    <select className="input" value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="all">Barcha janrlar</option>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
}
