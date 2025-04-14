import React from 'react';

const Footer = () => {
  return (
    <footer className="footer text-center text-light py-4" style={{ backgroundColor: '#0d1b2a' }}>
      <p style={{ marginBottom: '0.3rem' }}>
        🦇 Gotham Blog © 2025 | Gotham’s loudest silent witness
      </p>
      <a
        href="https://github.com/aksiniapomi/GothamBlog.git"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: '#9ca3af', textDecoration: 'underline' }}
      >
        View the GitHub Repo
      </a>
    </footer>
  );
};

export default Footer;