// pages/clients/new.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function NewClient() {
  const [name, setName] = useState('');
  const [cui, setCui] = useState('');
  const [address, setAddress] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, cui, address };

    const res = await fetch('/api/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push('/clients');
    } else {
      alert('Eroare la crearea clientului');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '1rem' }}>
      <h1>Adaugă Client Nou</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block' }}>Nume:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block' }}>CUI:</label>
          <input
            type="text"
            value={cui}
            onChange={(e) => setCui(e.target.value)}
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block' }}>Adresă:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>
          Adaugă Client
        </button>
      </form>
      <div style={{ marginTop: '1rem' }}>
        <Link href="/clients">Înapoi la Lista Clienților</Link>
      </div>
    </div>
  );
}
