'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';  // Cambié de useRouter a useParams

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

const ProductDetail = () => {
  const { id } = useParams();  // Usamos useParams para obtener el id de la URL
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/products/${id}`) // Asegúrate de que esta URL esté correcta
        .then((response) => response.json())
        .then((data) => setProduct(data))
        .catch((err) => console.error('Error fetching product:', err));
    }
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">{product.name}</h1>
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.image_url}
            alt={product.name}
            className="img-fluid"
          />
        </div>
        <div className="col-md-6">
          <h4>Description</h4>
          <p>{product.description}</p>
          <h5>Price</h5>
          <p>${product.price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;