import "../styles/Header.css";

// Composant de navigation principal
export default function Header() {
  return (
    <header className="header">
      <h1>CryptoApp</h1>
      <nav className="nav">
          <ul>
              <li><a href="#connexion">Connexion</a></li>
          </ul>
      </nav>
    </header>
  );
}