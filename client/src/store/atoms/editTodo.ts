import axios from "axios";
import { atom, selector } from "recoil";
import { BACKEND_URL } from "../../config";

export const editTodoAtom = atom({
    key: "editTodo",
    default: selector({
        key: "editTodoSelector",
        get: (id) => async() => {
            const todo = await axios.get(`${BACKEND_URL}/todo/${id}`)
            
        }
    })
})