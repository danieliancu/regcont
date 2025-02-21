// pages/_app.js
import Layout from "../components/Layout";
import "../styles/globals.css"; // Asigură-te că ai un fișier global de stiluri, dacă dorești

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
