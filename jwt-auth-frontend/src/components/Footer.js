import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p>&copy; 2025 Polysia. All Rights Reserved.</p>
    </footer>
  );
};

const footerStyle = {
  backgroundColor: '#000',
  color: '#fff',
  textAlign: 'center',
  padding: '10px',
  position: 'fixed',
  width: '100%',
  bottom: '0',
};

export default Footer;
