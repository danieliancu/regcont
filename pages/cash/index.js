// pages/cash/index.js
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function CashTransactions() {
  const { data, error } = useSWR('/api/cash-transactions', fetcher);

  if (error) return <div>Eroare la încărcare</div>;
  if (!data) return <div>Se încarcă...</div>;
  
  // Dacă data este un array gol, afișăm mesajul
  if (Array.isArray(data) && data.length === 0) {
    return <div style={{ maxWidth: '800px', margin: 'auto' }}>Nu există nicio înregistrare deocamdată</div>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: 'auto' }}>
      <h1>Registru de Casă</h1>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Data</th>
            <th>Tip</th>
            <th>Suma</th>
            <th>Descriere</th>
          </tr>
        </thead>
        <tbody>
          {data.map((tx) => (
            <tr key={tx.id}>
              <td>{new Date(tx.date).toLocaleDateString()}</td>
              <td>{tx.type}</td>
              <td>{tx.amount}</td>
              <td>{tx.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
