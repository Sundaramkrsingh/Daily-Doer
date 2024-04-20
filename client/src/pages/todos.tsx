import { useEffect } from "react"
import { useRecoilState } from "recoil"
import { userAtom } from "../store/atoms/user"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../config"
import TodoCard from "../components/todoCard"

const Todos = () => {
    const [user, setUser] = useRecoilState(userAtom)
    const navigate = useNavigate() 
    axios.defaults.withCredentials = true

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

    return <div className="inline-grid grid-cols-4 h-screen">
        <TodoCard title={"Gym session"} status={"Pending"} priority={"Normal"}  />
        <TodoCard title={"Home Cleaning"} status={"Started"} priority={"Moderate"}  />
        <TodoCard title={"maths homework"} status={"Pending"} priority={"High"}  />
        <TodoCard title={"read book"} status={"Done"} priority={"High"}  />
        <TodoCard title={"receive parcel"} status={"Started"} priority={"Moderate"}  />
        <TodoCard title={"receive gifts"} status={"Done"} priority={"Normal"}  />
    </div>
}

export default Todos