import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Appointments from './components/appointments/index';
import Admin from "./components/Admin";
import Doctors from './components/main/Doctors';
import Account from "./components/account";

function App() {
    return (
        <div>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />}/>
                <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/doctors" element={<ProtectedRoute><Doctors /></ProtectedRoute>} />
                <Route path='/appointments/:id' element={<ProtectedRoute><Appointments /></ProtectedRoute>} />
                <Route path='/admin' element={<ProtectedRoute><Admin /></ProtectedRoute>} />
                <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} /> 
              </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;



// // App.js
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
// import LoginForm from './LoginForm';
// import RegistrationForm from './RegistrationForm';
// import data from './data.json';
//
// const App = () => {
//     const [users, setUsers] = useState(data);
//
//     const addUser = (user) => {
//         const newUser = { ...user, id: users.length + 1 };
//         setUsers([...users, newUser]);
//     };
//
//     return (
//         <Router>
//             <Switch>
//                 <Route exact path="/">
//                     <Redirect to="/login" />
//                 </Route>
//                 <Route path="/login">
//                     <LoginForm users={users} />
//                 </Route>
//                 <Route path="/register">
//                     <RegistrationForm addUser={addUser} />
//                 </Route>
//             </Switch>
//         </Router>
//     );
// };
//
// export default App;
