// Asegúrate de importar mysql2/promise
import mysql from 'mysql2/promise';

// Crea una conexión usando la versión con promesas
const connection = await mysql.createConnection({
  host: '127.0.0.1',
  user: 'root', // Cambia esto con tu usuario de la base de datos
  password: 'adminxx1', // Cambia esto con tu contraseña
  database: 'ayllufarmadb' // Asegúrate de que el nombre de la base de datos sea correcto
});

// Exporta la conexión para poder usarla en otros archivos
export default connection;