// pages/api/cash-transactions/index.js
import pool from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { type, amount, description } = req.body;
      const [result] = await pool.query(
        `INSERT INTO cash_transactions (type, amount, date, description) VALUES (?, ?, NOW(), ?)`,
        [type, parseFloat(amount), description]
      );
      res.status(201).json({ id: result.insertId, type, amount, description });
    } catch (error) {
      console.error('Error creating cash transaction:', error);
      res.status(500).json({ error: 'Eroare la crearea tranzacției' });
    }
  } else if (req.method === 'GET') {
    try {
      const [rows] = await pool.query(`SELECT * FROM cash_transactions`);
      res.status(200).json(rows);
    } catch (error) {
      console.error('Error fetching cash transactions:', error);
      res.status(500).json({ error: 'Eroare la preluarea tranzacțiilor' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Metoda ${req.method} nu este permisă`);
  }
}
