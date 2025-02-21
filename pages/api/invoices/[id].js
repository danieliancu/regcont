import pool from '../../../lib/db';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const [rows] = await pool.query(`SELECT * FROM invoices WHERE id = ?`, [id]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Factura nu a fost găsită' });
      }
      res.status(200).json(rows[0]);
    } catch (error) {
      console.error('Error fetching invoice:', error);
      res.status(500).json({ error: 'Eroare la preluarea facturii' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const [result] = await pool.query(`DELETE FROM invoices WHERE id = ?`, [id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Factura nu a fost găsită' });
      }
      res.status(200).json({ message: 'Factura ștearsă cu succes' });
    } catch (error) {
      console.error('Error deleting invoice:', error);
      res.status(500).json({ error: 'Eroare la ștergerea facturii' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { number, total, vat, clientId } = req.body;
      const [result] = await pool.query(
        `UPDATE invoices SET number = ?, total = ?, vat = ?, client_id = ? WHERE id = ?`,
        [number, total, vat, clientId, id]
      );
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Factura nu a fost găsită' });
      }
      res.status(200).json({ message: 'Factura actualizată cu succes' });
    } catch (error) {
      console.error('Error updating invoice:', error);
      res.status(500).json({ error: 'Eroare la actualizarea facturii' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'DELETE', 'PUT']);
    res.status(405).json({ error: `Metoda ${req.method} nu este permisă` });
  }
}
