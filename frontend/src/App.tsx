import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import PrivateRoute from "./components/PrivateRoute"
import Home from "./pages/Home"
import Feedback from "./pages/Feedback"
import Store from "./pages/Store"
import FavProducts from "./pages/FavProducts"
import Login from "./pages/Login"
import ForgotPassword from "./pages/ForgotPassword"
import Signup from "./pages/Signup"
import ResetPassword from "./pages/ResetPassword"
import Product from "./pages/Product"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import Orders from "./pages/Orders"
import Profile from "./pages/Profile"
import Chatbot from "./Chatbot"

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path="feedback" element={<Feedback />}></Route>
            <Route path="products" element={<Store />}></Route>
            <Route path="products/:id" element={<Product />}></Route>
            <Route
              path="fav-products"
              element={
                <PrivateRoute>
                  <FavProducts />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="orders"
              element={
                <PrivateRoute>
                  <Orders />
                </PrivateRoute>
              }
            ></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="forgot-password" element={<ForgotPassword />}></Route>
            <Route path="signup" element={<Signup />}></Route>
            <Route
              path="reset-password/:token"
              element={<ResetPassword />}
            ></Route>
            <Route
              path="profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="cart"
              element={
                <PrivateRoute>
                  <Cart />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="checkout"
              element={
                <PrivateRoute>
                  <Checkout />
                </PrivateRoute>
              }
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <Chatbot />
    </>
  )
}

export default App
