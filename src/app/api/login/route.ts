// Ejemplo de API para login (esto puede estar en /src/app/api/login/route.ts)
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Simular la validación del usuario
  if (email === 'user@example.com' && password === 'password') {
    const user_id = 1; // Aquí deberías obtener el user_id desde tu base de datos

    return NextResponse.json({ user_id });
  } else {
    return NextResponse.json({ message: 'Credenciales incorrectas' }, { status: 400 });
  }
}
