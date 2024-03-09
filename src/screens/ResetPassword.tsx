import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useResetPasswordMutation } from "../state/user/userSlice";
import toast, { Toaster } from 'react-hot-toast';
import Spinner from '../components/Spinner';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../state/user/userApiSlice';

const ResetPassword = () => {
  const {resetToken} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  
  const [password, setPassword] = useState<string>();
  const [cpassword, setCpassword] = useState<string>();
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    if(password !== cpassword) alert("Passwords do not match!")
    else{
      try {
          const res = await resetPassword({ password, resetToken }).unwrap();
          dispatch(setCredentials({ ...res }))
          navigate("/")
          toast.success("Login Successful")
      } catch (err: any) {
          toast.error(err?.data?.message || err.error)
      }
    }
  }

  return (
    <div className='container mx-auto mt-8 mb-28 p-4 max-w-md'>
      <Toaster
        position="top-right"
        reverseOrder={true}
      />
      <h2 className='text-2xl font-semibold mb-4'>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label htmlFor='email' className='text-gray-700'>Password:</label>
          <input 
            type='password'
            id='password'
            value={password} 
            onChange={e => setPassword(e.target.value)}
            className='bg-white border border-gray-300 p-2 rounded-md mt-2 w-full'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='password' className='text-gray-700'>
            Confirm Password:
          </label>
          <input 
            type='password'
            id='cpassword'
            value={cpassword} 
            onChange={e => setCpassword(e.target.value)}
            className='bg-white border border-gray-300 p-2 rounded-md mt-2 w-full'
          />
        </div>
        {isLoading && <Spinner />}
        <button 
        type="submit"  
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600 w-full"
        disabled={isLoading}
        onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default ResetPassword