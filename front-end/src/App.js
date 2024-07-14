import React from 'react'
import Header from './components/header/Header';
// imports from react router dom 
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Home from './pages/home/Home';
import Posts from './pages/posts/Posts';
import Create from './pages/create/Create';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard.jsx';
import Login from './pages/forms/Login.jsx';
import Register from './pages/forms/Register.jsx';
import Footer from './components/Footer/Footer';
import PostDetails from './pages/post-details/PostDetails';
import Category from './pages/category/Category';
import Profile from './pages/profile/Profile';
import UsersTable from './pages/AdminDashboard/UsersTable';
import PostsTable from './pages/AdminDashboard/PostsTable';
import CategoriesTable from './pages/AdminDashboard/CategoriesTable';
import CommentsTable from './pages/AdminDashboard/CommentsTable';
import ForgotPassword from './pages/forms/ForgotPassword';
import ResetPassword from './pages/forms/ResetPassword';
import NotFound from './pages/not-found/NotFound';
import {useSelector} from "react-redux"
import VerifyEmail from './pages/verify-email/VerifyEmail';

function App() {
  // عشان لما اعمل login مش عايز login page هي اللي تظهر
  const {user} = useSelector(state => state.auth); // كده خدنا ال user

  return (
    <BrowserRouter>
        <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={!user? <Login /> : <Navigate to="/" /> } />
            <Route path='/register' element={!user? <Register /> : <Navigate to="/" /> } />
            <Route path='/users/:userId/verify/:token' element={!user ? <VerifyEmail /> : <Navigate to='/' />} />

            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/reset-password/:userId/:token' element={<ResetPassword />} />
            <Route path='/profile/:id' element={<Profile />} />

            <Route path='/posts' element={<Posts />} />
            <Route path='/create' element={ user? <Create /> :<Navigate to="/" /> } />
            <Route path='/posts/details/:id' element={<PostDetails />} />
            <Route path='/posts/categories/:category' element={<Category />} />

          <Route path='admin-dashboard'>
            <Route index element={user?.isAdmin? <AdminDashboard />: <Navigate to="/" /> } />
            <Route path='users-table' element={user?.isAdmin? <UsersTable /> : <Navigate to="/" />} />
            <Route path='posts-table' element={user?.isAdmin? <PostsTable /> : <Navigate to="/" />} />
            <Route path='categories-table' element={user?.isAdmin? <CategoriesTable /> : <Navigate to="/" />} />
            <Route path='comments-table' element={user?.isAdmin? <CommentsTable /> : <Navigate to="/" />} />
          </Route>

          <Route path='*' element={<NotFound />} />

          </Routes>
            <Footer />
    </BrowserRouter>
  );
}

export default App;