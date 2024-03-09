import { Outlet } from "react-router-dom";
// import './App.css'
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container py-3 mx-auto flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App
