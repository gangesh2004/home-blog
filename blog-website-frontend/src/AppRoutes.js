import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import SkeletonBlogPage from './components/BlogSkeleton/SkeletonBlogPage';


const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const CreateBlogPage = lazy(() => import('./pages/CreateBlogPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const BlogDetailPage = lazy(() => import('./pages/BlogDetailPage'));
const LogOutPage = lazy(() => import('./pages/LogOutPage'));

const AppRoutes = () => (

  <Router>
    <Navbar />
    <ToastContainer />
    <Suspense fallback={<SkeletonBlogPage/> }>
      <Routes>
        

        <Route path="*" element={<HomePage />} />
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
        <Route path="/blog/:id" element={<BlogDetailPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/create-blog" element={<CreateBlogPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/logout" element={<LogOutPage />} />
        </Route>
      </Routes>
    </Suspense>
    <Footer />
  </Router>
);

export default AppRoutes;
