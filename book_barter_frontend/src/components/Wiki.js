import React from 'react';
import './Wiki.css';

const Wiki = () => {
  return (
    <div className="how-to-guide-container">
      <h1>Book Barter Platform - User Guide</h1>
      
      <section>
        <h2>Overview</h2>
        <p>Welcome to the Book Barter Platform! This guide will walk you through the various features and functionalities of the application, including registration, login, profile management, book listing, and book search.</p>
      </section>
      
      <section>
        <h2>Home Page</h2>
        <ul>
          <li><strong>Navigation:</strong></li>
          <ul>
            <li><strong>Book Barter (Logo):</strong> Click to return to the home page.</li>
            <li><strong>Login:</strong> Navigate to the login page (if not logged in).</li>
            <li><strong>Logout:</strong> Log out of your account (if logged in).</li>
            <li><strong>Home:</strong> Navigate to the home page (if not on the home page).</li>
            <li><strong>Profile:</strong> Navigate to your profile page (if logged in and not on the profile page).</li>
          </ul>
        </ul>
      </section>
      
      <section>
        <h2>Registration Steps</h2>
        <ol>
          <li><strong>Access Registration Page:</strong> Click on the "Register" link in the navigation bar.</li>
          <li><strong>Fill in Registration Details:</strong>
            <ul>
              <li><strong>Email:</strong> Enter your email address.</li>
              <li><strong>Password:</strong> Enter a secure password.</li>
              <li><strong>Book Preferences:</strong> Add your book preferences.</li>
            </ul>
          </li>
          <li><strong>Submit Registration:</strong> Click on the "Register" button. If successful, you will be redirected to the verification page. If an error occurs, an error message will be displayed.</li>
        </ol>
      </section>
      
      <section>
        <h2>Verification Steps</h2>
        <ol>
          <li><strong>Access Verification Page:</strong> After registration, you will be redirected to the verification page.</li>
          <li><strong>Enter Verification Code:</strong> Enter the verification code sent to your email.</li>
          <li><strong>Submit Verification Code:</strong> Click on the "Verify" button. If successful, a success message will be displayed, and you will be redirected to the login page. If an error occurs, an error message will be displayed.</li>
        </ol>
      </section>
      
      <section>
        <h2>Login Steps</h2>
        <ol>
          <li><strong>Access Login Page:</strong> Click on the "Login" link in the navigation bar.</li>
          <li><strong>Fill in Login Details:</strong>
            <ul>
              <li><strong>Email:</strong> Enter your email address.</li>
              <li><strong>Password:</strong> Enter your password.</li>
            </ul>
          </li>
          <li><strong>Submit Login:</strong> Click on the "Login" button. If successful, you will be redirected to your profile page. If an error occurs, an error message will be displayed.</li>
          <li><strong>Forgot Password:</strong> Click on the "Forgot Password" link to access the forgot password page.</li>
        </ol>
      </section>
      
      <section>
        <h2>Forgot Password Steps</h2>
        <ol>
          <li><strong>Access Forgot Password Page:</strong> Click on the "Forgot Password" link on the login page.</li>
          <li><strong>Enter Email:</strong> Enter your email address.</li>
          <li><strong>Submit Request:</strong> Click on the "Reset Password" button. If successful, you will be redirected to the reset password page. If an error occurs, an error message will be displayed.</li>
        </ol>
      </section>
      
      <section>
        <h2>Reset Password Steps</h2>
        <ol>
          <li><strong>Access Reset Password Page:</strong> After submitting the forgot password request, you will be redirected to the reset password page.</li>
          <li><strong>Fill in Reset Password Details:</strong>
            <ul>
              <li><strong>Email:</strong> Enter your email address.</li>
              <li><strong>New Password:</strong> Enter a new password.</li>
              <li><strong>Verification Code:</strong> Enter the verification code sent to your email.</li>
            </ul>
          </li>
          <li><strong>Submit Reset Password:</strong> Click on the "Set Password" button. If successful, you will be redirected to the login page. If an error occurs, an error message will be displayed.</li>
        </ol>
      </section>
      
      <section>
        <h2>Profile Page</h2>
        <ol>
          <li><strong>Access Profile Page:</strong> Click on the "Profile" link in the navigation bar (if logged in).</li>
          <li><strong>View Profile Information:</strong>
            <ul>
              <li><strong>Email:</strong> View your email address.</li>
              <li><strong>User ID:</strong> View your user ID.</li>
            </ul>
          </li>
        </ol>
      </section>
      
      <section>
        <h2>Book CRUD</h2>
        <ol>
          <li><strong>Access Add Book Page:</strong> Click on the "Add Book" button on the profile page.</li>
          <li><strong>Fill in Book Details:</strong>
            <ul>
              <li><strong>Title:</strong> Enter the book title.</li>
              <li><strong>Author:</strong> Enter the book author.</li>
              <li><strong>Genre:</strong> Enter the book genre.</li>
              <li><strong>ISBN:</strong> Enter the book ISBN.</li>
              <li><strong>Condition:</strong> Enter the book condition.</li>
              <li><strong>Availability:</strong> Select the book availability.</li>
              <li><strong>Location:</strong> Enter the book location.</li>
              <li><strong>Description:</strong> Enter a description of the book.</li>
            </ul>
          </li>
          <li><strong>Submit Book:</strong> Click on the "Add Book" button. If successful, a success message will be displayed, and you will be redirected to your profile page. If an error occurs, an error message will be displayed.</li>
        <li><strong>View Listed Books:</strong> View the list of books you have listed, displayed in a table format.</li>
          <li><strong>Edit Book:</strong> Click on the "Edit" button next to a book to edit its details. Update the book details and click on the "Update Book" button. If successful, the book details will be updated. If an error occurs, an error message will be displayed.</li>
          <li><strong>Delete Book:</strong> Click on the "Delete" button next to a book to delete it. If successful, the book will be removed from your list. If an error occurs, an error message will be displayed.</li>
          <li><strong>Browse Books:</strong> Click on the "Browse Books" button to navigate to the book search page.</li>
        </ol>
      </section>
      
      <section>
        <h2>Search Books</h2>
        <ol>
          <li><strong>Access Search Books Page:</strong> Click on the "Browse Books" button on the profile page.</li>
          <li><strong>Simple Search:</strong>
            <ul>
              <li><strong>Search By:</strong> Select a search type (owner, author, genre, condition, availability, location, title).</li>
              <li><strong>Search Text:</strong> Enter search text.</li>
              <li><strong>Page:</strong> Enter the page number.</li>
              <li><strong>Limit:</strong> Enter the number of results per page.</li>
              <li><strong>Sort By:</strong> Select a sort field (genre, title, author).</li>
              <li>Click on the "Search" button. If successful, search results will be displayed in a table format. If an error occurs, an error message will be displayed.</li>
            </ul>
          </li>
          <li><strong>Advanced Search:</strong>
            <ul>
              <li>Click on the "Show Advanced Search" button to access advanced search fields.</li>
              <li>Fill in the advanced search fields (owner, author, genre, condition, availability, location, title).</li>
              <li>Click on the "Search" button. If successful, search results will be displayed in a table format. If an error occurs, an error message will be displayed.</li>
            </ul>
          </li>
        </ol>
      </section>
    </div>
  );
};

export default Wiki;