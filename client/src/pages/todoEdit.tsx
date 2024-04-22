import { useNavigate, useParams } from "react-router-dom"
import { useRecoilState, useSetRecoilState } from "recoil"
import InputBox from "../components/inputBox"
import SelectBox from "../components/selectBox"
import AuthButton from "../components/buttons/authButton"
import DatePicker from "../components/datePicker"
import { userAtom } from "../store/atoms/user"
import { useEffect } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { curTodoAtom } from "../store/atoms/view-edit-Todo"

const TodoEdit = () => {
    const setUser = useSetRecoilState(userAtom)
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

    return <div className="flex justify-center h-max w-screen bg-gradient-to-l from-red-100 to-sky-100 bg-gradient-to-r from-yellow-100">
        <div className="flex justify-center w-1/2 my-6 shadow-xl shadow-cyan-200 rounded-lg bg-white"> 
            <div className="flex flex-col items-center w-4/5">
                
                <div className="flex flex-col justify-center text-center py-6 text-3xl font-bold subpixel-antialiased text-sky-400 font-sans h-1/6">
                    Edit Todo
                </div>

                <InputBox text={"title"} type={"text"} placeholder={""} value={todo.title} onChange={(val) => setTodo(c => ({
                    ...c,
                    title: val
                }))} />

                <InputBox text={"description"} type={"text"} placeholder={""} value={todo.description} onChange={(val) => setTodo(c => ({
                    ...c,
                    description: val
                }))} />

                <SelectBox label={"Status"} options={["Pending", "Started", "Done"]} value={todo.status} onChange={(val) => setTodo((c) => ({
                    ...c,
                    status: val
                }))} />

                <SelectBox label={"Priority"} options={["High", "Moderate", "Normal"]} value={todo.priority} onChange={(val) => setTodo((c) => ({
                    ...c,
                    priority: val
                }))} />

                <DatePicker value={todo.dueDate} onChange={(val) => setTodo((c) => ({
                    ...c,
                    dueDate: val
                }))} />
                <div className="pt-5 pb-2 w-3/5">
                    <AuthButton text={"Save Todo"} onClick={async () => {
                        try {
                            const res = await axios.put(`${BACKEND_URL}/todo/`, {
                                todoId: todo.id,
                                title: todo.title,
                                description: todo.description,
                                status: todo.status,
                                priority: todo.priority,
                                dueDate: todo.dueDate 
                            })
                            if(res.data.id) {
                                navigate('/todos')
                            }
                        } catch(e) {
                            console.log(e)
                        }
                    }} />
                </div>

            </div>
        </div>
    </div>
}

export default TodoEdit