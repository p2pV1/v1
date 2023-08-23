import { Link } from "react-router-dom";

export function NavBar() {
  return (
    <nav className="nav">
      <span>Logo</span>
      <Link to="/next" className="btn-primary">
        Save & Exit
      </Link>
    </nav>
  );
}
