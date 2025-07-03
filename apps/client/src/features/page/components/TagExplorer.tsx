import React from "react";

interface TagExplorerProps {
  tags: string[];
  onSelect: (tag: string) => void;
  selectedTag?: string;
}

export const TagExplorer: React.FC<TagExplorerProps> = ({
  tags,
  onSelect,
  selectedTag,
}) => (
  <div style={{ margin: "24px 0" }}>
    <h4>Alle Tags</h4>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {tags.map((tag) => (
        <button
          key={tag}
          style={{
            background: tag === selectedTag ? "#1976d2" : "#eee",
            color: tag === selectedTag ? "#fff" : "#222",
            border: "none",
            padding: "6px 14px",
            borderRadius: 20,
            cursor: "pointer",
            fontWeight: "bold",
          }}
          onClick={() => onSelect(tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  </div>
);
