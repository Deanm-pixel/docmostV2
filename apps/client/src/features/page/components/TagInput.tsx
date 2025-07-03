import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";

// Falls du die vorhandenen Tags (für Vorschläge) aus dem Backend holen willst, kannst du die per Prop übergeben
export interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  allTags: string[]; // Vorschläge für Autocomplete
  label?: string;
}

export const TagInput: React.FC<TagInputProps> = ({
  value,
  onChange,
  allTags,
  label = "Tags",
}) => {
  return (
    <Autocomplete
      multiple
      freeSolo
      options={allTags}
      value={value}
      onChange={(_, newValue) => onChange(newValue as string[])}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip
            variant="outlined"
            label={option}
            {...getTagProps({ index })}
            key={option}
          />
        ))
      }
      renderInput={(params) => (
        <TextField {...params} variant="outlined" label={label} placeholder="Tag hinzufügen" />
      )}
    />
  );
};
