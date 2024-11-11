import React, { useState } from 'react';
import axios from 'axios';
import './SearchBar.css';

const SearchBar = () => {
  const [keyword, setKeyword] = useState('');
  const [availability, setAvailability] = useState('');
  const [genre, setGenre] = useState('');
  const [location, setLocation] = useState('');
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [sort, setSort] = useState('genre');
  const [advancedSearch, setAdvancedSearch] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem('access_token');

    try {
      if (advancedSearch) {
        const query = {};
        if (keyword) query.query = keyword;
        if (genre) query.genre = genre;
        if (availability) query.availability = availability === 'true';
        if (location) query.location = location;

        const response = await axios.post('http://localhost:5001/api/books/query', query, {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        setResults(response.data.data);
      } else {
        const params = {
          owner: localStorage.getItem('user_id'),
          page,
          limit,
          sort
        };
        if (keyword) params.keyword = keyword;
        const response = await axios.get('http://localhost:5001/api/books', {
          headers: { Authorization: `Bearer ${accessToken}` },
          params
        });
        setResults(response.data.data);
      }
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const handlePageChange = (direction) => {
    setPage(page + direction);
  };

  return (
    <div className="search-bar-container">
      <h2>Search Books</h2>
      <form onSubmit={handleSearch} className="search-form">
        <div className="form-group">
          <label>Keyword:</label>
          <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Availability:</label>
          <select value={availability} onChange={(e) => setAvailability(e.target.value)}>
            <option value="">Any</option>
            <option value="true">Available</option>
            <option value="false">Lended</option>
          </select>
        </div>
        <div className="form-group">
          <label>Genre:</label>
          <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Location:</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Sort By:</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="genre">Genre</option>
            <option value="title">Title</option>
            <option value="author">Author</option>
          </select>
        </div>
        <div className="form-group">
          <label>Advanced Search:</label>
          <input
            type="checkbox"
            checked={advancedSearch}
            onChange={(e) => setAdvancedSearch(e.target.checked)}
          />
        </div>
        <button type="submit" className="search-button">Search</button>
      </form>
      {results.length > 0 && (
        <div className="search-results">
          <h3>Results:</h3>
          <table className="results-table">
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
              </tr>
            </thead>
            <tbody>
              {results.map((book) => (
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
                </tr>
              ))}
            </tbody>
          </table>
          {advancedSearch && (
            <div className="pagination-controls">
              {page > 1 && <button onClick={() => handlePageChange(-1)}>Previous</button>}
              {results.length === limit && <button onClick={() => handlePageChange(1)}>Next</button>}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;