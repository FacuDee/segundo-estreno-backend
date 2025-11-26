// Script para generar hash de contraseña para usuario admin
const bcrypt = require('bcrypt');

const password = 'Admin123!'; // Cambia esta contraseña
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error generando hash:', err);
    return;
  }
  
  console.log('\n=== COPIA Y PEGA ESTE SQL EN PHPMYADMIN ===\n');
  console.log(`INSERT INTO usuarios (username, email, password, rol, created_at) 
VALUES ('admin', 'admin@segundoestreno.com', '${hash}', 'admin', NOW());\n`);
  console.log('===========================================\n');
});
