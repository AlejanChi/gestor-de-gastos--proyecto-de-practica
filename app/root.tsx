import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useOutletContext,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";
import { useState } from "react";
import { ContextType } from "./types/types";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export interface ListItem {
  id: string;
  title: string;
  value: number;
  type: "ingreso" | "egreso";
  createdAt: string;
}

export default function App() {
  const [listItems, setListItems] = useState<ListItem[]>([]);

  // Generar ID único con fecha y número de registros
  const generateId = () => {
    const timestamp = new Date().getTime();
    const count = listItems.length + 1;
    return `${timestamp}-${count}`;
  };

  const addItem = (item: Omit<ListItem, "id" | "createdAt">) => {
    const newItem: ListItem = {
      ...item,
      id: generateId(),
      createdAt: new Date().toISOString()
    };
    setListItems(prev => [...prev, newItem]);
  };

  const deleteItem = (id: string) => {
    setListItems(prev => prev.filter(item => item.id !== id));
  };
  return <Outlet context={{listItems,addItem,deleteItem}}/>;
}

export function useAppContext() {
  return useOutletContext<ContextType>();
}