'use client';
import { useState } from 'react';

// Datos de ejemplo de órdenes y productos
const orders = [
  {
    orderId: 123131,
    total: 1231,
    date: '2025-06-24',
    products: [
      { name: 'Termómetro Digital', price: 25.50, quantity: 2 },
      { name: 'Guantes Médicos', price: 10.00, quantity: 5 }
    ]
  },
  {
    orderId: 123132,
    total: 800,
    date: '2025-06-23',
    products: [
      { name: 'Mascarilla Quirúrgica', price: 5.00, quantity: 10 }
    ]
  }
];

const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);

  // Función para alternar la vista detallada de la orden
  const toggleOrderDetails = (orderId: number) => {
    setSelectedOrder(selectedOrder === orderId ? null : orderId);
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Órdenes</h2>
      <div className="list-group">
        {orders.map((order) => (
          <div key={order.orderId} className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <strong>Orden nro {order.orderId}</strong><br />
                <span>Fecha: {order.date}</span>
              </div>
              <div>
                <strong>Total a pagar: ${order.total}</strong>
                <button className="btn btn-info mx-3" onClick={() => toggleOrderDetails(order.orderId)}>
                  {selectedOrder === order.orderId ? '-' : '+'}
                </button>
              </div>
            </div>

            {selectedOrder === order.orderId && (
              <div className="mt-3">
                <h5></h5>
                <div className="list-group">
                  {order.products.map((product, index) => (
                    <div key={index} className="list-group-item d-flex justify-content-between">
                      <span>{product.name} x {product.quantity}</span>
                      <span>${(product.price * product.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;