import useSWR, { mutate } from 'swr';
import Link from 'next/link';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Invoices() {
  const { data, error } = useSWR('/api/invoices', fetcher);

  if (error) return <div>Eroare la încărcare</div>;
  if (!data) return <div>Se încarcă...</div>;

  let invoices = Array.isArray(data) ? data : (data.rows || []);

  if (!Array.isArray(invoices)) {
    console.error("Formatul datelor este neașteptat:", data);
    return <div>Eroare: format de date neașteptat</div>;
  }

  // Funcția de ștergere a unei facturi
  const handleDelete = async (id) => {
    if (confirm('Sigur vrei să ștergi această factură?')) {
      const res = await fetch(`/api/invoices/${id}`, { method: 'DELETE' });
      if (res.ok) {
        mutate('/api/invoices'); // Actualizează lista fără refresh
      } else {
        alert('Eroare la ștergere');
      }
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '1rem' }}>
      <h1>Lista Facturilor</h1>
      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Număr Factură</th>
            <th>Data</th>
            <th>Total</th>
            <th>TVA</th>
            <th>Client</th>
            <th>Acțiuni</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.number}</td>
              <td>{new Date(invoice.date).toLocaleDateString()}</td>
              <td>{invoice.total}</td>
              <td>{invoice.vat}</td>
              <td>{invoice.client_name}</td>
              <td>
                <Link href={`/invoices/edit/${invoice.id}`} style={{ marginRight: '10px' }}>
                  ✏️ Editare
                </Link>
                <button onClick={() => handleDelete(invoice.id)} style={{ color: 'red', border: 'none', cursor: 'pointer' }}>
                  ❌ Șterge
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
