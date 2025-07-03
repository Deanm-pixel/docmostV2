import { useState } from "react";
import { IPage } from "../types/page.types";

// Die Backend-URL ggf. anpassen!
const API_URL = "/api/pages";

export function useUpdatePage(pageId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function updatePage(updates: Partial<IPage>): Promise<IPage | null> {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/${pageId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error(`Fehler: ${response.status}`);
      }

      const data: IPage = await response.json();
      setLoading(false);
      return data;
    } catch (err: any) {
      setError(err.message || "Unbekannter Fehler");
      setLoading(false);
      return null;
    }
  }

  return { updatePage, loading, error };
}
