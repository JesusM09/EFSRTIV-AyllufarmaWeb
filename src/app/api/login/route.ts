import { NextResponse } from 'next/server';
import connection from '../../../../lib/db';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const query = 'SELECT id, full_name FROM users WHERE email = ? AND password = ?';
    const [results]: any = await connection.query(query, [email, password]);

    if (results.length === 0) {
      return NextResponse.json({ message: 'Credenciales incorrectas' }, { status: 401 });
    }

    const user = results[0];

    return NextResponse.json({
      user_id: user.id,
      full_name: user.full_name,
    });
  } catch (err) {
    console.error('Error en login:', err);
    return NextResponse.json({ message: 'Error en el servidor' }, { status: 500 });
  }
}