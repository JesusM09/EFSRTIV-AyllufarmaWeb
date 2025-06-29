'use client';
import { useState, useEffect, Key } from 'react';
import { useParams } from 'next/navigation';
import AddToCartModal from '../../../components/AddToCartModal';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(setProduct);
  }, [id]);

  if (!product) return <p>Cargando...</p>;

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6">
          <img src={product.image_url} alt={product.name} className="img-fluid"/>
        </div>
        <div className="col-md-6">
          <h1 className='mb-4 mt-5'>{product.name}</h1>
          <p>{product.description}</p>
          <ul>
            {product.characteristics?.map((item: { [s: string]: unknown; } | ArrayLike<unknown>, index: Key | null | undefined) => (
                  <li key={index}>
                    {Object.entries(item).map(([key, value]) => (
                      <span key={key}>{`${key}: ${value} `}</span>
                    ))}
                  </li>
              ))}
          </ul>
          <h2 className='my-5'><strong>Precio:</strong> ${product.price}</h2>
          <button className="btn btn-success" onClick={() => setShowModal(true)}>Agregar al carrito</button>
        </div>
      </div>

      {showModal && (
        <AddToCartModal productId={product.id} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
