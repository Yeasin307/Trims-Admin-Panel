import { BrowserRouter as Routers, Routes, Route } from "react-router-dom";
import './App.css';
import Login from './Components/Login/Login';
import AuthProvider from './Context/AuthProvider';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Dashboard from './Components/Dashboard/Dashboard';
import Users from './Components/Users/Users';
import ProductManagementMenu from './Components/ProductManagement/ProductManagementMenu/ProductManagementMenu';
import Categories from './Components/ProductManagement/Categories/Categories';
import Products from './Components/ProductManagement/Products/Products';
import CreateProduct from './Components/ProductManagement/CreateProduct/CreateProduct';
import ViewProduct from './Components/ProductManagement/ViewProduct/ViewProduct';
import EditProduct from './Components/ProductManagement/EditProduct/EditProduct';
import Components from "./Components/Components/Components";
import CreateComponent from "./Components/Components/CreateComponent";
import ViewComponent from "./Components/Components/ViewComponent";
import EditComponent from "./Components/Components/EditComponent";
import Leads from "./Components/Leads/Leads";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routers>
          <Routes>

            <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
              <Route path="/" element={<Products createProduct="0" />} />
              <Route path="/users" element={<Users />} />
              <Route path="/productmanagement" element={<ProductManagementMenu />}>
                <Route path="/productmanagement/categories" element={<Categories />} />
                <Route path="/productmanagement/products" element={<Products />} />
                <Route path="/productmanagement/createproduct" element={<CreateProduct />} />
                <Route path="/productmanagement/viewproduct/:id" element={<ViewProduct />} />
                <Route path="/productmanagement/editproduct/:id" element={<EditProduct />} />
              </Route>
              <Route path="/components" element={<Components />} />
              <Route path="/createcomponent" element={<CreateComponent />} />
              <Route path="/viewcomponent/:id" element={<ViewComponent />} />
              <Route path="/editcomponent/:id" element={<EditComponent />} />
              <Route path="/leads" element={<Leads />} />
            </Route>
            <Route path="/login" element={< Login />} />

          </Routes>
        </Routers>
      </AuthProvider>
    </div>
  );
}

export default App;
