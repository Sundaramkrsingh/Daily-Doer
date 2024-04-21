import AppLogo from "./icons/appLogo"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useRecoilState } from "recoil"
import { userAtom } from "../store/atoms/user"

const AppBar = () => {
    const [user, setUser] = useRecoilState(userAtom)
    console.log(user)

    return <div className="sticky top-0 flex border-b-2 shadow-md bg-gradient-to-l from-red-100 to-sky-500 bg-gradient-to-r from-yellow-200 w-screen">
        <div className="md:max-w-28 max-w-14 border-r cursor-pointer">
            <Link to={'/'}> <AppLogo /> </Link>
        </div> 
        <div className="flex w-full">
            <div className="flex md:w-1/2 sm:w-64 w-56 text-white">
                <AppBarContent text={"About us"} redirectPage={"about"} />
                {
                    user.email === ""? <div></div>:
                    <AppBarContent text={"my todos"} redirectPage={"todos"} />                
                }
                {
                    user.email === ""? <div></div>:
                    <AppBarContent text={"Add Todo"} redirectPage={"todo/add"} />
                }
            </div>
            <div className="flex justify-end w-1/2 py-4 px-6">
                <Button text={user.email === ""? "signin": "signout"} setUser={setUser} />
            </div>
        </div>
    </div>  
}

const Button = ({ text, setUser }: {
    text: string,
    setUser: React.Dispatch<any>
}) => {
    const navigate = useNavigate()

    function handleOnNotSignedIn() {
        navigate('/signin')
    }

    async function handleSignOut() {
        setUser({
            userId: 0,
            name: "",
            email: ""
        })
        await axios.get(`${BACKEND_URL}/user/signout`)
        sessionStorage.clear()
        navigate('/')
    }

    return <button type="button" className="pt-0.5 pb-0.5 px-2 md:pt-1 md:pb-1.5 md:px-4 bg-white hover:bg-slate-200 inline-flex items-center text-sm md:text-base subpixel-antialiased font-semibold rounded-lg border-1 md:border-2 border-sky-600 shadow-lg text-sky-500 hover:border-sky-700 hover:text-sky-700" onClick={text === "signin"? handleOnNotSignedIn: handleSignOut}>
        { text } 
    </button>
} 

const AppBarContent = ({ text, redirectPage }: {
    text: string
    redirectPage: string
}) => {
    const navigate = useNavigate()

    return <div onClick={() => navigate(`/${redirectPage}`)} className="flex flex-col justify-center text-center font-semibold md:text-base text-xs subpixel-antialiased cursor-pointer hover:bg-sky-700 hover:border-b-4 w-1/3">
        { text }
    </div>
}

export default AppBar