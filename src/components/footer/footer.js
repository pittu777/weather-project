import React from "react";

import openLogo from "./images/logo-open.png";
import wind from "./images/wind.png";
import time from "./images/logo-time.png";
import "./footer.css";
import { FaFacebook, FaInstagram, FaTwitter, FaBug } from "react-icons/fa";
import Logo from "./images/logo1.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section contact">
          <div className="report-heading">
            <a href="/contact" target="_blank">
              Report
            </a>
            <FaBug className="bug-icon" />
          </div>

          <p>Email: pittuprasanth14@gmail.com</p>
        </div>

        <div className="footer-section social-media">
          <h3>Follow Us</h3>
          <div className="social-icons">
            {/* Add your social media icons and links here */}
            <a
              href="https://www.google.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="social-icon" />
            </a>
            <a
              href="https://www.google.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="social-icon" />
            </a>

            <a
              href="https://www.google.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="social-icon" />
            </a>
            {/* Add more social media icons as needed */}
          </div>
        </div>
        <div className="footer-section weather-icons">
          <h3>powered by</h3>
          <div className="footer-box">
            <p className="body-3">
              <a
                href="https://openweather.org/api"
                rel="noreferrer"
                target="_blank"
              >
                <img
                  src={openLogo}
                  alt=""
                  width={150}
                  height={30}
                  loading="lazy"
                />
              </a>
            </p>
            <p className="body-3">
              <a
                href="https://rapidapi.com/hub"
                rel="noreferrer"
                target="_blank"
              >
                <img src={Logo} alt="" width={150} height={30} loading="lazy" />
              </a>
            </p>
            <p className="body-3">
              <a href="https://www.windy.com/" rel="noreferrer" target="_blank">
                <img src={wind} alt="" width={150} height={30} loading="lazy" />
              </a>
            </p>
            <p className="body-3">
              <a
                href="https://timezonedb.com/"
                rel="noreferrer"
                target="_blank"
              >
                <img src={time} alt="" width={150} height={30} loading="lazy" />
              </a>
            </p>
          </div>
        </div>
        {/* Add more footer sections here */}
      </div>
      <div className="footer-bottom">
        <p className="p">
          &copy; 2023 PITTU PRASANTH AND PRAKASH,PRAVEEN,SIVA,NISHANTH. All
          rights reserved.
        </p>
        <p className="p">Website designed and developed by my team and me</p>
      </div>
    </footer>
  );
};

export default Footer;
