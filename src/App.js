import React from 'react';
import Header from './components/Header/Header';
import UserList from './components/UserList/UserList';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <UserList />
      <Footer />
    </div>
  );
}

export default App;
