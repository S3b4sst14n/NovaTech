// controllers/usersController.js
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10');
const jwtSecret = process.env.JWT_SECRET;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '2h';

async function register(req, res) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) return res.status(400).json({ message: 'Campos incompletos' });

    // Verificar si existe email
    const exists = await db.query('SELECT id FROM users WHERE email=$1', [email]);
    if (exists.rows.length) return res.status(409).json({ message: 'Email ya registrado' });

    const hashed = await bcrypt.hash(password, saltRounds);
    const result = await db.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email, created_at',
      [username, email, hashed]
    );

    const user = result.rows[0];
    return res.status(201).json({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Campos incompletos' });

    const result = await db.query('SELECT id, username, email, password FROM users WHERE email=$1', [email]);
    const user = result.rows[0];
    if (!user) return res.status(401).json({ message: 'Email o contraseña incorrectos' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Email o contraseña incorrectos' });

    // Generar token
    const payload = { id: user.id, username: user.username, email: user.email };
    const token = jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiresIn });

    // Recomendación: enviar cookie HttpOnly en producción. Aquí devolvemos token en JSON.
    return res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
}

module.exports = { register, login };
