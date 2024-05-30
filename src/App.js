import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';


import Create from './pages/create/create';
import Dashboard from './pages/dashboard/dashboard';
import Login from './pages/login/login';
import Project from './pages/project/project';
import Signup from './pages/signup/signup';
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import OnlineUsers from './components/OnlineUsers'


function App() {
  const {user,authIsReady}=useAuthContext();
  return (
    <div className="App">
      {authIsReady &&
       <BrowserRouter>
       {user && <Sidebar/>}
         <div className="container">
           <Navbar />
         <Routes>
         
           
           <Route exact path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
           <Route exact path="/create" element={user ? <Create /> : <Navigate to="/login" />} />
           <Route exact path="/project/:id" element={user ? <Project /> : <Navigate to="/login" />} />
           <Route exact path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
           <Route exact path="/signup" element={!user ? <Signup /> : <Navigate to="/dashboard"/>} />
 
         </Routes>
         </div>
         {user && <OnlineUsers />}
       </BrowserRouter>
      }
     
    </div>
  );
}

export default App
