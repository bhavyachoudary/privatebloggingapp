import React, { Suspense } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Register = React.lazy(() => import('./components/Register/Registration'));
const Login = React.lazy(() => import('./components/Login/Login'));
const ForgotPassword = React.lazy(() => import('./components/Forgotpassword/ForgotPassword'));
const Navbar = React.lazy(() => import('./components/Headers/Headers'));
const Footer = React.lazy(() => import('./components/Footer/Footer'));
const Dashboard = React.lazy(() => import('./components/Dashboard/Dashboard'));
const CreateBlog = React.lazy(() => import('./components/CreateBlog/CreateBlog'));
const MyPost = React.lazy(() => import('./components/Posts/Posts'));
const SinglePage = React.lazy(() => import('./components/SinglePage/BlogPage'));
const Profile = React.lazy(() => import('./components/Profile/Profile'));
const Thankyou = React.lazy(() => import('./components/Footer/Thankyou'));
function App() {
  return (
    <>
      <Suspense fallback={<div><img src='./images/load2.gif' alt="Loading..." className="center" /></div>}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/createblog" element={<CreateBlog />} />
            <Route path="/myposts" element={<MyPost />} />
            <Route path="/preview" element={<SinglePage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/thankyou" element={<Thankyou />} />
          </Routes>
          <Footer />
        </Router>
      </Suspense>
    </>
  );
}

export default App;