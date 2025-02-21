// pages/invoice/new.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import NewClientForm from '../../components/NewClientForm';
import InvoiceList from '../../components/InvoiceList';

export default function NewInvoice() {
  const [number, setNumber] = useState(''); // Lăsat gol pentru input manual
  const [total, setTotal] = useState('');
  const [vat, setVat] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewClientForm, setShowNewClientForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  // Funcție care preia ultimul număr de factură adăugat
  const fetchLastInvoiceNumber = async () => {
    try {
      const res = await fetch('/api/invoices'); // Apelăm API-ul care returnează lista facturilor
      const data = await res.json();
  
      if (data.length > 0) {
        const lastInvoice = data.sort((a, b) => b.id - a.id)[0]; // Sortează după id DESC
        setNumber(parseInt(lastInvoice.number, 10) + 1);
      } else {
        setNumber(1); // Dacă nu există facturi, începe de la 1
      }
    } catch (error) {
      console.error('Error fetching last invoice number:', error);
    }
  };

  // Fetch la montare
  useEffect(() => {
    fetchLastInvoiceNumber();
  }, []);

  // Încarcă lista de clienți din API
    useEffect(() => {
        async function fetchClients() {
        try {
            const res = await fetch('/api/clients');
            const data = await res.json();
            setClients(data.reverse()); // Inversăm lista pentru a afișa ultimul client primul
        } catch (error) {
            console.error('Error fetching clients:', error);
        }
        }
        fetchClients();
    }, []);
  

  // Filtrează clienții pe baza textului introdus
  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Când trimiți formularul
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedClient) {
      alert('Te rog selectează un client!');
      return;
    }

    const invoiceData = { 
      number, 
      total, 
      vat, 
      clientId: parseInt(selectedClient.id)
    };

    const res = await fetch('/api/invoices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(invoiceData),
    });

    if (res.ok) {
      // Resetăm formularul
      setTotal('');
      setVat('');
      setSelectedClient(null);
      setSearchTerm('');
      setSuccessMessage('Factura a fost creată cu succes!');

      // Re-fetch pentru a actualiza numărul de factură
      fetchLastInvoiceNumber();
    } else {
      alert('Eroare la crearea facturii');
    }
  };

  const handleClientCreated = (newClient) => {
    setClients(prev => [newClient, ...prev]); // Adaugă noul client la începutul listei
    setSelectedClient(newClient);
    setShowNewClientForm(false);
  };
  

  return (
    <div style={{ maxWidth: '1200px', margin: 'auto' }}>
      <h1>Crează Factură Nouă</h1>
      {successMessage && (
        <div style={{ marginBottom: '1rem', color: 'green' }}>
          {successMessage}
        </div>
      )}
      <div style={{ display: 'flex', gap: '2rem' }}>
        {/* Coloana stângă: Formularul de facturare */}
        <div style={{ flex: 1 }}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label>Numărul Facturii:</label>
              <input
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Introduceți numărul facturii"
                required
                style={{ width: '100%', padding: '0.5rem' }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Total (RON):</label>
              <input
                type="number"
                step="0.01"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                required
                style={{ width: '100%', padding: '0.5rem' }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>TVA (RON):</label>
              <input
                type="number"
                step="0.01"
                value={vat}
                onChange={(e) => setVat(e.target.value)}
                required
                style={{ width: '100%', padding: '0.5rem' }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Caută Client:</label>
              <input
                type="text"
                placeholder="Caută clientul..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
              />
              <div
                style={{
                  border: '1px solid #ccc',
                  maxHeight: '200px',
                  overflowY: 'scroll',
                  padding: '0.5rem'
                }}
              >
                {filteredClients.length > 0 ? (
                  filteredClients.map(client => (
                    <div
                      key={client.id}
                      onClick={() => setSelectedClient(client)}
                      style={{
                        padding: '0.5rem',
                        cursor: 'pointer',
                        backgroundColor: selectedClient?.id === client.id ? '#d3d3d3' : 'transparent'
                      }}
                    >
                      {client.name}
                    </div>
                  ))
                ) : (
                  <div>Nu s-au găsit clienți</div>
                )}
              </div>
              <div style={{ marginTop: '0.5rem' }}>
                <button 
                  type="button" 
                  onClick={() => setShowNewClientForm(!showNewClientForm)}
                  style={{ padding: '0.5rem 1rem' }}
                >
                  {showNewClientForm ? 'Ascunde formularul' : 'Client nou'}
                </button>
              </div>
            </div>
            <button type="submit" style={{ padding: '0.5rem 1rem' }}>
              Salvează Factura
            </button>
          </form>
        </div>
        {/* Coloana dreaptă: Lista facturilor */}
        <div style={{ flex: 1 }}>
          <InvoiceList />
        </div>
      </div>
      {/* Formularul pentru client nou, afișat în afara formularului principal */}
      {showNewClientForm && (
        <div style={{ marginTop: '2rem' }}>
          <NewClientForm onClientCreated={handleClientCreated} />
        </div>
      )}
    </div>
  );
}
