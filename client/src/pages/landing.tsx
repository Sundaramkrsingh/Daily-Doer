import axios from "axios"
import { useEffect } from "react"
import { BACKEND_URL } from "../config"
import AppLogo from "../components/icons/appLogo"
import TodoButton from "../components/buttons/TodoButton"
import { useRecoilState } from "recoil"
import { userAtom } from "../store/atoms/user"
import Design from "../components/icons/design"

const LandingPage = () => {
    const [user, setUser] = useRecoilState(userAtom)
    axios.defaults.withCredentials = true

    useEffect(() => {
        axios.get(`${BACKEND_URL}/user/`)
            .then(res => {
                if(res.data.valid) {
                   const userString = sessionStorage.getItem("user")
                   const defaultString = JSON.stringify({ userId: 0, name: ""})
                   const userData = JSON.parse(userString || defaultString)
                   setUser(userData)
                } else {
                    setUser({
                        userId: 0,
                        name: "",
                        email: ""
                    })
                    sessionStorage.clear()
                }
            })
            .catch(err => console.log(err)) 
    }, [])

    return <div className="grid grid-cols-2 h-screen text-sky-500 text-3xl font-extrabold">
        <div>
            <div className="flex flex-col justify-center items-center text-center h-1/2">
                Be productive, Be more with Daily Doer
                <div className="text-sm text-gray-400 font-semibold mt-10">Organize all your tasks easily, increase your productivity</div>
            </div>
            <Design />
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