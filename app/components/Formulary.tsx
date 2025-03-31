import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@remix-run/react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { IoIosClose } from "react-icons/io";
import { ListItem, useAppContext } from "~/root";

const itemSchema = z.object({
    title: z.string().nonempty("El título es requerido"),
    value: z.string().refine((value) => {
        // Intentamos convertir el valor a un número
        const numericValue = Number(value);
        // Verificamos que sea un número válido y mayor a cero
        return !isNaN(numericValue) && numericValue > 0;
      }, "ingrese un número válido."),
    type: z.string()
})
type Itemtype = z.infer<typeof itemSchema>

const Formulary = ({visible,type}:{visible:Function,type:"ingreso"|"egreso"}) => {
    const {register, getValues, handleSubmit, watch, formState:{isValid,errors,}} = useForm<Itemtype>({  resolver: zodResolver(itemSchema),
        defaultValues: { type }})
    const { listItems, addItem, deleteItem } = useAppContext();
    console.log(errors)
    const onSubmit = (data: Itemtype) => {
        console.log(data)
        const newItem: Omit<ListItem, "id" | "createdAt"> = {
            title: data.title,
            value: Number(data.value),
            type: data.type
        }
        addItem(newItem)
        visible(false) // Cierra el formulario después de enviar
    }
    return(
        <div className={`flex items-center justify-center absolute w-full h-96`}>
            <div className="h-full w-full bg-black opacity-50 z-10 fixed top-0 left-0"></div>
            <Form onSubmit={handleSubmit(onSubmit)} className="w-64 bg-gray-600 flex flex-col gap-4 p-4 rounded-md z-20">
                <input type="hidden" {...register("type")} value={type}/>
                <button className="self-end text-white text-xl hover:bg-white hover:text-black rounded-full p-1" onClick={()=>visible(false)}><IoIosClose /></button>
                <div>
                    <input type="text" {...register("title")} className="bg-transparent outline-none border-white border-b text-white" placeholder="Asunto"/>
                    {errors.title && (
                        <p className="text-red-500 text-sm">{errors.title.message}</p>
                    )}
                </div>
                <div>
                    <input type="number" {...register("value")} className="bg-transparent outline-none border-white border-b text-white" placeholder="Cantidad"/>
                    {errors.value && (
                        <p className="text-red-500 text-sm">{errors.value.message}</p>
                    )}
                </div>
                <div className="self-center">
                    <button type="submit" className="p-2 bg-blue-500 text-white hover:bg-blue-400 disabled:opacity-70">Cargar</button>
                </div>
            </Form>
        </div>
    )
}

export default Formulary