import axios from "axios"
import { useEffect } from "react"
import { BACKEND_URL } from "../config"
import { useRecoilState } from "recoil"
import { userAtom } from "../store/atoms/user"
import { useNavigate } from "react-router-dom"
import AppLogo from "../components/appLogo"
import TodoButton from "../components/buttons/TodoButton"

const LandingPage = () => {
    const [user, setUser] = useRecoilState(userAtom)
    const navigate = useNavigate()

    axios.defaults.withCredentials = true

    useEffect(() => {
        axios.get(`${BACKEND_URL}/user/`)
            .then(res => {
                if(res.data.valid) {
                    setUser(res.data.user)
                }
                else {
                    setUser({
                        userId: 0,
                        name: "",
                        email: ""
                    })
                }
            })
            .catch(err => console.log(err)) 
    }, [])

    return <div className="grid grid-cols-2 h-screen text-sky-500 text-3xl font-extrabold">
        <div>
            <AppLogo />
        </div>
        <div className="flex flex-col justify-center items-center">
            {   
                user.userId === 0? <div></div>: 
                <div className="pb-10">
                    <TodoButton text={"My Todos"} redirectPage={"todos"} />
                </div>
            }
            Hello! { user.name }
        </div>
    </div>
}

export default LandingPage