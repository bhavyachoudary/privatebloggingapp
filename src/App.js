import React,{Suspense} from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const Register =React.lazy(()=>import('./components/Register/Registration')) ;
const Login =React.lazy(()=>import('./components/Login/Login')) ;
const ForgotPassword =React.lazy(()=>import('./components/Forgotpassword/ForgotPassword')) ;
const Navbar =React.lazy(()=>import('./components/Headers/Headers')) ;
const Footer =React.lazy(()=>import('./components/Footer/Footer')) ;

function App() {
  return (
    <>
      <Suspense fallback={<div><img src='./images/Loading.gif' alt="Loading..."/></div>}>
      <Router>
        <Routes>
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/footer" element={<Footer />} />
        </Routes>
      </Router>
  </Suspense>
    </>
  );
}

export default App;