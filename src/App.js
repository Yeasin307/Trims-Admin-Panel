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

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routers>
          <Routes>
            <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
              <Route path="/users" element={<Users />}></Route>
            </Route>
            <Route path="/login" element={< Login />} >
            </Route>
          </Routes>
        </Routers>
      </AuthProvider>
    </div>
  );
}

export default App;
