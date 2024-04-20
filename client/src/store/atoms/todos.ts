import { atom } from "recoil";

export const todosAtom = atom({
    key: "todosAtom",
    default: [{
        id: 0,
        title: "",
        status: "",
        priority: "",
        dueDate: ""
    }]
})