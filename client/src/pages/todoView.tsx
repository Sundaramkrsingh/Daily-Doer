import { useNavigate, useParams } from "react-router-dom"
import { useRecoilState } from "recoil"
import { userAtom } from "../store/atoms/user"
import { useEffect } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { curTodoAtom } from "../store/atoms/view-edit-Todo"

const TodoView = () => {
    const [user, setUser] = useRecoilState(userAtom)
    const navigate = useNavigate()
    const { todoId } = useParams()
    const [todo, setTodo] = useRecoilState(curTodoAtom)

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

    return <div>
        <div>
            {todo.title}
        </div>    
        <div>
            {todo.description}
        </div>
        <div>
            {todo.status}
        </div>
        <div>
            {todo.priority}
        </div>
        <div>
            {todo.dueDate}
        </div>
    </div>
}

export default TodoView