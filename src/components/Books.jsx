/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
import React, { useState, useEffect } from 'react';
import { Link,  useNavigate } from 'react-router-dom';
import '../index.css';

function Book() 
{
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [searchParam, setSearchParam] = useState("")

  useEffect(() => 
  {
    fetch (`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books`)
      .then ((response) => response.json())
      .then ((data) => setBooks(data.books))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  const handleBookClick = (bookId) =>
  {
      navigate(`/books/${bookId}`);
  };

  const booksToDisplay = searchParam ? books.filter((book) =>
    book.title.toLowerCase().includes(searchParam.toLowerCase())) : books;

  return (
    <>
      <div>
        <h2 className='pageTitle'>Books</h2>
        <div>
          <label>
            Search:{" "}
            <input type="text" placeholder="search" onChange={(e) => setSearchParam(e.target.value)} />
          </label>
        </div>
        <ul>
          {books && books.length > 0 ? ( booksToDisplay.map((book) => (
              <li key={book.id}>
                <h3>{book.title}</h3>
                <img src={book.coverimage} alt={book.title} style={{ width: '200px', height: '250px'  }}/>
                <br />
                <button onClick={() => handleBookClick(book.id)} style={{ cursor: "pointer" }} className='buttonStyle'>
                  See Details
                </button>
              </li>
            ))
          ) : (
            <p>No books available.</p>
     