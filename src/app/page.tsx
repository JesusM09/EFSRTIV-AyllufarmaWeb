import '../styles/globals.scss';
import { ProductCard } from '../components/ProductCard';

const products = [
  { id: 1, name: 'Termómetro Digital', description: 'Termómetro para medición de temperatura corporal.', price: 25.50, image_url: 'https://cdnx.jumpseller.com/copofi-eirl/image/52522232/resize/1000/1000?1725412344' },
  { id: 2, name: 'Guantes Médicos', description: 'Guantes de látex para uso en procedimientos médicos.', price: 10.00, image_url: 'https://http2.mlstatic.com/D_NQ_NP_723168-MLA80366661065_112024-O.webp' },
  { id: 3, name: 'Mascarilla Quirúrgica', description: 'Mascarillas desechables para protección contra virus.', price: 5.00, image_url: 'https://static.soltrak.com.pe/fcsaprdsoltrak01/2021/08/012-1.png' },
  { id: 4, name: 'Termómetro Digital', description: 'Termómetro para medición de temperatura corporal.', price: 25.50, image_url: 'https://cdnx.jumpseller.com/copofi-eirl/image/52522232/resize/1000/1000?1725412344' },
  { id: 5, name: 'Guantes Médicos', description: 'Guantes de látex para uso en procedimientos médicos.', price: 10.00, image_url: 'https://http2.mlstatic.com/D_NQ_NP_723168-MLA80366661065_112024-O.webp' },
  { id: 6, name: 'Mascarilla Quirúrgica', description: 'Mascarillas desechables para protección contra virus.', price: 5.00, image_url: 'https://static.soltrak.com.pe/fcsaprdsoltrak01/2021/08/012-1.png' },
  { id: 7, name: 'Termómetro Digital', description: 'Termómetro para medición de temperatura corporal.', price: 25.50, image_url: 'https://cdnx.jumpseller.com/copofi-eirl/image/52522232/resize/1000/1000?1725412344' },
  { id: 9, name: 'Guantes Médicos', description: 'Guantes de látex para uso en procedimientos médicos.', price: 10.00, image_url: 'https://http2.mlstatic.com/D_NQ_NP_723168-MLA80366661065_112024-O.webp' },
  { id: 10, name: 'Mascarilla Quirúrgica', description: 'Mascarillas desechables para protección contra virus.', price: 5.00, image_url: 'https://static.soltrak.com.pe/fcsaprdsoltrak01/2021/08/012-1.png' },
  { id: 11, name: 'Termómetro Digital', description: 'Termómetro para medición de temperatura corporal.', price: 25.50, image_url: 'https://cdnx.jumpseller.com/copofi-eirl/image/52522232/resize/1000/1000?1725412344' },
  { id: 12, name: 'Guantes Médicos', description: 'Guantes de látex para uso en procedimientos médicos.', price: 10.00, image_url: 'https://http2.mlstatic.com/D_NQ_NP_723168-MLA80366661065_112024-O.webp' },
  { id: 13, name: 'Mascarilla Quirúrgica', description: 'Mascarillas desechables para protección contra virus.', price: 5.00, image_url: 'https://static.soltrak.com.pe/fcsaprdsoltrak01/2021/08/012-1.png' },
];

const Home = () => {
  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Bienvenidos a Ayllufarma</h1>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {products.map((product) => (
          <div key={product.id} className="col">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;