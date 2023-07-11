import React from "react";
import "./Footer.css";
import {Link} from 'react-router-dom'
export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer__content">
          <div className="footer__column">
            <h4 className="footer__column-heading">About Us</h4>
            <p className="footer__column-text">
              Welcome to Store4you, your premier destination for
              cutting-edge consumer electronics. With a deep-rooted passion for
              technology, we are dedicated to providing our customers with the
              latest and most innovative gadgets and devices in the market. From
              smartphones and tablets to smart home systems and audio equipment,
              we have carefully curated a comprehensive collection of
              high-quality products that cater to tech enthusiasts of all kinds.
              Our commitment to excellence extends beyond our product selection;
              we strive to offer exceptional customer service, fast and reliable
              shipping, and a seamless shopping experience. Whether you're a
              casual user or a tech-savvy individual, trust Store4you to
              bring you the best in consumer electronics, and embark on an
              exciting journey of discovery and convenience.
            </p>
          </div>
          <div className="footer__column">
            <h4 className="footer__column-heading">Contact</h4>
            <p className="footer__column-text">Email: info@example.com</p>
            <p className="footer__column-text">Phone: 123-456-7890</p>
          </div>
          <div className="footer__column">
            <h4 className="footer__column-heading">Follow Us</h4>
            <div className="footer__social-icons">
              <Link to="#" className="footer__social-icon">
                <i className="fab fa-facebook"></i>
              </Link>
              <Link to="#" className="footer__social-icon">
                <i className="fab fa-twitter"></i>
              </Link>
              <Link to="#" className="footer__social-icon">
                <i className="fab fa-instagram"></i>
              </Link>
            </div>
          </div>
        </div>
        <p className="footer__copy">
          &copy; 2023 Your Website. All rights reserved.
        </p>
      </footer>
    </>
  );
}
