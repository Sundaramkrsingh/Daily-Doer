import { atom } from "recoil";

export const newTodo = atom({
    key: "newTodo",
    default: {
        userId: 0,
        title: "",
        description: "",
        status: "",
        priority: "",
        dueDate: ""
    }
})