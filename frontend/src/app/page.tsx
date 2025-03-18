import Footer from '../../components/Footer';
import Header from '../../components/Header';
import QRPage from './qr/page';

export default function Home() {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <QRPage />
      </main>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
