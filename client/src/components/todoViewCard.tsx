import axios from "axios"
import { BACKEND_URL } from "../config"
import { useEffect, useState } from "react"

const TodoViewCard = ({ todoId }: { todoId: number }) => {
    const [todo, setTodo] = useState()

    useEffect(() => {
        axios.get(`${BACKEND_URL}/todo/${todoId}`)
            .then(res => setTodo(res.data.todo))
            .catch(err => console.log(err, "Error while fetching todo"))
    }, [])

    return <div>

    </div>
}

export default TodoViewCard