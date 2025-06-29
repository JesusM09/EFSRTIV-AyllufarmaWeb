'use client';

import Link from 'next/link';
import { useUser } from '../context/UserContext';

const Navbar = () => {
  const { user, logout } = useUser();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" href="/">Ecommerce Médico</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" href="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/cart">Carrito</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/orders">Pedidos</Link>
            </li>
            {!user && 
            <li className="nav-item">
              <Link className="nav-link" href="/login">Login</Link>
            </li>
            }
            {user && (
              <>
                <li className="nav-item navbar-text">
                  <span> ¡Bienvenido {user.full_name}!</span>
                </li>
                <li className="nav-item">
                  <button onClick={logout} className="btn btn-ghost nav-link">
                    Cerrar sesión
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;