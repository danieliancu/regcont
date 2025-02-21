// pages/cash/new.js
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function NewCashTransaction() {
  const [type, setType] = useState('INCOME');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { type, amount, description };

    const res = await fetch('/api/cash-transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push('/cash');
    } else {
      alert('Eroare la crearea tranzacției');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h1>Înregistrare Operațiune de Numerar</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tip Operațiune:</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="INCOME">Încasare</option>
            <option value="EXPENSE">Plată</option>
          </select>
        </div>
        <div>
          <label>Suma:</label>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descriere:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Salvează Operațiunea</button>
      </form>
    </div>
  );
}
