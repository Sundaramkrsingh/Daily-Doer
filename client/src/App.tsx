import { Route, Routes } from "react-router-dom"
import SignUp from "./pages/signup"
import Signin from "./pages/signin"
import Todos from "./pages/todos"
import Todo from "./pages/todo"
import LandingPage from "./pages/landing"
import AddTodo from "./pages/addTodo"
import EditTodo from "./pages/editTodo"

function App() {

  return <>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/todos" element={<Todos />} />
      <Route path="/todo" element={<Todo />} />
      <Route path="/todo/add" element={<AddTodo />} />
      <Route path="/todo/edit" element={<EditTodo />} />
    </Routes>
  </>
}

export default App
