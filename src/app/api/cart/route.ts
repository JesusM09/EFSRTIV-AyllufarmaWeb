import { NextResponse } from 'next/server';
import connection from '../../../../lib/db';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get('user_id');
    if (!user_id) {
      return NextResponse.json({ message: 'Usuario no autenticado' }, { status: 401 });
    }

    const [rows]: any = await connection.query(
      `SELECT ci.*, p.name, p.price, p.image_url
       FROM cart_items ci
       JOIN products p ON ci.product_id = p.id
       WHERE ci.user_id = ?`,
      [user_id]
    );

    return NextResponse.json(rows);
  } catch (err) {
    console.error('Error al obtener carrito:', err);
    return NextResponse.json({ message: 'Error al obtener el carrito' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { user_id, product_id, quantity } = await req.json();

    const [existing]: any = await connection.query(
      'SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?',
      [user_id, product_id]
    );

    if (Array.isArray(existing) && existing.length > 0) {
      await connection.query(
        'UPDATE cart_items SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?',
        [quantity, user_id, product_id]
      );
    } else {
      await connection.query(
        'INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)',
        [user_id, product_id, quantity]
      );
    }

    return NextResponse.json({ message: 'Producto agregado al carrito' });
  } catch (err) {
    console.error('Error al agregar al carrito:', err);
    return NextResponse.json({ message: 'Error al agregar al carrito' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { user_id, product_id } = await req.json();
    if (!user_id) {
      return NextResponse.json({ message: 'Usuario no autenticado' }, { status: 401 });
    }

    await connection.query(
      'DELETE FROM cart_items WHERE user_id = ? AND product_id = ?',
      [user_id, product_id]
    );

    return NextResponse.json({ message: 'Producto eliminado del carrito' });
  } catch (err) {
    console.error('Error al eliminar del carrito:', err);
    return NextResponse.json({ message: 'Error al eliminar del carrito' }, { status: 500 });
  }
}
