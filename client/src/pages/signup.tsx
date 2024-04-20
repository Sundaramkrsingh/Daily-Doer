import AuthSignup from "../components/authSignup"
import Quote from "../components/quote"
import axios from "axios"
import { useEffect } from "react"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"

const SignUp = () => {
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

    return <div className="grid grid-cols-2">
        <div>
            <Quote />
        </div>
        <div>
            <AuthSignup />
        </div>
    </div>
}

export default SignUp