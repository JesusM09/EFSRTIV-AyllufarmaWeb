import { NextResponse } from 'next/server';
import connection from '../../../../lib/db';

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