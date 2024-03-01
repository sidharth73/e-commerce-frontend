import { Routes, Route } from "react-router-dom";
// import './App.css'
import RegisterForm from "./components/RegisterForm";
import PageNotFound from "./components/PageNotFound";
import LoginForm from "./components/LoginForm";

function App() {

  return (
    <>
      <Routes>
        <Route path="/register" element={
        <RegisterForm />
        } />
        <Route path="/login" element={<LoginForm />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
