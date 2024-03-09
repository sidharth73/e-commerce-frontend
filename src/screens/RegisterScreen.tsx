import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import Spinner from '../components/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from "../state/user/userSlice";
import { useDispatch } from 'react-redux';
import { setCredentials } from '../state/user/userApiSlice';

const RegisterScreen = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [cpassword, setCpassword] = useState<string>('');
  const [registerUser,{isLoading}] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async(e: any) => {
    e.preventDefault();
    
    if (
      !name.trim() || 
      !email.trim() || 
      !password.trim() || 
      !cpassword.trim()
    ) {
      return alert("All fields are required!")
    }
    if (password.trim() !== cpassword.trim()) {
      return alert("Passwords do not match!")
    } else {
      try {
        console.log(name, email, password);
        const res = await registerUser({ name, email, password}).unwrap();
        dispatch(setCredentials({ ...res }))
        navigate('/')
        toast.success("Registered successfully!")
      } catch (error: any) {
        console.log(error);

        toast.error(error.data.message || error.message)
      }
    }
  };

  return (
    <div className="container mx-auto mt-8 mb-28 p-4 max-w-md ">
            <Toaster
            position="top-right"
            reverseOrder={true}
            />
            <h2 className="text-2xl font-semibold mb-4">Register</h2>
            <form onSubmit={handleRegister}>
                <div className="mb-4">
                    <label htmlFor="email" className="text-gray-700">Name:</label>
                    <input
                        id="name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="bg-white border border-gray-300 p-2 rounded-md mt-2 w-full"
                    />
                </div>
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
                <div className="mb-4">
                    <label htmlFor="password" className="text-gray-700">Confirm Password:</label>
                    <input
                        type="password"
                        id="cpassword"
                        className="bg-white border border-gray-300 p-2 rounded-md mt-2 w-full"
                        value={cpassword}
                        onChange={e => setCpassword(e.target.value)}
                    />
                </div>
    
                {/* {isLoadingPassword && <Spinner />} */}
                <button
                    type='submit'
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600"
                    onClick={handleRegister}
                    disabled={isLoading}
                >
                    Register
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
                Already have an account? <Link to="/login" className="text-blue-500">Sign In</Link>.
            </p>
        </div>
  )
}

export default RegisterScreen