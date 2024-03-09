import { useState } from "react";
import Spinner from "../components/Spinner"
import { useForgotPasswordMutation } from "../state/user/userSlice"
import toast, { Toaster } from "react-hot-toast";


const LoginScreen = () => {
  const [email, setEmail] = useState<string>("")
  const [forgotPassword, { isLoading: isLoadingPassword }] = useForgotPasswordMutation();
  
  const handleLogin = async (e:any) => {
    e.preventDefault()
    try {
        if (!email) alert("Please enter your email");

        else{
            try {
                const res = await forgotPassword({ email }).unwrap();
                setEmail('')
                toast.success(res.message)
            } catch (err: any) {
                toast.error(err?.data?.message || err.error)
            }
        }
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
            <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
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
                {isLoadingPassword && <Spinner />}
                <button
                    type='submit'
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600 w-full"
                    onClick={handleLogin}
                    disabled={isLoadingPassword}
                >
                    Submit
                </button>
            </form>
        </div>
  )
}

export default LoginScreen