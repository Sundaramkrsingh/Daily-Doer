import { useNavigate, useParams } from "react-router-dom"
import { useRecoilState } from "recoil"
import { userAtom } from "../store/atoms/user"
import { useEffect } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { curTodoAtom } from "../store/atoms/view-edit-Todo"
import { colors } from "../store/utils/colors"

const TodoView = () => {
    const [user, setUser] = useRecoilState(userAtom)
    const navigate = useNavigate()
    const { todoId } = useParams()
    const [todo, setTodo] = useRecoilState(curTodoAtom)
    axios.defaults.withCredentials = true
    
    useEffect(() => {
        axios.get(`${BACKEND_URL}/user/`)
            .then(res => {
                if(res.data.valid) {
                    const userString = sessionStorage.getItem("user")
                    const defaultString = JSON.stringify({ userId: 0, name: "", email: "" })
                    const userData = JSON.parse(userString || defaultString)
                    setUser(userData)
                } else {
                    setUser({
                        userId: 0, 
                        name: "",
                        email: ""
                    })
                    sessionStorage.clear()
                    navigate('/signin')
                }
            }) 
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        axios.get(`${BACKEND_URL}/todo/${todoId}`)
            .then(res => {
                setTodo(res.data.todo)
            })
            .catch(err => console.log(err, "Error while fetching Todo"))
    }, [todoId])

    return <div className="flex justify-center min-h-screen w-screen bg-gradient-to-l from-red-100 to-sky-200 bg-gradient-to-l from-yellow-200">
        <div className="w-1/3 my-6 p-4 shadow-xl shadow-cyan-200 rounded-lg bg-gradient-to-l from-red-100 to-sky-200 bg-gradient-to-r from-yellow-200"> 
            <div className="bg-white w-full h-full rounded-lg">
                <div className="border-b">
                    <Heading text={"title"} />
                    <div className="font-semibold text-center pb-5 text-slate-500">
                        {todo.title}
                    </div>
                </div>

                <div className="border-b h-28">
                    <Heading text={"description"} />
                    <div className="text-center text-base py-2 text-slate-500">
                        {todo.description}
                    </div>
                </div>
                
                <div className="grid grid-cols-2 border-b">
                    <div className="border-r pb-2">
                        <Heading text={"status"} />
                        <div className="flex justify-center text-base pt-1 text-slate-500">
                            <div className={`flex justify-center items-center text-white w-3/5 text-center h-8 rounded-xl border bg-${colors.get(todo.status)}`}>
                                {todo.status}
                            </div>
                        </div>
                    </div>
                    <div className="pb-2">
                        <Heading text={"due date"} />
                        <div className="text-sm text-center py-2 text-slate-500">
                            {todo.dueDate}
                        </div>
                    </div>
                </div>

                <div className="border-b pb-2">
                    <Heading text={"priority"} />
                    <div className="flex justify-center text-base pb-1 ">
                        <div className={`flex justify-center items-center text-white w-2/5 text-center h-8 rounded-xl border bg-${colors.get(todo.priority)}`}>
                            {todo.priority}
                        </div>
                    </div>
                </div>

                <div>
                    <Heading text={"created"} />
                    <div className="flex justify-center text-sm pb-1 text-center text-slate-500">
                        {todo.createdAt.charAt(8)}
                        {todo.createdAt.charAt(9)}
                        {todo.createdAt.charAt(7)}
                        {todo.createdAt.charAt(5)}
                        {todo.createdAt.charAt(6)}
                        {todo.createdAt.charAt(4)}
                        {todo.createdAt.charAt(0)}
                        {todo.createdAt.charAt(1)}
                        {todo.createdAt.charAt(2)}
                        {todo.createdAt.charAt(3)}
                    </div>
                </div>
            </div>
        </div>
    </div>
}

const Heading = ({ text }: { text: string }) => {
    
    return <div className="pl-2 pt-1 text-sm text-slate-400">
        { text }
    </div>
}


export default TodoView