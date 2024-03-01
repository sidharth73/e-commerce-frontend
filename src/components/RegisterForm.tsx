import axios, { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import Navbar from './Navbar';

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const submitregister = async(data:any) => {
    data.role = "user";

    try {
      const res= await axios.post('http://localhost:8000/auth/register', data,{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });

      console.log(res.data);
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data.error); 
      }
    }
    
    reset();
  }

  return (
    <>
    <Navbar />
    <div className="flex h-screen items-center justify-center sm:w-full">
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gradient-to-r from-cyan-500 to-teal-500 py-12 px-8">
    <form  onSubmit={handleSubmit((data) => {submitregister(data)})} className="flex flex-col gap-6">
      <h1 className="font-bold text-2xl flex justify-center items-center">Register</h1>
        <input 
          placeholder="Enter username" 
          {...register('username',{ required: true })} 
          className="w-80 border-2 border-black rounded-md p-1"
        />
        {errors.username && <p className='text-rose-600 text-lg'>Username is required.</p>}

        <input 
          placeholder="Enter password" 
          {...register('password',{ required: true })} 
          className="w-80 border-2 border-black rounded-md p-1"
        />
        {errors.password && <p className='text-rose-600 text-lg'>Password is required.</p>}

        <input 
          placeholder="Confirm password" 
          {...register('password_confirmation',{ required: true, validate: (val: string) => {
            if (watch('password') != val) {
              return "Your password do not match"
            }
          } 
          })} 
          className="w-80 border-2 border-black rounded-md p-1"
        />
        {errors.password_confirmation && <p className='text-rose-600 text-lg'>Confirm Password is required.</p>}

        <button 
          type="submit" 
          className="bg-black text-white rounded-md p-1"
        >Register</button>
    </form>
    <p className='flex justify-center items-center pt-8'>
      Already registered? 
      <a href='/login' className="text-blue-600 pl-2">Login</a>
    </p>
    </div>
    </div>
    </>
  )
}

export default RegisterForm