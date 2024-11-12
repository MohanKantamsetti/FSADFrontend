import React, { useState, useRef } from 'react';
import axios from 'axios';
import './SearchBook.css';

const SearchBook = () => {
  const [searchType, setSearchType] = useState('title');
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [sort, setSort] = useState('genre');
  const [results, setResults] = useState([]);
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const [advancedSearchFields, setAdvancedSearchFields] = useState({
    owner: '',
    author: '',
    genre: '',
    condition: '',
    availability: '',
    location: '',
    title: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const resultsRef = useRef(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem('access_token');

    setResults([]);
    setErrorMessage('');

    try {
      if (advancedSearch) {
        const query = {};
        for (const key in advancedSearchFields) {
          if (advancedSearchFields[key]) {
            query[key] = advancedSearchFields[key];
          }
        }

        const response = await axios.post('http://localhost:5001/api/books/query', query, {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        setResults(response.data.data);
      } else {
        const params = {
          [searchType]: searchText,
          page,
          limit,
          sort
        };

        const response = await axios.get('http://localhost:5001/api/books', {
          headers: { Authorization: `Bearer ${accessToken}` },
          params
        });
        setResults(response.data.data);
      }

      if (resultsRef.current) {
        resultsRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Search failed:', error);
      setErrorMessage(error.response.data.message);
    }
  };

  const handlePageChange = (direction) => {
    setPage(page + direction);
  };

  const handleAdvancedSearchChange = (e) => {
    const { name, value } = e.target;
    setAdvancedSearchFields({ ...advancedSearchFields, [name]: value });
  };

  return (
    <div className="search-book-container">
      <h2>Search Books</h2>
      {!advancedSearch && (
        <form onSubmit={handleSearch} className="search-form">
          <div className="simple-search">
            <div className="form-group-combined">
              <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                <option value="owner">Owner</option>
                <option value="author">Author</option>
                <option value="genre">Genre</option>
                <option value="condition">Condition</option>
                <option value="availability">Availability</option>
                <option value="location">Location</option>
                <option value="title">Title</option>
              </select>
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Enter search text"
              />
            </div>
            <div className="form-group-inline">
              <div className="form-group">
                <label>Page:</label>
                <input
                  type="number"
                  value={page}
                  onChange={(e) => setPage(Number(e.target.value))}
                  placeholder="Page"
                />
              </div>
              <div className="form-group">
                <label>Limit:</label>
                <input
                  type="number"
                  value={limit}
                  onChange={(e) => setLimit(Number(e.target.value))}
                  placeholder="Limit"
                />
              </div>
              <div className="form-group">
                <label>Sort By:</label>
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="genre">Genre</option>
                  <option value="title">Title</option>
                  <option value="author">Author</option>
                </select>
              </div>
            </div>
            <button type="submit" className="search-button">Search</button>
          </div>
        </form>
      )}

      <button onClick={() => setAdvancedSearch(!advancedSearch)} className="toggle-advanced-search">
        {advancedSearch ? 'Hide Advanced Search' : 'Show Advanced Search'}
      </button>

      {advancedSearch && (
        <form onSubmit={handleSearch} className="advanced-search-form">
          <div className="form-group">
            <input
              type="text"
              name="owner"
              value={advancedSearchFields.owner}
              onChange={handleAdvancedSearchChange}
              placeholder="Owner"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="author"
              value={advancedSearchFields.author}
              onChange={handleAdvancedSearchChange}
              placeholder="Author"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="genre"
              value={advancedSearchFields.genre}
              onChange={handleAdvancedSearchChange}
              placeholder="Genre"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="condition"
              value={advancedSearchFields.condition}
              onChange={handleAdvancedSearchChange}
              placeholder="Condition"
            />
          </div>
          <div className="form-group">
            <select
              name="availability"
              value={advancedSearchFields.availability}
              onChange={handleAdvancedSearchChange}
            >
              <option value="">Any</option>
              <option value="true">Available</option>
              <option value="false">Lended</option>
            </select>
          </div>
          <div className="form-group">
            <input
              type="text"
              name="location"
              value={advancedSearchFields.location}
              onChange={handleAdvancedSearchChange}
              placeholder="Location"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="title"
              value={advancedSearchFields.title}
              onChange={handleAdvancedSearchChange}
              placeholder="Title"
            />
          </div>
          <button type="submit" className="search-button">Search</button>
        </form>
      )}

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div ref={resultsRef}>
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
            {!advancedSearch && (
              <div className="pagination-controls">
                {page > 1 && <button onClick={() => handlePageChange(-1)}>Previous</button>}
                {results.length === limit && <button onClick={() => handlePageChange(1)}>Next</button>}
              </div>
            )}

            <p>Book Barter C</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBook;