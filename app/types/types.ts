import { ListItem } from "~/root";

export type ContextType = {
    listItems: ListItem[];
    addItem: (item: Omit<ListItem, "id" | "createdAt">) => void;
    deleteItem: (id: string) => void;
  };