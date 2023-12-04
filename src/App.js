import { BrowserRouter as Routers, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AuthProvider from './context/AuthProvider';
import PrivateRoute from './context/PrivateRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import ProductsManagement from './pages/ProductsManagement';
import Categories from './pages/Categories';
import Products from './pages/Products';
import Components from "./pages/Components";
import Leads from "./pages/Leads";
import NotFound from "./pages/NotFound";
import CreateUser from "./components/user/CreateUser";
import CreateProduct from './components/product/CreateProduct';
import ViewProduct from './components/product/ViewProduct';
import EditProduct from './components/product/EditProduct';
import CreateComponent from "./components/component/CreateComponent";
import ViewComponent from "./components/component/ViewComponent";
import EditComponent from "./wrappers/edit-component/EditComponent";
import FeaturedProducts from "./pages/FeaturedProducts";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <AuthProvider>
        <Routers>
          <Routes>

            <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
              <Route path="/" element={<Products createProduct="0" />} />
              <Route path="/users" element={<Users />} />
              <Route path="/createuser" element={<CreateUser />} />
              <Route path="/productsmanagement" element={<ProductsManagement />}>
                <Route path="/productsmanagement/categories" element={<Categories />} />
                <Route path="/productsmanagement/products" element={<Products />} />
                <Route path="/productsmanagement/featuredproducts" element={<FeaturedProducts />} />
                <Route path="/productsmanagement/createproduct" element={<CreateProduct />} />
                <Route path="/productsmanagement/viewproduct/:id" element={<ViewProduct />} />
                <Route path="/productsmanagement/editproduct/:id" element={<EditProduct />} />
              </Route>
              <Route path="/components" element={<Components />} />
              <Route path="/createcomponent" element={<CreateComponent />} />
              <Route path="/viewcomponent/:id" element={<ViewComponent />} />
              <Route path="/editcomponent/:id" element={<EditComponent />} />
              <Route path="/leads" element={<Leads />} />
            </Route>
            <Route path="/login" element={< Login />} />
            <Route path="*" element={< NotFound />} />

          </Routes>
        </Routers>
      </AuthProvider>
    </div>
  );
}

export default App;
