'use client';
import { useState } from 'react';

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);

  const product = {
    name: 'Termómetro Digital',
    description: 'Termómetro para medición de temperatura corporal.',
    characteristics: ['Medición precisa', 'Pantalla digital', 'Batería incluida'],
    price: 25.50,
    image_url: 'https://cdnx.jumpseller.com/copofi-eirl/image/52522232/resize/1000/1000?1725412344',
  };

  const handleQuantityChange = (value: number) => {
    if (value < 1) return;
    setQuantity(value);
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Detalle del Producto</h2>
      <div className="row">
        {/* Imagen y detalles del producto */}
        <div className="col-md-6">
          <img src={product.image_url} alt={product.name} className="img-fluid rounded" />
        </div>

        {/* Información del producto */}
        <div className="col-md-6">
          <h4>{product.name}</h4>
          <p>{product.description}</p>
          <h5>Características:</h5>
          <ul>
            {product.characteristics.map((characteristic, index) => (
              <li key={index}>{characteristic}</li>
            ))}
          </ul>
          <h5>Precio por unidad: ${product.price.toFixed(2)}</h5>
          
          {/* Input de cantidad */}
          <div className="d-flex align-items-center mt-3">
            <button className="btn btn-secondary" onClick={() => handleQuantityChange(quantity - 1)}>-</button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => handleQuantityChange(Number(e.target.value))}
              className="form-control mx-2 text-center"
              style={{ width: '60px' }}
            />
            <button className="btn btn-secondary" onClick={() => handleQuantityChange(quantity + 1)}>+</button>
          </div>
          <button className="btn btn-primary mt-3">Agregar al carrito</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;