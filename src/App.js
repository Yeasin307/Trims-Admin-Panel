import './App.css';
import {
  BrowserRouter as Routers,
  Routes,
  Route,
} from "react-router-dom";
import Login from './Components/Login/Login';
import AuthProvider from './Context/AuthProvider';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Dashboard from './Components/Dashboard/Dashboard';
import Users from './Components/Users/Users';
import ProductManagementMenu from './Components/ProductManagement/ProductManagementMenu/ProductManagementMenu';
import Categories from './Components/ProductManagement/Categories/Categories';
import Products from './Components/ProductManagement/Products/Products';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routers>
          <Routes>

            <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>}>

              <Route path="/users" element={<Users />}></Route>
              <Route path="/productmanagement" element={<ProductManagementMenu />}>

                <Route path="/productmanagement/categories" element={<Categories />} />
                <Route path="/productmanagement/products" element={<Products />} />

              </Route>

            </Route>
            <Route path="/login" element={< Login />} />

          </Routes>
        </Routers>
      </AuthProvider>
    </div>
  );
}

export default App;
