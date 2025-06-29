import { Link } from 'react-router-dom';

export default function Navbar() {
  return(
    <nav className='main-navigation-bar'>
      <ul>
        <li><Link to="/">About</Link></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/blog">Blog</Link></li>
      </ul>
    </nav>
  )
}