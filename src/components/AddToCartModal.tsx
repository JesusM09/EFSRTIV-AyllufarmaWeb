'use client';
import { useState } from 'react';

interface AddToCartModalProps {
  productId: number;
  onClose: () => void;
}

const AddToCartModal = ({ productId, onClose }: AddToCartModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = async () => {
    const user_id = localStorage.getItem('user_id');
    if (!user_id) {
      setMessage('Debes iniciar sesión para añadir al carrito.');
      setShowResult(true);
      return;
    }

    const res = await fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id, product_id: productId, quantity }),
    });
    const data = await res.json();

    if (res.ok) setMessage('Producto añadido correctamente. ¿Ir al carrito?');
    else setMessage(data.message || 'Error al añadir al carrito');
    setShowResult(true);
  };

  return (
    <div className="modal show d-block" tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          {!showResult ? (
            <>
              <div className="modal-header">
                <h5 className="modal-title">Añadir al carrito</h5>
                <button type="button" className="btn-close" onClick={onClose}></button>
              </div>
              <div className="modal-body">
                <label>Cantidad:</label>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="form-control"
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
                <button className="btn btn-primary" onClick={handleSubmit}>Añadir</button>
              </div>
            </>
          ) : (
            <>
              <div className="modal-header">
                <h5 className="modal-title">Resultado</h5>
              </div>
              <div className="modal-body">
                <p>{message}</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={onClose}>Cerrar</button>
                {message.includes('correctamente') && (
                  <button className="btn btn-success" onClick={() => (window.location.href = '/cart')}>
                    Ir al carrito
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddToCartModal;