import { useEffect } from "react"
import { useRecoilState } from "recoil"
import { userAtom } from "../store/atoms/user"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../config"
import TodoCard from "../components/todoCard"
import { todosAtom } from "../store/atoms/todos"

const Todos = () => {
    const [user, setUser] = useRecoilState(userAtom)
    const [todos, setTodos] = useRecoilState(todosAtom)
    const navigate = useNavigate() 
    axios.defaults.withCredentials = true
    console.log(user)

    useEffect(() => {
        axios.get(`${BACKEND_URL}/user/`)
            .then(res => {
                if(!res.data.valid) {
                    navigate('/signin')
                } else {
                    setUser(res.data.user)
                }
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        axios.get(`${BACKEND_URL}/todo/todos/${user.userId}`)
            .then(res => {
                setTodos(res.data.todos)
            })
            .catch(err => console.log(err, "Error while fetching Todos"))
    }, [user])

    return (
        <div className="inline-grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 h-max w-screen bg-gradient-to-l from-red-100 to-sky-100 bg-gradient-to-r from-yellow-100">
            { todos.map((todo: { id: number, title: string, status: string, priority: string, dueDate: string }) => (
                <TodoCard key={todo.id} id={todo.id} title={todo.title} status={todo.status} priority={todo.priority} dueDate={todo.dueDate} />
            )) }
        </div>
    )
}

export default Todos
