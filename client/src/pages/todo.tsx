import { useRecoilState } from "recoil"
import { userAtom } from "../store/atoms/user"
import axios from "axios"
import { useEffect } from "react"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"

const Todo = () => {
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

    return 
}

export default Todo