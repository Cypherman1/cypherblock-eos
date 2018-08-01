import React from "react";

const Footer = props => {
  return (
    <footer className="footer">
      <div className="footer-block buttons" />
      <div className="footer-block author">
        <ul>
          <li>
            created by{" "}
            <a href="https://github.com/Cypherman1/CypherBlock">Cypherblock</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
