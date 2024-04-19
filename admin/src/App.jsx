import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Feedbacks from "./pages/Feedbacks";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import Brands from "./pages/Brands";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import AddProduct from "./pages/AddProduct";
import AddBrand from "./pages/AddBrand";
import AddCategory from "./pages/AddCategory";
import FeedbackDetails from "./pages/FeedbackDetails";
import OrderDetails from "./pages/OrderDetails";
import UpdateUser from "./pages/UpdateUser";
import Ratings from "./pages/Ratings";
import Rating from "./pages/Rating";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="feedbacks" element={<Feedbacks />} />
          <Route path="feedbacks/:id" element={<FeedbackDetails />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:id" element={<OrderDetails />} />
          <Route path="users" element={<Users />} />
          <Route path="users/:id" element={<UpdateUser />} />
          <Route path="brands" element={<Brands />} />
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<Categories />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="products/:id" element={<AddProduct />} />
          <Route path="brands/add" element={<AddBrand />} />
          <Route path="brands/:id" element={<AddBrand />} />
          <Route path="categories/add" element={<AddCategory />} />
          <Route path="categories/:id" element={<AddCategory />} />
          <Route path="ratings" element={<Ratings />} />
          <Route path="ratings/:id" element={<Rating />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
