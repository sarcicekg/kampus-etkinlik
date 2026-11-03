// frontend/src/types/campus-event.ts
export type Category = "Seminer" | "Atölye" | "Söyleşi" | "Yarışma";

export interface CampusEvent {
  id: string;
  title: string;
  category: Category;
  date: string;
  time: string;
  location: string;
  description: string;
  capacity: number;
  image?: string;
}

// Form verisi için tip (input'lar metin döndürdüğü için capacity metindir, id yoktur)
export interface EventFormData {
  title: string;
  category: Category | "";
  date: string;
  time: string;
  location: string;
  capacity: string;
  description: string;
  image?: string;
}