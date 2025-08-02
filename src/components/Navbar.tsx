import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const { pathname } = location;

  return(
    <nav className='main-navigation-bar'>
      <ul>
        <li><Link to="/" className={pathname === "/" || window.location.pathname === "/about" ? "active" : ""}>About</Link></li>
        <li><Link to="/projects" className={pathname.includes("/projects") ? "active" : ""}>Projects</Link></li>
        <li><Link to="/blog" className={pathname.includes("/blog") ? "active" : ""}>Blog</Link></li>
      </ul>
    </nav>
  )
}