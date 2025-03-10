import React from 'react';

function Header() {
  return (
    <header style={styles.header}>
      <h1 style={styles.heading}>Welcome Samurai</h1>
    </header>
  );
}

const styles = {
  header: {
    textAlign: 'center',
    padding: '1rem',
    backgroundColor: '#6200ea', // Background color of the header
    color: 'white', // Color for the rest of the header content (if needed)
    fontSize: '1.5rem'
  },
  heading: {
    color: 'white', // Change this to your desired font color
  },
};

export default Header;
