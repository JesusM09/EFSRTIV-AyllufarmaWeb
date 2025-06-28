'use client';

import { useState, useEffect } from 'react';

interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image_url: string;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Obtener los productos del carrito al cargar la página
  const fetchCartItems = async () => {
    try {
      const response = await fetch('/api/cart');
      if (!response.ok) {
        throw new Error('Error al obtener el carrito');
      }
      const data = await response.json();
      setCartItems(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  // Función para eliminar un producto del carrito
  const handleRemove = async (productId: number) => {
    try {
      const user_id = localStorage.getItem('user_id');
      await fetch('/api/cart', {
        method: 'DELETE',
        body: JSON.stringify({ user_id, product_id: productId }),
      });
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    } catch (err) {
      console.error('Error al eliminar el producto:', err);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Carrito de compras</h2>
      <div className="row">
        {cartItems.length === 0 ? (
          <p>El carrito está vacío.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="col-md-4 mb-4">
              <div className="card">
                <img src={item.image_url} alt={item.name} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">{item.description}</p>
                  <p><strong>${item.price}</strong></p>
                  <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center">
                      <button className="btn btn-secondary" onClick={() => handleRemove(item.id)}>
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CartPage;