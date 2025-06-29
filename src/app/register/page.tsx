'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Register = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ full_name: fullName, email, password, address, phone_number: phoneNumber })
      });

      if (!response.ok) throw new Error('Error al registrar el usuario');

      alert('Registro exitoso');
      router.push('/login');
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Registro de Usuario</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow-sm">
            <form onSubmit={handleRegister}>
              {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

              <div className="mb-3">
                <label className="form-label">Nombre completo</label>
                <input type="text" className="form-control" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Correo electrónico</label>
                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Dirección</label>
                <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>
              <div className="mb-3">
                <label className="form-label">Número de teléfono</label>
                <input type="text" className="form-control" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
              </div>
              <button type="submit" className="btn btn-primary w-100">Registrarse</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
