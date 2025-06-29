import { NextResponse } from 'next/server';
import connection from '../../../../lib/db';

// Método GET para obtener las órdenes
export async function GET(req: Request) {
  try {
    // Obtener el user_id desde la URL (enviado como query param)
    const url = new URL(req.url);
    const user_id = url.searchParams.get('user_id');

    if (!user_id) {
      return NextResponse.json({ message: 'Usuario no autenticado' }, { status: 401 });
    }

    const query = `
      SELECT orders.id, orders.created_at, orders.total_amount, 
             order_items.product_id, order_items.quantity, order_items.price, 
             products.name, products.image_url
      FROM orders
      LEFT JOIN order_items ON orders.id = order_items.order_id
      LEFT JOIN products ON order_items.product_id = products.id
      WHERE orders.user_id = ?
    `;

    const [results]: any = await connection.query(query, [user_id]);

    const orders: any[] = [];

    results.forEach((row: any) => {
      let order = orders.find((o) => o.id === row.id);
      if (!order) {
        order = {
          id: row.id,
          created_at: row.created_at,
          total_amount: row.total_amount,
          items: [],
        };
        orders.push(order);
      }
      order.items.push({
        product_id: row.product_id,
        quantity: row.quantity,
        price: row.price,
        name: row.name,
        image_url: row.image_url,
      });
    });

    return NextResponse.json(orders);
  } catch (err) {
    console.error('Error al obtener las órdenes:', err);
    return NextResponse.json({ message: 'Error al obtener las órdenes' }, { status: 500 });
  }
}

// Manejar la creación del pedido
export async function POST(req: Request) {
  try {
    const { user_id } = await req.json();

    if (!user_id) {
      return NextResponse.json({ message: 'Usuario no autenticado' }, { status: 401 });
    }

    // Aquí obtienes los productos del carrito para hacer el pedido
    const query = `
      SELECT ci.product_id, ci.quantity, p.price 
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.user_id = ?
    `;
    const [cartItems]: any = await connection.query(query, [user_id]);

    if (cartItems.length === 0) {
      return NextResponse.json({ message: 'El carrito está vacío' }, { status: 400 });
    }

    // Calcular el total
    let totalAmount = 0;
    cartItems.forEach((item: any) => {
      totalAmount += item.quantity * item.price;
    });

    // Insertar el pedido en la tabla `orders`
    const orderQuery = 'INSERT INTO orders (user_id, total_amount, status) VALUES (?, ?, ?)';
    const [orderResult]: any = await connection.query(orderQuery, [user_id, totalAmount, 'pending']);

    // Insertar los productos del carrito en `order_items`
    const order_id = orderResult.insertId;
    const orderItemsQuery = `
      INSERT INTO order_items (order_id, product_id, quantity, price)
      VALUES (?, ?, ?, ?)
    `;
    for (const item of cartItems) {
      await connection.query(orderItemsQuery, [order_id, item.product_id, item.quantity, item.price]);
    }

    // Eliminar los productos del carrito después de crear el pedido
    await connection.query('DELETE FROM cart_items WHERE user_id = ?', [user_id]);

    return NextResponse.json({ message: 'Pedido creado con éxito' });
  } catch (err) {
    console.error('Error al crear el pedido:', err);
    return NextResponse.json({ message: 'Error al crear el pedido' }, { status: 500 });
  }
}