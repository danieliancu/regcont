// pages/api/invoices/index.js
import pool from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { number, total, vat, clientId } = req.body;

      // Verificăm dacă clientul există
      const [clientRows] = await pool.query(
        'SELECT * FROM clients WHERE id = ?',
        [clientId]
      );
      if (clientRows.length === 0) {
        return res.status(400).json({ error: 'Clientul specificat nu există.' });
      }

      // Inserăm factura; folosim NOW() pentru data curentă
      const [result] = await pool.query(
        `INSERT INTO invoices (number, date, total, vat, client_id) VALUES (?, NOW(), ?, ?, ?)`,
        [number, parseFloat(total), parseFloat(vat), clientId]
      );
      res.status(201).json({ id: result.insertId, number, total, vat, clientId });
    } catch (error) {
      console.error('Error creating invoice:', error);
      res.status(500).json({ error: 'Eroare la crearea facturii' });
    }
  } else if (req.method === 'GET') {
    try {
      // Selectăm facturile și le facem join cu clienții
      const [rows] = await pool.query(
        `SELECT i.*, c.name AS client_name FROM invoices i LEFT JOIN clients c ON i.client_id = c.id`
      );
      res.status(200).json(rows);
    } catch (error) {
      console.error('Error fetching invoices:', error);
      res.status(500).json({ error: 'Eroare la preluarea facturilor' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Metoda ${req.method} nu este permisă`);
  }
}
