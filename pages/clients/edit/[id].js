import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function EditClient() {
  const router = useRouter();
  const { id } = router.query;

  const [name, setName] = useState('');
  const [cui, setCui] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`/api/clients/${id}`)
        .then(res => res.json())
        .then(data => {
          setName(data.name);
          setCui(data.cui);
          setAddress(data.address);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching client:', error);
          setLoading(false);
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/clients/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, cui, address }),
    });

    if (res.ok) {
      router.push('/clients');
    } else {
      alert('Eroare la actualizarea clientului');
    }
  };

  if (loading) return <div>Se încarcă...</div>;

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '1rem' }}>
      <h1>Editare Client</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Nume:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%', padding: '0.5rem' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>CUI:</label>
          <input type="text" value={cui} onChange={(e) => setCui(e.target.value)} required style={{ width: '100%', padding: '0.5rem' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Adresă:</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required style={{ width: '100%', padding: '0.5rem' }} />
        </div>
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>Salvează Modificările</button>
      </form>
    </div>
  );
}
