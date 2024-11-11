import React from 'react';
import './home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Book Barter</h1>
      <nav>
        <ul className="navbar">
          <li><a href="/">Home</a></li>
          <li><a href="/login">Login</a></li>
        </ul>
      </nav>
      <section className="info-section">
        <h2>About Book Barter</h2>
        <p>
          Book Barter is a platform designed to facilitate the exchange and lending of books among users. Our mission is to create a community where book lovers can easily share and access a wide range of books.
        </p>
        <p>
          Problem: Many people have books that they no longer need, while others are looking for those exact books. Traditional methods of exchanging books are often inefficient and limited to small circles.
        </p>
        <p>
          Solution: Book Barter offers a seamless way to list books for exchange or lending, search for available books, and connect with other users. Whether you're looking to declutter your bookshelf or find a new read, Book Barter has you covered.
        </p>
      </section>
    </div>
  );
};

export default Home;