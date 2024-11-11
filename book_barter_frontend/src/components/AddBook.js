import React, { useState } from 'react';
import axios from 'axios';
import './AddBook.css';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [isbn, setIsbn] = useState('');
  const [condition, setCondition] = useState('');
  const [availability, setAvailability] = useState(true);
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const handleAddBook = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('user_id');
    const accessToken = localStorage.getItem('access_token');

    try {
      const response = await axios.post('http://localhost:5001/api/books', {
        owner: userId,
        title,
        author,
        genre,
        isbn,
        condition,
        availability,
        location,
        description
      }, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      console.log(response.data);
      // Handle successful book addition (e.g., show a success message or redirect)
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <div className="add-book-container">
      <h2>Add a New Book</h2>
      <form onSubmit={handleAddBook} className="add-book-form">
        <div className="form-group">
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Author:</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Genre:</label>
          <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
        </div>
        <div className="form-group">
          <label>ISBN:</label>
          <input type="text" value={isbn} onChange={(e) => setIsbn(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Condition:</label>
          <input type="text" value={condition} onChange={(e) => setCondition(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Availability:</label>
          <select value={availability} onChange={(e) => setAvailability(e.target.value === 'true')} required>
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>
        </div>
        <div className="form-group">
          <label>Location:</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          <button type="submit" className="add-book-button">Add Book</button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;