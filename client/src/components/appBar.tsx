import AppLogo from "./appLogo"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { userAtom } from "../store/atoms/user"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../config"

const AppBar = () => {
    const user = useRecoilValue(userAtom)

    return <div className="sticky top-0 flex border-b-2 shadow-md bg-gradient-to-l from-red-100 to-sky-500 bg-gradient-to-r from-yellow-200">
        <div className="md:max-w-28 max-w-14 border-r cursor-pointer">
            <Link to={'/'}> <AppLogo /> </Link>
        </div> 
        <div className="flex w-full">
            <div className="flex md:w-1/2 sm:w-64 w-56 text-white">
                <AppBarContent text={"Pricing"} />
                <AppBarContent text={"Contact"} />
                <AppBarContent text={"About us"} />
            </div>
            <div className="flex justify-end w-1/2 py-4 px-4">
                <Button text={user.email === ""? "signin": "signout"} />
            </div>
        </div>
    </div>  
}

const Button = ({ text }: {
    text: string,
}) => {
    const navigate = useNavigate()
    const setUserAtom = useSetRecoilState(userAtom)

    function handleOnNotSignedIn() {
        navigate('/signin')
    }

    async function handleSignOut() {
        setUserAtom({
            userId: 0,
            email: "",
            name: ""
        })
        await axios.get(`${BACKEND_URL}/user/signout`)
        navigate('/')
    }

    return <button type="button" className="pt-1 pb-1.5 px-4 bg-white hover:bg-slate-200 inline-flex items-center text-base subpixel-antialiased font-semibold rounded-lg border-2 border-sky-600 shadow-lg text-sky-500 hover:border-sky-700 hover:text-sky-700" onClick={text === "signin"? handleOnNotSignedIn: handleSignOut}>
        { text } 
    </button>
} 

const AppBarContent = ({ text }: {
    text: string
}) => {
    return <div className="flex flex-col justify-center text-center font-semibold md:text-base text-xs subpixel-antialiased cursor-pointer hover:bg-sky-700 hover:border-b-4 w-1/3">
        { text }
    </div>
}

export default AppBar