import React from "react";
import "../styles/Header.css";

export default function Header() {
  return (
    <>
    <header className="header">
      <h1>Crypto app</h1>
        <nav className="nav">
            <ul>
                <li><a href="#liste">Liste des cryptomonnaies</a></li>
                <li><a href="#favoris">Favoris</a></li>
                <li><a href="#connexion">Connexion</a></li>
            </ul>
        </nav>
    </header>
    </>
  );
}