// components/InvoiceList.js
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function InvoiceList() {
  // Revalidează datele la fiecare 5000ms (5 secunde)
  const { data, error } = useSWR('/api/invoices', fetcher, { refreshInterval: 5000 });

  if (error) return <div>Eroare la încărcarea facturilor</div>;
  if (!data) return <div>Se încarcă facturi...</div>;

  if (!Array.isArray(data) || data.length === 0) {
    return <div>Nu există nicio înregistrare de facturi deocamdată</div>;
  }

  return (
    <div>
      <h2>Lista Facturilor</h2>
      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Număr Factură</th>
            <th>Data</th>
            <th>Total</th>
            <th>TVA</th>
            <th>Client</th>
          </tr>
        </thead>
        <tbody>
          {data.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.number}</td>
              <td>{new Date(invoice.date).toLocaleDateString()}</td>
              <td>{invoice.total}</td>
              <td>{invoice.vat}</td>
              <td>{invoice.client_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
