import { atom } from "recoil";

const userString = sessionStorage.getItem("user")
const defaultString = JSON.stringify({ userId: 0, name: "", email: "" })
const user = JSON.parse(userString || defaultString)

export const userAtom = atom({
    key: "userAtom",
    default: user
})
