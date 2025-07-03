import { IPage } from "../types/page.types";

export function useCreatePage() {
  return async (data: Partial<IPage>): Promise<IPage | null> => {
    const response = await fetch("/api/pages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Fehler beim Erstellen der Seite");
    return await response.json();
  };
}
