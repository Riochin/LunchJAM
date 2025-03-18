import QRPage from './qr/page';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

export default function Home() {
  return (
    <div>
      <header>
        <Header></Header>
      </header>
      <main>
        <QRPage></QRPage>
      </main>

      <div className="footer">
        <Footer></Footer>
      </div>
    </div>
  );
}
