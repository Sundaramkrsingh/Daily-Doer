import { useState } from "react"
import AuthButton from "./buttons/authButton"
import InputBox from "./inputBox"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { SignupInput } from "@sundaram_11/daily-doer"
import { useNavigate } from "react-router-dom"
 
const AuthSignup = () => {
    const [signupInputs, setSignupInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: ""
    })
    const navigate = useNavigate()

    return <div className="h-full">
        <div className="flex flex-col justify-center text-center pb-2 text-3xl font-bold subpixel-antialiased text-sky-400 font-sans h-1/6">
            Sign Up
        </div>
        <div className="flex flex-col items-center h-5/6">
            <div className="flex justify-center border rounded-lg shadow-lg border-sky-300 h-max w-7/12">
                <div>
                    <div className="pt-4">
                        <InputBox text={"name"} type={"text"} placeholder={""} value={signupInputs.name} onChange={(val) => setSignupInputs((c) => ({
                            ...c, 
                            name: val
                        }))} />
                    </div>
                    <div>
                        <InputBox text={"email"} type={"email"} placeholder={"xyz@gmail.com"} value={signupInputs.email} onChange={(val) => setSignupInputs((c) => ({
                            ...c,
                            email: val
                        }))} />
                    </div>
                    <div>
                        <InputBox text={"password"} type={"password"} placeholder={"pass@123"} value={signupInputs.password} onChange={(val) => setSignupInputs((c) => ({
                            ...c,
                            password:val
                        }))} />
                    </div>  
                    <div className="py-6">
                        <AuthButton text={"signup"} onClick={() => {
                            try {
                                axios.post(`${BACKEND_URL}/user/signin`, signupInputs)
                                    .then(res => {
                                        sessionStorage.setItem("user", JSON.stringify(res.data.user))
                                    })
                                navigate('/')
                            } catch(e) {
                                console.log(e)
                                alert('Error while signing up')
                            }
                        }} />
                    </div>      
                </div>
            </div>
        </div>
    </div>
}

export default AuthSignup