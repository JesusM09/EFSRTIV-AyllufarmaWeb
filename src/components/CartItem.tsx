
const cartItems = [
  { id: 1, name: 'Termómetro Digital', quantity: 2, price: 25.50 },
  { id: 2, name: 'Guantes Médicos', quantity: 5, price: 10.00 }
];

const Cart = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center">Tu Carrito</h1>
      <div className="mt-6">
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between items-center border-b py-2">
            <span>{item.name}</span>
            <span>{item.quantity} x ${item.price}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-4">
        <span className="font-semibold">Total: ${cartItems.reduce((total, item) => total + item.quantity * item.price, 0)}</span>
        <button className="bg-green-500 text-white py-2 px-4 rounded-md">Proceder al checkout</button>
      </div>
    </div>
  );
};

export default Cart;