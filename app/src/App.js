import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Appointments from './components/appointments/index';
import Doctors from './components/main/Doctors';
import ApplyDoctorForm from './components/ApplyDoctor/js';
import Account from "./components/account";
import NotFound from './components/error/';

function App() {
    return (
        <div>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />}/>
                <Route path="/home" element={<ProtectedRoute><Doctors /></ProtectedRoute>} />
                <Route path='/appointments/:id' element={<ProtectedRoute><Appointments /></ProtectedRoute>} />
                <Route path='/admin' element={<ProtectedRoute><ApplyDoctorForm /></ProtectedRoute>} />
                <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} /> 
                <Route path="*" element={<NotFound />} /> 
              </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
