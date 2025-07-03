import React, { useState } from "react";
import { IPage } from "../types/page.types";
import { useCreatePage } from "../api/useCreatePage";

export const CreatePageForm: React.FC<{ onCreated?: (page: IPage) => void }> = ({ onCreated }) => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPage = useCreatePage();

  const handleAddTag = () => {
    const tag = tagInput.trim();
    if (tag && !tags.includes(tag)) setTags([...tags, tag]);
    setTagInput("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const page = await createPage({
        title,
        tags,
      });
      if (onCreated && page) onCreated(page);
      setTitle("");
      setTags([]);
    } catch (e: any) {
      setError(e.message || "Fehler beim Erstellen");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Neue Seite anlegen</h3>
      <div>
        <label>Titel:</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ marginBottom: 8 }}
        />
      </div>
      <div style={{ margin: "8px 0" }}>
        <label>Tags:</label>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
          {tags.map((tag) => (
            <span key={tag} style={{ background: "#eee", padding: "2px 8px", borderRadius: 6 }}>
              {tag}
              <button type="button" style={{ marginLeft: 4 }} onClick={() => handleRemoveTag(tag)}>
                &times;
              </button>
            </span>
          ))}
        </div>
        <input
          type="text"
          value={tagInput}
          onChange={e => setTagInput(e.target.value)}
          placeholder="Tag hinzufügen"
          onKeyDown={e => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
        />
        <button type="button" onClick={handleAddTag} style={{ marginLeft: 8 }}>
          Hinzufügen
        </button>
      </div>
      <button type="submit" disabled={loading}>Seite anlegen</button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
};
