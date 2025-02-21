import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function EditInvoice() {
  const router = useRouter();
  const { id } = router.query;

  const [number, setNumber] = useState('');
  const [total, setTotal] = useState('');
  const [vat, setVat] = useState('');
  const [clientId, setClientId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`/api/invoices/${id}`)
        .then(res => res.json())
        .then(data => {
          setNumber(data.number);
          setTotal(data.total);
          setVat(data.vat);
          setClientId(data.client_id);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching invoice:', error);
          setLoading(false);
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/invoices/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ number, total, vat, clientId }),
    });

    if (res.ok) {
      router.push('/invoices');
    } else {
      alert('Eroare la actualizarea facturii');
    }
  };

  if (loading) return <div>Se încarcă...</div>;

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '1rem' }}>
      <h1>Editare Factură</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Număr Factură:</label>
          <input type="text" value={number} onChange={(e) => setNumber(e.target.value)} required style={{ width: '100%', padding: '0.5rem' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Total:</label>
          <input type="number" value={total} onChange={(e) => setTotal(e.target.value)} required style={{ width: '100%', padding: '0.5rem' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>TVA:</label>
          <input type="number" value={vat} onChange={(e) => setVat(e.target.value)} required style={{ width: '100%', padding: '0.5rem' }} />
        </div>
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>Salvează Modificările</button>
      </form>
    </div>
  );
}
