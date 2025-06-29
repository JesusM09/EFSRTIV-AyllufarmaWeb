'use client';
import router from 'next/router';
import '../../styles/globals.scss';
import { useState, useEffect } from 'react';
import { Span } from 'next/dist/trace';

interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image_url: string;
}

const Cart = () => {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const user_id = localStorage.getItem('user_id');
        const response = await fetch(`/api/cart?user_id=${user_id}`);
        const data = await response.json();
        console.log(data)
        setItems(data);
      } catch (error) {
        console.error('Error al obtener el carrito:', error);
      }
    };

    fetchCartItems();
  }, []);

  const updateQuantity = (id: number, quantity: number) => {
    setItems(prev =>
      prev.map(item => item.id === id ? { ...item, quantity } : item)
    );
  };

  const removeItem = async (id: number) => {
    try {
      const user_id = localStorage.getItem('user_id'); // Obtener el user_id del localStorage

      if (!user_id) {
        console.error('Usuario no autenticado');
        return;
      }

      const product = items.find(item => item.id === id); // Encontrar el producto a eliminar
      if (!product) return;

      await fetch('/api/cart', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id, // Pasar el user_id
          product_id: id, // Pasar el product_id
        }),
      });

      setItems(prev => prev.filter(item => item.id !== id)); // Actualizar el estado después de eliminar el producto
    } catch (error) {
      console.error('Error al eliminar item:', error);
    }
  };

  let total = 0;
  if (Array.isArray(items)) {
    for (const item of items) {
      total += item.quantity * item.price;
    }
  }
  const shipping = 10;
  const serviceFee = 5;
  const grandTotal = total + shipping + serviceFee;

  const createOrder = async () => {
    try {
      const user_id = localStorage.getItem('user_id');
      if (!user_id) {
        console.error('Usuario no autenticado');
        return;
      }

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Pedido creado:', data);
      } else {
        console.error('Error al crear el pedido');
      }
    } catch (error) {
      console.error('Error al crear el pedido:', error);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Carrito de Compras</h2>
      <div className="row">
        <div className="col-md-8">
          <div className="list-group">
            {items.length ? items.map((item) => (
              <div key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div className='d-flex align-items-center w-50 gap-3'>
                  <img src={item.image_url} alt={item.name} className="img-thumbnail" style={{ width: '80px', height: '80px' }} />
                  <div>
                    <span>{item.name}</span><br />
                    <span>${item.price} = {item.quantity >1 ? <span>${item.price *item.quantity}</span> : <span></span>} </span>
                  </div>
                  
                </div>
                <div>
                  <div className="d-flex align-items-center">
                    <button className="btn btn-secondary btn-sm" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, Math.max(1, parseInt(e.target.value)))}
                      className="form-control form-control-sm mx-2 text-center"
                      style={{ width: '60px' }}
                    />
                    <button className="btn btn-secondary btn-sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <button className="btn btn-danger btn-sm" onClick={() => removeItem(item.id)}>Eliminar</button>
              </div>
            )) : <span>No hay productos en tu carrito</span>}
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h4 className="bg-success text-white p-2 rounded">Resumen de la Compra</h4>
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between">
                <span>Subtotal</span>
                {items.length ? <span>${total.toFixed(2)}</span> : "-" }
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Envío</span>
                {items.length ? <span>${shipping.toFixed(2)}</span> : "-" }
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Tarifa de Servicio</span>
                {items.length ? <span>${serviceFee.toFixed(2)}</span> : "-" }
              </li>
              <li className="list-group-item d-flex justify-content-between font-weight-bold">
                <span>Total a Pagar</span>
                {items.length ? <span>${grandTotal.toFixed(2)}</span> : "-" }
              </li>
            </ul>
            <button className="btn btn-success w-100 mt-3" onClick={createOrder}>Crear Pedido</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
