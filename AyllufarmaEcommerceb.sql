-- Crear la base de datos
CREATE DATABASE ayllufarmadb;

-- Seleccionar la base de datos
USE ayllufarmadb;

-- Tabla de usuarios
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    phone_number VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de productos
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT NOT NULL,
    expiration_date DATE, -- Fecha de expiración
    image_url VARCHAR(255),
    characteristics JSON, -- Array de características
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de carrito de compras
CREATE TABLE cart_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Tabla de pedidos
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabla de detalles del pedido
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

 -- Incersion de datos
INSERT INTO products (name, description, price, stock_quantity, expiration_date, image_url, characteristics, created_at)
VALUES
  ('Máscara facial', 'Máscara de protección facial para uso médico', 15.75, 300, '2025-12-31', 'https://http2.mlstatic.com/D_NQ_NP_763532-MLU74316256080_022024-O.webp', '[{"tamaño": "único"}, {"material": "plástico"}, {"color": "transparente"}, {"uso": "protección"}, {"tipo": "desechable"}]', NOW()),
  ('Termómetro infrarrojo', 'Termómetro infrarrojo sin contacto', 30.00, 150, '2025-12-31', 'https://www.promelsa.com.pe/media/catalog/product/cache/beccbd461ac94891fe746718d2496617/1/0/1037636-01_1.jpg', '[{"color": "negro"}, {"material": "plástico"}, {"tipo": "infrarrojo"}, {"uso": "medición"}, {"rango de temperatura": "32°C - 42°C"}]', NOW()),
  ('Guantes de nitrilo', 'Guantes de nitrilo para protección en procedimientos médicos', 12.50, 200, '2025-12-31', 'https://medproteccion.cl/wp-content/uploads/2022/05/GUANTES-DE-NITRILO-AZUL.jpg', '[{"tamaño": "mediano"}, {"color": "negro"}, {"material": "nitrilo"}, {"uso": "protección"}, {"grueso": "0.2mm"}]', NOW()),
  ('Botellas de oxígeno', 'Botella de oxígeno médica para terapia respiratoria', 60.00, 50, '2025-12-31', 'https://static.praxisdienst.com/out/pictures/master/themeworld/1/130088_alu-sauerstoffflasche_2l_1.jpeg', '[{"capacidad": "10L"}, {"material": "aluminio"}, {"tipo": "médico"}, {"uso": "respiración"}, {"presión": "200 bar"}]', NOW()),
  ('Jeringas desechables', 'Jeringas desechables de 5 ml', 0.50, 1000, '2025-12-31', 'https://www.hogarysalud.com.pe/wp-content/uploads/2024/10/81322.jpg', '[{"tamaño": "5ml"}, {"material": "plástico"}, {"tipo": "desechable"}, {"aguja": "incluida"}, {"uso": "inyección"}]', NOW()),
  ('Cinta métrica', 'Cinta métrica para medición médica', 8.00, 200, '2025-12-31', 'https://image.made-in-china.com/2f0j00PRCqIwTMbjpD/BMI-Measuring-Tape-Professional-Fabric-Medical-BMI-Tape-Measure-Round-Gift-Tape.webp', '[{"color": "amarillo"}, {"material": "plástico"}, {"longitud": "3m"}, {"precisión": "0.5mm"}, {"uso": "medición médica"}]', NOW()),
  ('Guantes quirúrgicos', 'Guantes estériles para uso quirúrgico', 18.00, 300, '2025-12-31', 'https://promart.vteximg.com.br/arquivos/ids/7894793-1000-1000/image-480f4236928a43ff9463c560870d58db.jpg?v=638461368954500000', '[{"tamaño": "grande"}, {"material": "látex"}, {"uso": "quirúrgico"}, {"estéril": "sí"}, {"resistencia": "alta"}]', NOW()),
  ('Mascarilla quirúrgica', 'Mascarilla quirúrgica desechable', 1.00, 1000, '2025-12-31', 'https://geomedic.pe/wp-content/uploads/2023/11/WEB-PRODUCTOS_MASCARILLA-QUIRURGICA-3.webp', '[{"color": "blanco"}, {"material": "polipropileno"}, {"tipo": "quirúrgico"}, {"desechable": "sí"}, {"capacidad de filtración": "99%"}]', NOW()),
  ('Cama hospitalaria', 'Cama hospitalaria eléctrica para pacientes', 500.00, 20, '2025-12-31', 'https://meditech.pe/wp-content/uploads/2023/11/4-cama4fcolchon.jpg', '[{"color": "blanco"}, {"material": "acero"}, {"tipo": "eléctrica"}, {"uso": "hospitalario"}, {"peso máximo": "250kg"}]', NOW()),
  ('Silla de ruedas', 'Silla de ruedas plegable para pacientes', 120.00, 40, '2025-12-31', 'https://image.made-in-china.com/2f0j00eaOfNIDCLyko/Hospital-Manual-Foldable-Wheelchair-with-Chrome-Frame-for-Disable-Patient.webp', '[{"color": "rojo"}, {"material": "acero"}, {"tipo": "plegable"}, {"capacidad de peso": "150kg"}, {"uso": "hospitalario"}]', NOW()),
  ('Batas médicas', 'Bata médica desechable para procedimientos', 15.00, 500, '2025-12-31', 'https://vacunamecic.com/wp-content/uploads/2021/10/BATA-DESECHABLE-MANGA-LARGA.png', '[{"tamaño": "único"}, {"material": "polipropileno"}, {"desechable": "sí"}, {"uso": "médico"}, {"resistencia": "media"}]', NOW()),
  ('Desinfectante para manos', 'Desinfectante para manos con alcohol', 5.00, 1000, '2025-12-31', 'https://www.zrmedic.pe/wp-content/uploads/2024/02/ALCOHOL-EN-GEL-DE-70%C2%B0-1LT.jpg', '[{"tamaño": "500ml"}, {"ingrediente activo": "alcohol 70%"}, {"uso": "higiene"}, {"anti-bacterial": "sí"}, {"tipo": "gel"}]', NOW());
  