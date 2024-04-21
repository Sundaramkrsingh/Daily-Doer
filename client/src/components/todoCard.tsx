import DeleteIcon from "./icons/deleteIcon"
import EditIcon from "./icons/editIcon"
import ViewIcon from "./icons/viewIcon"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useRecoilState } from "recoil"
import { todosAtom } from "../store/atoms/todos"
import { useNavigate } from "react-router-dom"

const TodoCard = ({ id, title, status, priority, dueDate }: {
    id: number,
    title: string, 
    status: string, 
    priority: string,
    dueDate: string
}) => {
    const navigate = useNavigate()
    const [todos, setTodos] = useRecoilState(todosAtom)

    const colors: Map<string, string> = new Map()
    colors.set("Pending", "red-400")
    colors.set("Started", "yellow-300")
    colors.set("Done", "green-400")
    colors.set("High", "red-400")
    colors.set("Moderate", "yellow-300")
    colors.set("Normal", "green-400")

    return <div className="flex flex-col items-center subpixel-antialiased border-4 border-yellow-100 hover:border-cyan-300 shadow-2xl shadow-sky-200 hover:shadow-sky-400 h-max w-56 ml-6 my-7 rounded-2xl">
        <div className="w-full rounded-xl bg-white">
            <div className="border-b">
                <Heading text={"title"} />
                <div className="font-semibold text-center pb-2 text-slate-500">
                    {title}
                </div>
            </div>
            
            <div className="grid grid-cols-2 border-b">
                <div className="border-r">
                    <Heading text={"status"} />
                    <div className="flex justify-center text-xs pb-1 text-slate-500">
                        <div className={`flex justify-center items-center text-white w-3/5 text-center h-6 rounded-xl border bg-${colors.get(status)}`}>
                            {status}
                        </div>
                    </div>
                </div>
                <div>
                    <Heading text={"due date"} />
                    <div className="text-xs text-center pb-1 text-slate-500">
                        {dueDate}
                    </div>
                </div>
            </div>

            <div className={`border-b`}>
                <Heading text={"priority"} />
                <div className="flex justify-center text-sm pb-1 ">
                    <div className={`flex justify-center items-center text-white w-2/5 text-center h-6 rounded-xl border bg-${colors.get(priority)}`}>
                        {priority}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 h-10 cursor-pointer">
                <div className="flex justify-center items-center border-r hover:bg-gray-300 rounded-bl-xl text-slate-400" onClick={() => {
                    navigate(`/todo/view/${id}`)
                }}>
                    <ViewIcon />
                </div>
                    
                <div className="flex justify-center items-center border-r hover:bg-gray-300 text-slate-400" onClick={() => {
                    navigate(`/todo/edit/${id}`)
                }}>
                    <EditIcon />
                </div>

                <div className="flex justify-center items-center hover:bg-red-300 rounded-br-xl text-slate-400 hover:text-white" onClick={async () => {
                    try {
                        await axios.delete(`${BACKEND_URL}/todo/${id}`)
                        const updatedTodos = todos.filter(todo => todo.id != id)
                        setTodos(updatedTodos)
                    } catch(e) {
                        console.log(e)
                    }
                }}>
                    <DeleteIcon />                    
                </div>
            </div>
        </div>
    </div>  
}

function Heading({ text }: { text: string }) {
    
    return <div className="pl-2 pt-1 text-xs text-slate-400">
        { text }
    </div>
}

export default TodoCard;
