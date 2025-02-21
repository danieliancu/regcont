// pages/api/invoices/index.js
import pool from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { tip, number, cod, total, vat, clientId } = req.body;

      // Verificăm dacă clientul există
      const [clientRows] = await pool.query(
        'SELECT * FROM clients WHERE id = ?',
        [clientId]
      );
      if (clientRows.length === 0) {
        return res.status(400).json({ error: 'Clientul specificat nu există.' });
      }

      // Calculează data scadentă: o lună mai târziu
      const scadentaDate = new Date();
      scadentaDate.setMonth(scadentaDate.getMonth() + 1);
      const scadentaFormatted = scadentaDate.toISOString().split('T')[0];

      // Calculează totalVAT = total + vat
      const totalvatCalculated = parseFloat(total) + parseFloat(vat);

      // Inserăm factura; folosim NOW() pentru data curentă
      const [result] = await pool.query(
        `INSERT INTO invoices (tip, number, cod, date, scadenta, total, vat, totalvat, client_id) VALUES (?, ?, ?, NOW(), ?, ?, ?, ?, ?)`,
        [tip, number, cod, scadentaFormatted, parseFloat(total), parseFloat(vat), totalvatCalculated, clientId]
      );
      res.status(201).json({ 
        id: result.insertId, 
        tip, 
        number, 
        cod, 
        total, 
        vat, 
        scadenta: scadentaFormatted, 
        totalvat: totalvatCalculated, 
        clientId 
      });
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
