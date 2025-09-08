import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="footer footer-horizontal footer-center bg-base-300 text-base-content rounded p-10 fixed bottom-0">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by
            UniPulse
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
