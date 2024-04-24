import { useState } from "react"
import AuthButton from "./buttons/authButton"
import InputBox from "./inputBox"
import { SigninInput } from "@sundaram_11/daily-doer"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../config"

const AuthSignin = () => {
    const [signinInputs, setSigninInputs] = useState<SigninInput>({
        email: "",
        password: ""
    })
    const navigate = useNavigate()

    return <div className="h-full">
        <div className="flex flex-col justify-center text-center pb-2 text-3xl font-bold subpixel-antialiased text-sky-400 font-sans h-1/6">
            Sign In
        </div>
        <div className="flex flex-col items-center h-5/6">
            <div className="flex justify-center border rounded-lg shadow-lg border-sky-300 h-max w-7/12">
                <div>
                    <div className="pt-4">
                        <InputBox text={"email"} type={"email"} placeholder={"xyz@gmail.com"} value={signinInputs.email} onChange={(val) => setSigninInputs((c) => ({
                            ...c,
                            email: val
                        }))} />
                    </div>
                    <div>
                        <InputBox text={"password"} type={"password"} placeholder={"pass@123"} value={signinInputs.password} onChange={(val) => setSigninInputs((c) => ({
                            ...c, 
                            password: val
                        }))} />
                    </div>  
                    <div className="pt-6">
                        <AuthButton text={"signin"} onClick={() => {
                            try {
                                axios.post(`${BACKEND_URL}/user/signin`, signinInputs)
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
                    <div className="flex justify-center text-sm font-sans subpixel-antialiased font-semibold pt-2 pb-6">
                        <div className="text-slate-500">
                            Not a member?
                        </div>
                        <Link to={'/signup'} >
                            <div className="pl-1 text-sky-500 hover:text-sky-700 cursor-pointer">
                                Signup
                            </div>
                        </Link>
                    </div>   
                </div>
            </div>
        </div>
    </div>
}

export default AuthSignin