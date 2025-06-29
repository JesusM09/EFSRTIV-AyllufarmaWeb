import { NextResponse } from 'next/server';
import connection from '../../../../lib/db';

export async function POST(req: Request) {
  try {
    const { full_name, email, password, address, phone_number } = await req.json();

    const query = 'INSERT INTO users (full_name, email, password, address, phone_number, created_at) VALUES (?, ?, ?, ?, ?, NOW())';

    await connection.query(query, [full_name, email, password, address, phone_number]);

    return NextResponse.json({ message: 'Usuario registrado exitosamente' });
  } catch (err) {
    console.error('Error al registrar usuario:', err);
    return NextResponse.json({ message: 'Error al registrar usuario' }, { status: 500 });
  }
}
