// pages/index.js
import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Program de Facturare și Registru de Casă</title>
        <meta
          name="description"
          content="Această aplicație permite emiterea facturilor și gestionarea registrului de casă, oferind micilor afaceri o soluție modernă și intuitivă pentru administrarea operațiunilor financiare."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page}>
        <main className={styles.main}>
          <h1>Program de Facturare și Registru de Casă</h1>
          <p>
            Această aplicație permite emiterea facturilor și gestionarea registrului de casă, oferind micilor afaceri o soluție modernă și intuitivă pentru administrarea operațiunilor financiare.
          </p>
          <ul>
            <li>
              <Link href="/invoice/new">Crează Factură Nouă</Link>
            </li>
            <li>
              <Link href="/invoices">Lista Facturilor</Link>
            </li>
            <li>
              <Link href="/cash/new">Înregistrează Operațiune de Numerar</Link>
            </li>
            <li>
              <Link href="/cash">Registru de Casă</Link>
            </li>
            <li>
              <Link href="/clients">Gestionare Clienți</Link>
            </li>
          </ul>
        </main>
        <footer className={styles.footer}>
          <p>© 2025 Program de Facturare. Toate drepturile rezervate.</p>
        </footer>
      </div>
    </>
  );
}
