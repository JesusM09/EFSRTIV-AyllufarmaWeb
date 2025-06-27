'use client';
import '../../styles/globals.scss';
import { useState } from 'react';

const cartItems = [
  { id: 1, name: 'Termómetro Digital', quantity: 1, price: 25.50, image_url: 'https://cdnx.jumpseller.com/copofi-eirl/image/52522232/resize/1000/1000?1725412344' },
  { id: 2, name: 'Guantes MédicosGuantes Médicos', quantity: 2, price: 10.00, image_url: 'https://http2.mlstatic.com/D_NQ_NP_723168-MLA80366661065_112024-O.webp' }
];

const Cart = () => {
  const [items, setItems] = useState(cartItems);

  // Función para actualizar la cantidad de un producto
  const updateQuantity = (id: number, quantity: number) => {
    setItems(items.map(item => item.id === id ? { ...item, quantity } : item));
  };

  // Función para eliminar un producto del carrito
  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  // Calcular el total
  const total = items.reduce((total, item) => total + item.quantity * item.price, 0);
  const shipping = 10.00; // Costo de envío fijo (puede ser dinámico)
  const serviceFee = 5.00; // Tarifa de servicio fija (puede ser dinámica)
  const grandTotal = total + shipping + serviceFee;

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 text-white bg-primary p-2 rounded">Carrito de Compras</h2>
      <div className="row">
        {/* Listado de productos */}
        <div className="col-md-8">
          <div className="list-group">
            {items.map((item) => (
              <div key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div className='d-flex align-items-center w-50 gap-3'>
                  <img src={item.image_url} alt={item.name} className="img-thumbnail" style={{ width: '80px', height: '80px' }} />
                  <div>
                    <span>{item.name}</span><br />
                    <span>${item.price}</span>
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
            ))}
          </div>
          <div className="mt-3 p-3 rounded text-end">
            <strong>Cantidad Total:</strong> {items.reduce((sum, item) => sum + item.quantity, 0)}<br />
            <h4>Total Productos:</h4> <h4>${total.toFixed(2)}</h4>
          </div>
        </div>

        {/* Resumen de la compra (Checkout) */}
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h4 className="bg-success text-white p-2 rounded">Resumen de la Compra</h4>
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Envío</span>
                <span>${shipping.toFixed(2)}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Tarifa de Servicio</span>
                <span>${serviceFee.toFixed(2)}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between font-weight-bold">
                <span>Total a Pagar</span>
                <span>${grandTotal.toFixed(2)}</span>
              </li>
            </ul>
            <button className="btn btn-success w-100 mt-3">Crear Pedido</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;