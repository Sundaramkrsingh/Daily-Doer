import { useRecoilState } from "recoil"
import InputBox from "../components/inputBox"
import { newTodo } from "../store/atoms/newTodo"
import SelectBox from "../components/selectBox"
import AuthButton from "../components/buttons/authButton"
import DatePicker from "../components/datePicker"
import { userAtom } from "../store/atoms/user"
import { useEffect } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"

const AddTodo = () => {
    const [todo, setTodo] = useRecoilState(newTodo)
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
                    setTodo((c) => ({ ...c, userId: res.data.user.userId }))
                }
            })
            .catch(err => console.log(err))
    }, [])

    return <div className="flex justify-center h-max w-screen bg-gradient-to-l from-red-100 to-sky-300 bg-gradient-to-r from-yellow-200">
        <div className="flex justify-center w-1/2 border border-sky-300 shadow-md rounded-lg bg-white"> 
            <div className="flex flex-col items-center w-4/5">
                
                <div className="flex flex-col justify-center text-center py-2 text-3xl font-bold subpixel-antialiased text-sky-400 font-sans h-1/6">
                    New Todo
                </div>

                <InputBox text={"title"} type={"text"} placeholder={"Assignments"} onChange={(val) => setTodo(c => ({
                    ...c,
                    title: val
                }))} />

                <InputBox text={"description"} type={"text"} placeholder={"Maths and DBMS"} onChange={(val) => setTodo(c => ({
                    ...c,
                    description: val
                }))} />

                <SelectBox label={"Status"} options={["Pending", "Started", "Done"]} onChange={(val) => setTodo((c) => ({
                    ...c,
                    status: val
                }))} />

                <SelectBox label={"Priority"} options={["High", "Moderate", "Normal"]} onChange={(val) => setTodo((c) => ({
                    ...c,
                    priority: val
                }))} />

                <DatePicker onChange={(val) => setTodo((c) => ({
                    ...c,
                    dueDate: val
                }))} />
                <div className="pt-5 pb-2 w-3/5">
                    <AuthButton text={"Add Todo"} onClick={async () => {
                        const res = await axios.post(`${BACKEND_URL}/todo/`, todo)
                        if(res) {
                            navigate('/todos')
                        }
                    }} />
                </div>

            </div>
        </div>
    </div>
}

export default AddTodo