import React, { useState, useEffect } from 'react';
import bookLogo from './assets/books.png';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Link,  useNavigate } from 'react-router-dom';
import Book from './components/Books.jsx';
import SingleBook from './components/SingleBook.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Account from './components/Account.jsx';
import Navigations from './components/Navigations.jsx';

function App() 
{
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(null);
  //const navigate = useNavigate();
  
  useEffect(() => 
  {
    if(token)
    {
      const fetchUser = async () => 
      {
          try {
            const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me`,
              {
                headers: 
                {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
                },
              }
            );
            const data = await response.json();
            setUser(data);
          } 
          catch (error) 
          {
            console.error('Error fetching user:', error);
        }
      };

      fetchUser();
    }
    else
    {
        setUser(null);
    }
  }, []);

  const handleLogout = () => 
  {
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
  };

  
  return (
    <div>
      <header>
        <h1>
          <img id="logo-image" src={bookLogo} alt="Library Logo" />
          Library App
        </h1>
      </header>
      <Router>
        <Navigations isAuthenticated={!!token} onLogout={handleLogout} />
        <Routes>
        <Route path="/" element={<Book />} />
            <Route path="/books" element={<Book />} />
            <Route path="/books/:bookId" element={<SingleBook />} />
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/register" element={<Register setToken={setToken} />} />
            <Route path="/account" element={user ? <Account user={user} /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
