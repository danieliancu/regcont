// pages/api/clients/index.js
import pool from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const [rows] = await pool.query('SELECT * FROM clients');
      res.status(200).json(rows);
    } catch (error) {
      console.error('Error fetching clients:', error);
      res.status(500).json({ error: 'Eroare la preluarea clienților' });
    }
  } else if (req.method === 'POST') {
    try {
      console.log('Body received:', req.body); // Debug: vezi ce primește API-ul
      const { name, cui, address } = req.body;
      const [result] = await pool.query(
        `INSERT INTO clients (name, cui, address) VALUES (?, ?, ?)`,
        [name, cui, address]
      );
      res.status(201).json({ id: result.insertId, name, cui, address });
    } catch (error) {
      console.error('Error creating client:', error);
      res.status(500).json({ error: 'Eroare la crearea clientului' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Metoda ${req.method} nu este permisă`);
  }
}
