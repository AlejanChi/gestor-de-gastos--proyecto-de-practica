import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import DashboardComponent from "~/components/Dashboard";


export const meta: MetaFunction = () => {
  return [
    { title: "Contador de operaciones" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  console.log("data recibida:",formData)

  return null
}

export function loader() {
  // Datos de ejemplo, puedes modificar según necesites
  return {
    listItems: [
      { id: 1, title: 'Elemento 1', value: 100, type: "ingreso" },
      { id: 2, title: 'Elemento 2', value: 75, type: "egreso" },
      { id: 3, title: 'Elemento 3', value: 60, type: "ingreso" },
    ]
  };
}
export default function Index() {


  return (
      <div className="size-full items-center justify-center">
        <DashboardComponent />
      </div>
    
  );
}
