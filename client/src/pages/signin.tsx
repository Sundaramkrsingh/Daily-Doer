import { useEffect } from "react"
import AuthSignin from "../components/authSignin"
import Quote from "../components/quote"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../config"

const Signin = () => {
    const navigate = useNavigate()
    axios.defaults.withCredentials = true

    useEffect(() => {
        axios.get(`${BACKEND_URL}/user/`)
            .then(res => {
                if(res.data.valid) {
                    navigate('/')
                }
            })
            .catch(err => console.log(err)) 
    }, [])

    return <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="hidden md:block">
            <Quote />
        </div>
        <div> 
            <AuthSignin />
        </div>
    </div>
}

export default Signin