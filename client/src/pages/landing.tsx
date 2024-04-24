import axios from "axios"
import { useEffect } from "react"
import { BACKEND_URL } from "../config"
import TodoButton from "../components/buttons/TodoButton"
import { useRecoilState } from "recoil"
import { userAtom } from "../store/atoms/user"
import Design from "../components/icons/design"

const LandingPage = () => {
    const [user, setUser] = useRecoilState(userAtom)
    axios.defaults.withCredentials = true

    useEffect(() => {
        axios.get(`${BACKEND_URL}/user/`)
            .then(async res => {
                if(res.data.valid) {
                   const userString = sessionStorage.getItem("user")
                   const defaultString = JSON.stringify({ userId: 0, name: ""})
                   const userData = await JSON.parse(userString || defaultString)
                   setUser(userData)
                   console.log(user)
                   console.log(sessionStorage.getItem("user"))
                } else {
                    setUser({
                        userId: 0,
                        name: "",
                        email: ""
                    })
                    console.log(sessionStorage.getItem('user'))
                    sessionStorage.clear()
                }
            })
            .catch(err => console.log(err)) 
    }, [])

    return <div className="grid grid-rows-2 h-screen text-sky-500 text-3xl font-extrabold my-4">
        <div>
            <div className="flex flex-col justify-center items-center text-center h-1/2">
                Be productive, Be more with Daily Doer
                <div className="text-sm text-gray-400 font-semibold mt-10">Organize all your tasks easily, increase your productivity</div>
            </div>
            <div className="flex flex-col justify-center items-center my-6">
                {   
                    user.userId === 0? <div></div>: 
                    <div className="pb-10">
                        <TodoButton text={"My Todos"} redirectPage={"todos"} />
                    </div>
                }
                Hello! { user.name }
            </div>
            <Design />
        </div>
    </div>
}

export default LandingPage