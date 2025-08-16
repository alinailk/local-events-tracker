import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <p>© {new Date().getFullYear()} Etkinlik Yönetimi • Ali tarafından geliştirildi 💻</p>
        </footer>
    );
};

export default Footer;
