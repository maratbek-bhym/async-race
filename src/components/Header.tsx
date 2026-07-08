import { NavLink } from 'react-router-dom';

const navLinkClass = ({ isActive }: { isActive: boolean }): string =>
  isActive ? 'nav-link nav-link--active' : 'nav-link';

export default function Header() {
  return (
    <header className="header">
      <h1 className="header__title">🏁 Async Race</h1>
      <nav className="header__nav">
        <NavLink to="/" end className={navLinkClass}>
          Garage
        </NavLink>
        <NavLink to="/winners" className={navLinkClass}>
          Winners
        </NavLink>
      </nav>
    </header>
  );
}
