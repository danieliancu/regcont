import useSWR, { mutate } from 'swr';
import Link from 'next/link';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Clients() {
  const { data, error } = useSWR('/api/clients', fetcher);

  if (error) return <div>Eroare la încărcare</div>;
  if (!data) return <div>Se încarcă...</div>;

  // Funcția de ștergere a unui client
  const handleDelete = async (id) => {
    if (confirm('Sigur vrei să ștergi acest client?')) {
      const res = await fetch(`/api/clients/${id}`, { method: 'DELETE' });
      if (res.ok) {
        mutate('/api/clients'); // Actualizează lista fără refresh
      } else {
        alert('Eroare la ștergere');
      }
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '1rem' }}>
      <h1>Lista Clienților</h1>
      <div style={{ marginBottom: '1rem' }}>
        <Link href="/clients/new">Adaugă Client Nou</Link>
      </div>
      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nume</th>
            <th>CUI</th>
            <th>Adresă</th>
            <th>Acțiuni</th>
          </tr>
        </thead>
        <tbody>
          {data.map((client) => (
            <tr key={client.id}>
              <td>{client.id}</td>
              <td>{client.name}</td>
              <td>{client.cui}</td>
              <td>{client.address}</td>
              <td>
                <Link href={`/clients/edit/${client.id}`} style={{ marginRight: '10px' }}>
                  ✏️ Editare
                </Link>
                <button onClick={() => handleDelete(client.id)} style={{ color: 'red', border: 'none', cursor: 'pointer' }}>
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
