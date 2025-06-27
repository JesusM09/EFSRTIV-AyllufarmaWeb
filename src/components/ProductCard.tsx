interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="card h-100">
      <img src={product.image_url} className="card-img-top" height="250px" alt={product.name} />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <p className="card-text">${product.price}</p>
        <a href="#" className="btn btn-primary">Agregar al carrito</a>
      </div>
    </div>
  );
};