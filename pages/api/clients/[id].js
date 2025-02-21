import pool from '../../../lib/db';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const [rows] = await pool.query(`SELECT * FROM clients WHERE id = ?`, [id]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Clientul nu a fost găsit' });
      }
      res.status(200).json(rows[0]);
    } catch (error) {
      console.error('Error fetching client:', error);
      res.status(500).json({ error: 'Eroare la preluarea clientului' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const [result] = await pool.query(`DELETE FROM clients WHERE id = ?`, [id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Clientul nu a fost găsit' });
      }
      res.status(200).json({ message: 'Client șters cu succes' });
    } catch (error) {
      console.error('Error deleting client:', error);
      res.status(500).json({ error: 'Eroare la ștergerea clientului' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { name, cui, address } = req.body;
      const [result] = await pool.query(
        `UPDATE clients SET name = ?, cui = ?, address = ? WHERE id = ?`,
        [name, cui, address, id]
      );
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Clientul nu a fost găsit' });
      }
      res.status(200).json({ message: 'Client actualizat cu succes' });
    } catch (error) {
      console.error('Error updating client:', error);
      res.status(500).json({ error: 'Eroare la actualizarea clientului' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'DELETE', 'PUT']);
    res.status(405).json({ error: `Metoda ${req.method} nu este permisă` });
  }
}
