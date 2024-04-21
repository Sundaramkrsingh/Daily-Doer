import { Route, Routes } from "react-router-dom"
import SignUp from "./pages/signup"
import Signin from "./pages/signin"
import Todos from "./pages/todos"
import LandingPage from "./pages/landing"
import AddTodo from "./pages/todoAdd"
import TodoEdit from "./pages/todoEdit"
import TodoView from "./pages/todoView"

function App() {

  return <>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/todos" element={<Todos />} />
      <Route path="/todo/add" element={<AddTodo />} />
      <Route path="/todo/edit/:todoId" element={<TodoEdit />} />
      <Route path="/todo/view/:todoId" element={<TodoView />} />
      <Route path="*" element={<div>Not Found 404</div>} />
    </Routes>
  </>
}

export default App
