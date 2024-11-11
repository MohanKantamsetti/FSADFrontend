import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Register from './components/Register';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import AddBook from './components/AddBook';
import SearchBar from './components/SearchBar';
import Logout from './components/Logout';
import Verify from './components/Verify';
import Home from './components/home';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import SearchBook from './components/SearchBook';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/add-book" element={<AddBook />} />
            <Route path="/search" element={<SearchBook />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;