import { decement, increment, incrementAsync, incrementByAmount } from "../state/counter/counterSlice";
import { AppDispatch, RootState } from "../state/store"
import { useDispatch, useSelector } from "react-redux"
import { logIn, logOut } from "../state/user/userSlice";

const Counter = () => {
  const email = useSelector((state: RootState) => state.email);
  const dispatch: AppDispatch = useDispatch();

  return (
    <div>
        {email === "" ? <h1>Not logged in!</h1> : <h1>{email}</h1>}
        <button onClick={() => {
            dispatch(increment())
        }}>Increment</button>
        <button onClick={() => {
            dispatch(decement())
        }}>Decrement</button>
        {email === "" && <button onClick={() => {
            dispatch(logIn({
                name: "sid",
                email: "jms33@gmail.com",
                password: "123456l"
            }))
        }}>
            Login
        </button>}
        {email && <button onClick={() => {
            dispatch(logOut())
        }}>
            Logout
        </button>}
    </div>
  )
}

export default Counter