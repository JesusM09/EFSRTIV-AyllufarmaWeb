'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../../context/UserContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const { setUser } = useUser();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) throw new Error('Credenciales incorrectas');

      const data = await response.json();
      localStorage.setItem('user_id', data.user_id);
      localStorage.setItem('user_name', data.full_name);
      setUser({ id: data.user_id, full_name: data.full_name });
      router.push('/');
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Iniciar sesión</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow-sm">
            <form onSubmit={handleLogin}>
              {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Correo electrónico</label>
                <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>

              <button type="submit" className="btn btn-primary w-100">Iniciar sesión</button>
            </form>
            <div className="mt-3 text-center">
              <p>¿No tienes una cuenta? <a href="/register">Regístrate</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;