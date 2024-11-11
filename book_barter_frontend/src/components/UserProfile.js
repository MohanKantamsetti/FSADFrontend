import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserProfile.css';

const UserProfile = () => {
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [books, setBooks] = useState([]);
  const [editBook, setEditBook] = useState(null);
  const [formValues, setFormValues] = useState({
    title: '',
    author: '',
    genre: '',
    isbn: '',
    condition: '',
    availability: true,
    location: '',
    description: ''
  });

  const fetchUserProfile = async () => {
    const userId = localStorage.getItem('user_id');
    const accessToken = localStorage.getItem('access_token');
    const email = localStorage.getItem('email');
    setEmail(email);
    setUserId(userId);

    console.log('Fetching books for user ID:', userId);

    try {
      // Fetch books listed by the user
      const booksResponse = await axios.post('http://localhost:5001/api/books/query', { bbid: userId }, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      console.log('Books fetched:', booksResponse.data.data);
      setBooks(booksResponse.data.data);
    } catch (error) {
      console.error('Error fetching user profile or books:', error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleEdit = (book) => {
    setEditBook(book);
    setFormValues(book);
  };

  const handleDelete = async (bid) => {
    const accessToken = localStorage.getItem('access_token');
    try {
      await axios.delete(`http://localhost:5001/api/books/${bid}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      setBooks(books.filter(book => book.bid !== bid));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem('access_token');
    try {
      await axios.patch('http://localhost:5001/api/books/', formValues, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      setBooks(books.map(book => (book.bid === formValues.bid ? formValues : book)));
      setEditBook(null);
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <div className="user-profile-container">
      <h2>User Profile</h2>
      <div className="user-details">
        <p><strong>Email:</strong> {email}</p>
        <p><strong>User ID:</strong> {userId}</p>
      </div>
      <h3>Books Listed</h3>
      <button onClick={() => window.location.href='/add-book'} className="add-book-button">Add Book</button>
      <button onClick={() => window.location.href='/search'} className="browse-books-button">Browse Books</button>
      {editBook && (
        <form onSubmit={handleUpdate} className="edit-book-form">
          <div className="form-group">
            <label>Title:</label>
            <input type="text" name="title" value={formValues.title} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Author:</label>
            <input type="text" name="author" value={formValues.author} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Genre:</label>
            <input type="text" name="genre" value={formValues.genre} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>ISBN:</label>
            <input type="text" name="isbn" value={formValues.isbn} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Condition:</label>
            <input type="text" name="condition" value={formValues.condition} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Availability:</label>
            <select name="availability" value={formValues.availability} onChange={handleInputChange} required>
              <option value={true}>Available</option>
              <option value={false}>Lended</option>
            </select>
          </div>
          <div className="form-group">
            <label>Location:</label>
            <input type="text" name="location" value={formValues.location} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea name="description" value={formValues.description} onChange={handleInputChange}></textarea>
          </div>
          <button type="submit" className="update-book-button">Update Book</button>
        </form>
      )}
      <table className="books-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Condition</th>
            <th>Availability</th>
            <th>Location</th>
            <th>Description</th>
            <th>ISBN</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.bid}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>{book.condition}</td>
              <td className={book.availability ? 'available' : 'not-available'}>
                {book.availability ? 'Available' : 'Lended'}
              </td>
              <td>{book.location}</td>
              <td>{book.description}</td>
              <td><a href={`https://isbnsearch.org/isbn/${book.isbn}`} target="_blank" rel="noopener noreferrer">{book.isbn}</a></td>
              <td>
                <button onClick={() => handleEdit(book)} className="edit-button">Edit</button>
                <button onClick={() => handleDelete(book.bid)} className="delete-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserProfile;