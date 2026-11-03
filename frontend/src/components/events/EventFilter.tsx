// frontend/src/components/events/EventFilter.tsx
import type { Category } from "../../types/campus-event";

interface EventFilterProps {
  searchText: string;
  onSearchChange: (val: string) => void;
  selectedCategory: Category | "";
  onCategoryChange: (val: Category | "") => void;
  categories: Category[];
}

function EventFilter({
  searchText,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
}: EventFilterProps) {
  return (
    <form
      className="filtre"
      onSubmit={(e) => e.preventDefault()}
      style={{
        display: "flex",
        gap: "var(--bosluk-m)",
        flexWrap: "wrap",
        marginBottom: "var(--bosluk-m)",
      }}
    >
      <div className="form-group" style={{ flex: 1, minWidth: "200px" }}>
        <label htmlFor="arama">Etkinlik ara</label>
        <input
          type="search"
          id="arama"
          placeholder="Örn. atölye, kariyer..."
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="form-group" style={{ flex: 1, minWidth: "200px" }}>
        <label htmlFor="kategori-filtre">Kategori</label>
        <select
          id="kategori-filtre"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value as Category | "")}
        >
          <option value="">Tümü</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
}

export default EventFilter;