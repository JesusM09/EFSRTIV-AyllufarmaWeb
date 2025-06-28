import { NextResponse } from 'next/server';
import connection from '../../../../../lib/db';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params; // Extraemos el id del producto desde la URL

    // Realizamos la consulta al producto usando el id
    const query = 'SELECT * FROM products WHERE id = ?';
    const [results] = await connection.query(query, [id]); // Accedemos al array de resultados correctamente

    // Asegurémonos de que results tiene un tipo adecuado (array)
    if ((results as any[]).length === 0) {
      return NextResponse.json({ message: 'Producto no encontrado' }, { status: 404 });
    }

    return NextResponse.json((results as any[])[0]); // Devolvemos el producto encontrado
  } catch (err) {
    console.error('Error al obtener producto:', err);
    return NextResponse.json({ message: 'Error al obtener producto' }, { status: 500 });
  }
}