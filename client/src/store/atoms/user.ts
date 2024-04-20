import { atom } from "recoil";

export const userAtom = atom({
    key: "userAtom",
    default: {
        userId: 0,
        name: "",
        email: ""
    }
})

