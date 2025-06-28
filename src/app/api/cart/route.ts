import { NextResponse } from 'next/server';
import connection from '../../../../lib/db'; // Asegúrate de que el path sea correcto

export async function GET() {
  try {
    const user_id = 1; // Este valor lo puedes obtener del localStorage o cookies
    const query = 'SELECT * FROM cart_items WHERE user_id = ?'; // Asegúrate de que el query sea correcto

    // Aquí estamos esperando la respuesta de la base de datos usando el método de promesas
    const [results] = await connection.query(query, [user_id]);

    return NextResponse.json(results); // Devuelve los productos del carrito
  } catch (err) {
    console.error('Error al obtener carrito:', err);
    return NextResponse.json({ message: 'Error al obtener el carrito' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { user_id, product_id, quantity } = await req.json(); // Obtiene los datos del carrito

    // Insertar un nuevo producto en el carrito
    const query = 'INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)';
    await connection.query(query, [user_id, product_id, quantity]);

    return NextResponse.json({ message: 'Producto agregado al carrito' });
  } catch (err) {
    console.error('Error al agregar al carrito:', err);
    return NextResponse.json({ message: 'Error al agregar al carrito' }, { status: 500 });
  }
}