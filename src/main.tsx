// import { Provider } from "react-redux";
// import { store, persistor } from "./state/store.ts";
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// import { PersistGate } from 'redux-persist/integration/react';
import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  RouterProvider 
} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen.tsx";
import ProductScreen from "./screens/ProductScreen.tsx";
import { Provider } from "react-redux";
import store from './state/store.ts';
import CartScreen from './screens/CartScreen.tsx';
import NotFound from './screens/NotFound.tsx';
import LoginScreen from './screens/LoginScreen.tsx';
import RegisterScreen from './screens/RegisterScreen.tsx'
import ResetPassword from "./screens/ResetPassword.tsx";
import ForgotPassword from './screens/ForgotPassword.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path='/cart' element={<CartScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='/reset-password/:resetToken' element={<ResetPassword />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='*' element={<NotFound />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
