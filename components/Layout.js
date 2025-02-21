// components/Layout.js
import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header style={{ padding: '1rem', backgroundColor: '#f0f0f0' }}>
        <nav>
          <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none', margin: 0, padding: 0 }}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/invoice/new">Crează Factură Nouă</Link></li>
            <li><Link href="/cash/new">Înregistrează Operațiune de Numerar</Link></li>
            <li><Link href="/invoices">Gestionare Facturi</Link></li>
            <li><Link href="/clients">Gestionare Clienți</Link></li>
            <li><Link href="/cash">Registru de Casă</Link></li>

          </ul>
        </nav>
      </header>
      <main style={{ flex: 1, padding: '1rem' }}>
        {children}
      </main>
      <footer style={{ padding: '1rem', backgroundColor: '#f0f0f0', textAlign: 'center' }}>
        © 2025 Program de Facturare. Toate drepturile rezervate.
      </footer>
    </div>
  );
}
