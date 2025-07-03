import React, { useEffect, useState } from "react";
import { IPage } from "../types/page.types";

// Hilfsfunktion für die Filter-API
async function fetchPagesByTags(tags: string[]): Promise<IPage[]> {
  const response = await fetch("/api/pages/filter", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tags }),
  });
  if (!response.ok) throw new Error("Fehler beim Laden der Seiten");
  return await response.json();
}

export const PageListWithTagFilter: React.FC = () => {
  const [pages, setPages] = useState<IPage[]>([]);
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initiale Ladung (alle Seiten)
  useEffect(() => {
    setLoading(true);
    fetchPagesByTags([])
      .then(setPages)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  // Filter anwenden
  const handleApplyFilter = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchPagesByTags(filterTags);
      setPages(result);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTag = () => {
    const tag = input.trim();
    if (tag && !filterTags.includes(tag)) {
      setFilterTags([...filterTags, tag]);
    }
    setInput("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFilterTags(filterTags.filter((t) => t !== tagToRemove));
  };

  return (
    <div>
      <h2>Seiten mit Tag-Filter</h2>
      <div style={{ marginBottom: 16 }}>
        <label>Filter-Tags:</label>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
          {filterTags.map((tag) => (
            <span key={tag} style={{ background: "#eee", padding: "2px 8px", borderRadius: 6 }}>
              {tag}
              <button style={{ marginLeft: 4 }} onClick={() => handleRemoveTag(tag)}>
                &times;
              </button>
            </span>
          ))}
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tag hinzufügen"
          onKeyDown={e => e.key === "Enter" && handleAddTag()}
        />
        <button onClick={handleAddTag} style={{ marginLeft: 8 }}>
          Hinzufügen
        </button>
        <button onClick={handleApplyFilter} style={{ marginLeft: 8 }}>
          Filter anwenden
        </button>
      </div>
      {loading && <div>Lade Seiten...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      <ul>
        {pages.map((page) => (
          <li key={page.id}>
            <strong>{page.title}</strong> {page.tags && page.tags.length > 0 && (
              <span style={{ color: "#888", fontSize: "0.9em" }}>
                [Tags: {page.tags.join(", ")}]
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
