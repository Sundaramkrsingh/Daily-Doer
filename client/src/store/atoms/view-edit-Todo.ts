import { atom } from "recoil";

export const curTodoAtom = atom({
    key: "currentTodoAtom",
    default: {
        id: 0,
        title: "",
        description: "",
        status: "",
        priority: "",
        createdAt: "",
        dueDate: ""
    }
})