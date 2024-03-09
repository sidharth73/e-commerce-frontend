import { Link, useNavigate } from "react-router-dom"
import Spinner from "../components/Spinner"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useLoginMutation } from "../state/user/userSlice"
import { setCredentials } from "../state/user/userApiSlice";
import toast, { Toaster } from "react-hot-toast";


const LoginScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [login, { isLoading }] = useLoginMutation()
  
  const handleLogin = async (e:any) => {
    e.preventDefault()
    try {
        const res = await login({ email, password }).unwrap();
        dispatch(setCredentials({ ...res }))
        navigate("/")
        toast.success("Login Successful")
    } catch (error: any) {
        console.log(error);
        
        toast.error(error.data.message || error.message)
    }
  }
  return (
    <div className="container mx-auto mt-8 mb-28 p-4 max-w-md ">
            <Toaster
            position="top-right"
            reverseOrder={true}
            />
            <h2 className="text-2xl font-semibold mb-4">Login</h2>
            <form onSubmit={handleLogin}>
                <div className="mb-4">
                    <label htmlFor="email" className="text-gray-700">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="bg-white border border-gray-300 p-2 rounded-md mt-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="text-gray-700">Password:</label>
                    <input
                        type="password"
                        id="password"
                        className="bg-white border border-gray-300 p-2 rounded-md mt-2 w-full"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <p className="mt-1">
                    Forgot Password?{' '}
                    <span className="text-blue-500 cursor-pointer">
                        <a href="/forgot-password">Click here</a>
                    </span>
                </p>
                {/* {isLoadingPassword && <Spinner />} */}
                <button
                    type='submit'
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600"
                    onClick={handleLogin}
                    disabled={isLoading}
                >
                    Login
                </button>
                <button
                    type='button'
                    className="bg-red-600 text-white px-4 py-2 rounded-md mt-4 ml-3 hover:bg-red-700"
                    // onClick={handleGoogleAuth}
                >
                    Sign in with Google
                </button>
                {isLoading && <Spinner />}
            </form>
            <p className="mt-4">
                Don't have an account? <Link to="/register" className="text-blue-500">Register here</Link>.
            </p>
    </div>
  )
}

export default LoginScreen