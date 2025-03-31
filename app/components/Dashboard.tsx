import { useLoaderData } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';
import { ListItem, useAppContext } from '~/root';
import Formulary from './Formulary';


export default function DashboardComponent() {
  const { listItems, addItem, deleteItem } = useAppContext();
  const [total,setTotal] = useState<number>(0);
  const [ingresos,setIngresos] = useState<number>(0);
  const [egresos,setEgresos] = useState<number>(0);
  const [visibleForm, setVisible] = useState<boolean>(false)
  const [typeOperation, setTypeOperation] = useState<"ingreso"|"egreso">("ingreso")
  const dataChart = [
    { name: "Ingresos", value: ingresos },
    { name: "Egresos", value: egresos },
  ];
  // const { listItems } = useLoaderData<Loader>();
  // const [newItem, setNewItem] = useState<Omit<ListItem, "id" | "createdAt">>({
  //   title: "",
  //   value: 10,
  //   type: "ingreso"
  // });
  const COLORS = ["green", "red"];
useEffect(()=>{
  listItems.map((item)=>{
    if(item.type == 'ingreso'){
      setTotal(total+item.value)
      setIngresos(ingresos+item.value)
    }else{
      setTotal(total-item.value)
      setEgresos(egresos+item.value)
    }
  })
},[listItems])

const operation = (type:"ingreso"|"egreso") =>{
  setTypeOperation(type)
  setVisible(true)
}

console.log(listItems)
  return (
    <div className="w-full p-6 bg-gray-900">
      {visibleForm && (<Formulary visible={setVisible} type={typeOperation}/>)}      
      {/* Contenedor principal con grid de 3 filas */}
      <div className="h-full grid grid-cols-2 gap-4">
        
        {/* Primera fila - Número grande */}
        <div className="bg-white rounded-lg p-4 shadow-sm grid grid-rows-[auto_20%] //items-start //justify-start">
          <div>
            <p className="text-3xl font-bold">Total:</p>
            <p className="text-3xl font-bold text-blue-600">{total}</p>
            <p className="text-xl font-bold">Total de gastos:</p>
            <p className="text-xl font-bold text-red-600">{egresos}</p>
            <p className="text-xl font-bold">Total de ingresos:</p>
            <p className="text-xl font-bold text-green-600">{ingresos}</p>
          </div>
          <div className='bg-gray-400 p-2 rounded-md flex gap-4 w-fit'>
            <button className='btn-red' onClick={()=>operation("egreso")}>
              Gasto
            </button>
            <button className='btn-green' onClick={()=>operation("ingreso")}>
              Ingreso
            </button>
          </div>
        </div>
        
{/* Tercera fila - Lista de elementos con scroll */}
<div className="bg-white rounded-lg p-6 shadow-sm overflow-hidden row-span-2">
          <h2 className="text-xl font-semibold mb-4">Lista de Elementos</h2>
          <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-blue-50">
            <ul className="space-y-3">
              {listItems.map((item) => (
                <li 
                  key={item.id}
                  className="flex justify-between items-center p-4 bg-gray-50 hover:bg-blue-50 rounded-md transition-colors"
                >
                  <span className="font-medium">{item.title}</span>
                  <span className={`${item.type=="ingreso"?'text-green-600':'text-red-600'} font-semibold`}>
                    {item.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Segunda fila - Espacio para gráfico */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Gráfico Estadístico</h2>
          <div className="h-64 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-md grid grid-cols-[min-content_1fr]">
          <PieChart width={200} height={200}>
      <Pie
        data={dataChart}
        cx={100}
        cy={100}
        innerRadius={60}
        outerRadius={80}
        dataKey="value"
      >
        {dataChart.map((entry, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
            <div className="font-bold p-6">
              <ul className='list-none flex flex-col gap-4'>
                <li className='flex items-center justify-start gap-2'>
                  <div className='bg-green-600 size-4 rounded-full'></div><p>Ingresos</p>
                </li>
                <li className='flex items-center justify-start gap-2'>
                  <div  className='bg-red-600 size-4 rounded-full'></div><p>Egresos</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
}