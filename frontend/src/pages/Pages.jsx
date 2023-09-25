import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ShoppingCart, Button, TextInput } from "../components/UIComponents";

export const LandingPage = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/books")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const goToDetails = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  return (
    <div>
      <h1>Welcome to Our Bookstore</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} by {book.author} - ${book.price}
            <button onClick={() => goToDetails(book.id)}>View Details</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const BookDetailsPage = () => {
  const { id } = useParams(); // Get the book ID from the URL
  const [book, setBook] = useState(null);

  useEffect(() => {
    // Fetch book details from backend API
    axios
      .get(`http://localhost:3001/api/books/${id}`)
      .then((response) => {
        // Update the state with the fetched data
        setBook(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]); // Dependency array includes 'id' to refetch if it changes

  if (!book) {
    return <div>Loading...</div>; // Show a loading message while fetching data
  }

  return (
    <div>
      <h1>{book.title}</h1>
      <h2>By {book.author}</h2>
      <p>{book.description}</p>
      <button>Add to Cart</button>
    </div>
  );
};

// Main export
const Pages = () => {
  return (
    <div>
      <LandingPage />
    </div>
  );
};

export default Pages;
