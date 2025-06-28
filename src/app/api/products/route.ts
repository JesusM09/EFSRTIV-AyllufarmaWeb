import { NextResponse } from 'next/server';
import connection from '../../../../lib/db';

export async function GET() {
  try {
    const query = 'SELECT * FROM products';
    const [results] = await connection.query(query);
    return NextResponse.json(results); // Devolver todos los productos
  } catch (err) {
    console.error('Error al obtener productos:', err);
    return NextResponse.json({ message: 'Error al obtener productos' }, { status: 500 });
  }
}