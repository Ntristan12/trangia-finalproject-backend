const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();
async function run() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) || 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });
    
    console.log("Connected to DB. Checking if admin@ethereal.email exists...");
    const [rows] = await connection.query('SELECT id FROM accounts WHERE email = ?', ['admin@ethereal.email']);
    
    const passwordHash = await bcrypt.hash('Password123', 10);
    
    if (rows.length === 0) {
        console.log("Creating new Admin account...");
        await connection.query(
            'INSERT INTO accounts (email, passwordHash, title, firstName, lastName, acceptTerms, role, verified, created) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            ['admin@ethereal.email', passwordHash, 'Mr', 'Admin', 'User', true, 'Admin', new Date(), new Date()]
        );
        console.log("Admin account created successfully!");
    } else {
        console.log("Admin account already exists. Updating role to Admin and setting verified status...");
        await connection.query(
            'UPDATE accounts SET role = ?, verified = ?, passwordHash = ? WHERE email = ?',
            ['Admin', new Date(), passwordHash, 'admin@ethereal.email']
        );
        console.log("Admin account updated successfully!");
    }
    
    await connection.end();
}
run().catch(console.error);