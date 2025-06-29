'use client';
import { useState, useEffect } from 'react';
import AddToCartModal from '../components/AddToCartModal';

const HomePage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [modalProductId, setModalProductId] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div className="container my-5">
      <div className="row">
        {products.map(p => (
          <div className="col-md-3 mb-4" key={p.id}>
            <div className="card">
              <img src={p.image_url} className="card-img-top" height={200} width={0.5} alt={p.name}/>
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">${p.price}</p>
                <button className="btn btn-primary me-2" onClick={() => window.location.href = `/product/${p.id}`}>Ver detalle</button>
                <button className="btn btn-success" onClick={() => setModalProductId(p.id)}>Agregar al carrito</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalProductId && (
        <AddToCartModal
          productId={modalProductId}
          onClose={() => setModalProductId(null)}
        />
      )}
    </div>
  );
};

export default HomePage;
