'use client';
import { useState, useEffect } from 'react';

interface OrderItem {
  product_id: number;
  quantity: number;
  price: number;
  name: string;
  image_url: string;
}

interface Order {
  id: number;
  created_at: string;
  total_amount: number;
  items: OrderItem[];
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const fetchOrders = async () => {
    try {
      // Obtener el user_id desde el localStorage
      const user_id = localStorage.getItem('user_id');
      if (!user_id) {
        setError('No se encontró el ID de usuario');
        setLoading(false);
        return;
      }

      // Realizar la llamada a la API pasando el user_id como parámetro
      const response = await fetch(`/api/orders?user_id=${user_id}`);
      if (!response.ok) {
        throw new Error('Error al obtener las órdenes');
      }
      const data = await response.json();
      setOrders(data);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleShowDetails = (orderId: number) => {
    const order = orders.find((order) => order.id === orderId);
    if (order) {
      setSelectedOrder(order);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p>Cargando órdenes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Órdenes</h2>
      <div className="list-group mx-5">
        {orders.map((order) => (
          <div key={order.id} className="list-group-item">
            <div className="d-flex justify-content-between mx-2">
              <div>
                <strong>Orden #{order.id}</strong><br />
                <span>Fecha: {new Date(order.created_at).toLocaleDateString()}</span>
              </div>
              <div>
                <strong>Total: ${order.total_amount}</strong>
              </div>
            </div>
            <button className="btn btn-info mt-2 mx-2" onClick={() => handleShowDetails(order.id)}>
              Ver detalles
            </button>
            {selectedOrder?.id === order.id && (
              <div className="mt-3 mx-5">
                <h5>Detalles de la Orden</h5>
                {order.items.map((item, index) => (
                  <div key={index} className="d-flex justify-content-between">
                    <div className="d-flex  my-3">
                      <img src={item.image_url} alt={item.name} className="img-thumbnail" style={{ width: '80px', height: '80px' }} />
                      <div className="mx-3">
                        <strong>{item.name}</strong><br />
                        <span>Precio: ${item.price}</span><br />
                        <span>Cantidad: {item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;